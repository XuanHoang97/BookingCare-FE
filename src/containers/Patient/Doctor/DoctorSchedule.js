import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import {LANGUAGES} from '../../../utils';
import {getScheduleDoctorByDate} from "../../../services/userService"

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays : [],
        }
    }

    async componentDidMount() {
        let {language}=this.props;

        console.log('moment vi: ', moment(new Date()).format('dddd - DD/MM'));
        console.log('moment en: ', moment(new Date()).locale('en').format('ddd - DD/MM'));
        
        this.setArrDays(language);
    }

    //render schedule doctor by date
    setArrDays =async(language) => {
        let allDays = [];
        for(let i=0; i<7; i++){
            let object={};

            if(this.props.language===LANGUAGES.VI){

                object.label =moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }else{
                object.label =moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }

            object.value =moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }

        let res=await getScheduleDoctorByDate(28, 1633712400000);
        console.log('check res: ', res.data)
        
        this.setState ({
            allDays: allDays
        })  
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
            this.setArrDays(this.props.language); 
        }
    }

    //onChange schedule doctor
    handleChangeSelect=async(e)=>{
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !==-1){
            let doctorId =this.props.doctorIdFromParent;
            let date=e.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            console.log('check res schedule from react: ', res.data)
        }
    }

    render() {
        let {allDays}=this.state;

        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule w-50">
                     <select class="form-control" onChange={(e) => this.handleChangeSelect(e)}>
                         {allDays && allDays.length > 0 &&
                            allDays.map((item,index)=>{
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                )
                            })
                         }
                     </select>
                </div>

                <div className="all-avaiable-time">

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
