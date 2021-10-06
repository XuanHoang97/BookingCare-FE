import React, { Component } from 'react';
import { connect } from "react-redux";
import {FormattedMessage} from "react-intl";
import * as actions from '../../../store/actions';
import './ManageSchedule.scss';
import {LANGUAGES} from "../../../utils"
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listDoctors:[],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []

        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime()
    }

    //render data
    buildDataInputSelect =(inputData)=>{
        let result =[];
        let {language}=this.props;

        if(inputData && inputData.length > 0){
            inputData.map((item,index)=>{
                let object={};
                let labelVi=`${item.lastName} ${item.firstName}`;
                let labelEn=`${item.firstName} ${item.lastName}`;
                object.label =language ===LANGUAGES.VI ? labelVi : labelEn;
                object.value=item.id;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //render data doctor select
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect=this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            })
        }

        //render data schedule time 
        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            this.setState({
                rangeTime: this.props.allScheduleTime
            })
        }

        // if(prevProps.language !== this.props.language){
        //     let dataSelect=this.buildDataInputSelect(this.props.allDoctors);
        //     this.setState({
        //         listDoctors: dataSelect,
        //     })
        // }
    }

    //onchange select option doctor
    handleChangeSelect = async(selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });       
    };

    //onchange datepicker
    handleOnchangeDatePicker=(date)=>{
        this.setState({
            currentDate: date[0]
        })
    }

    render() {
        console.log('check state: ', this.state);
        console.log('check props: ', this.props);

        let {rangeTime}=this.state;
        let {language}=this.props;

        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor=""><FormattedMessage id="manage-schedule.choose-doctor"/></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label htmlFor=""><FormattedMessage id="manage-schedule.choose-date"/></label>
                            <DatePicker 
                                onChange={this.handleOnchangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                    </div>

                    <div className="col-12 pick-hour-container p-0">
                        {
                            rangeTime && rangeTime.length>0 &&
                            rangeTime.map((item,index)=>{
                                return (
                                    <button type="button" className="btn btn-light m-2" key={index}>
                                        {language===LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })
                        }
                    </div>

                    <button type="button" class="btn btn-primary my-3"><FormattedMessage id="manage-schedule.save"/></button>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: ()=> dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: ()=> dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
