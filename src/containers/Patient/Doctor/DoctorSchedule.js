import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import {LANGUAGES} from '../../../utils';
import {getScheduleDoctorByDate} from "../../../services/userService"
import {FormattedMessage} from 'react-intl';
import BookingModal from './Modal/BookingModal'
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays : [],
            allAvailableTime : [],

            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }

    async componentDidMount() {
        let {language}=this.props; 
        let allDays=this.getArrDays(language);

        this.setState({
            allDays:allDays,
        })
       
    }

    //in hoa ky tu dau tien
    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase()+string.slice(1);
    }

    //render schedule doctor by date
    getArrDays =(language) => {
        let allDays = [];
        for(let i=0; i<7; i++){
            let object={};

            if(language===LANGUAGES.VI){
                if(i===0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today=`Hôm nay - ${ddMM}`;
                    object.label =today;
                }else{
                    
                    let labelVi=  moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }

            }else{
                if(i===0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today=`Today - ${ddMM}`;
                    object.label =today; 
                }else{

                    object.label =moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }

            object.value =moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }        
        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
            let allDays =this.getArrDays(this.props.language); 
            this.setState({
                allDays: allDays,
            })
        }

        if(prevProps.doctorIdFromParent !== this.props.doctorIdFromParent){
            let allDays=this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data.data ? res.data.data : []
            })
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
        }
    }

    //event schedule time
    handleClickScheduleTime=(time)=>{
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

    handleBookingClose=()=>{
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let {allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal}=this.state;
        let {language}=this.props;


        return (
            <>
                <div className="doctor-schedule-container">
                <div className="all-schedule">
                     <select className="form-control" onChange={(e) => this.handleChangeSelect(e)}>
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
                                <label className="my-4 mx-2" style={{textTransform: 'uppercase'}}>
                                    <FormattedMessage id="patient.detail-doctor.schedule" />
                                </label>
                            </i>
                        </span>
                    </div>
                    <div className="time-content">
                        {allAvailableTime && allAvailableTime.length >0 ?
                            <>
                                {allAvailableTime.map((item,index)=>{
                                    
                                    let timeDisplay=language===LANGUAGES.VI ? 
                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn 

                                    return (
                                        <button 
                                            key={index} type="button" 
                                            className={language===LANGUAGES.VI ? "btn-vi btn btn-warning btn-sm" : "btn-en btn btn-warning btn-sm"}
                                            onClick={()=> this.handleClickScheduleTime(item)}    
                                        >
                                            {timeDisplay}                                    
                                        </button>

                                    )
                                })}

                                <div className="book-free">
                                    <span>Chọn <i className="far fa-hand-point-up"></i>  và đặt (miễn phí)</span>
                                </div>
                            </>

                            : <div className="text-warning font-italic"><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                        }
                    </div>
                </div>
            </div>
                
                <BookingModal 
                    isOpenModal={isOpenModalBooking}
                    isCloseModal= {this.handleBookingClose}
                    dataTime={dataScheduleTimeModal}
                />
            </>
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
