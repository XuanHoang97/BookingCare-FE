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
            allAvailableTime : []
        }
    }

    async componentDidMount() {
        let {language}=this.props; 
        this.setArrDays(language);
    }

    //in hoa ky tu dau tien
    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase()+string.slice(1);
    }

    //render schedule doctor by date
    setArrDays =async(language) => {
        let allDays = [];
        for(let i=0; i<7; i++){
            let object={};

            if(this.props.language===LANGUAGES.VI){
                let labelVi=  moment(new Date()).add(i, 'days').format('dddd - DD/MM');

                object.label = this.capitalizeFirstLetter(labelVi);
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

            if(res && res.data.errCode ===0){
                this.setState({
                    allAvailableTime: res.data.data ? res.data.data : []
                })
            }else{
                 
            }

            console.log('check res: ', res.data)
        }
    }

    render() {
        let {allDays, allAvailableTime}=this.state;
        let {language}=this.props;

        console.log('check time available: ', allAvailableTime)

        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
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
                    <div className="text-calendar">
                        <span>
                            <i className="fas fa-calendar-alt">
                                <label className="my-4 mx-2" style={{textTransform: 'uppercase'}}>Lịch khám</label></i>
                        </span>
                    </div>
                    <div className="time-content">
                        {allAvailableTime && allAvailableTime.length >0 ?
                            allAvailableTime.map((item,index)=>{

                                let timeDisplay=language===LANGUAGES.VI ? 
                                item.timeTypeData.valueVi : item.timeTypeData.valueEn 

                                return (
                                    <button key={index} type="button" class="btn btn-warning btn-sm">
                                        {timeDisplay}                                    
                                    </button>

                                )
                            })

                            : <div className="text-warning">Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác !</div>
                        }
                    </div>
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
