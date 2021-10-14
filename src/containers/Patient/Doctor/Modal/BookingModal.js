import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import {FormattedMessage} from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import {LANGUAGES} from "../../../../utils";
import Select from 'react-select';
import {postPatientBookAppointment} from "../../../../services/userService";
import {toast} from 'react-toastify';
import moment from 'moment';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
           fullName: '',
           phoneNumber: '',
           email: '',
           address: '',
           reason: '',
           birthday: '',
           doctorId: '',
           selectedGender: '',
           genders: '',
           timeType: ''
        }
    }

    async componentDidMount() {
        this.props.getGenders()
       
    }

    buildDataGender = (data)=>{
        let result = [];
        let {language}=this.props;

        if(data && data.length > 0){
            data.map(item=>{
                let object={};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if(prevProps.genders !== this.props.genders){
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if(this.props.dataTime !== prevProps.dataTime){
            if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnchangeInput=(e, id)=>{
        let stateCopy={...this.state};
        stateCopy[id]= e.target.value;
        this.setState({
            ...stateCopy
        })

    }

    handleOnchangeDatePicker=(date)=>{
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect=(selectedOption)=>{
        this.setState({
            selectedGender: selectedOption
        })
    }

    //sendMail
    buildTimeBooking=(dataTime)=>{
        let {language}= this.props;

        if(dataTime && !_.isEmpty(dataTime)){
            //convert string to obj js
            let time=language ===LANGUAGES.VI ? dataTime.timeTypeData.valueVi: dataTime.timeTypeData.valueEn;

            let date=language===LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('dddd - MM/DD/YYYY')

            return `${time} - ${date}`
        }
        return ''
    }

    buildDoctorName = (dataTime)=>{
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)){
            let name = language === LANGUAGES.VI ?
            `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName} `
            :
            `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`

            return name;
        }
        return ''
    }



    //Appointment
    handleConfirmBooking=async() => {
        //validate

        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime)

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.fullName,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        console.log('check res: ', res.data)

        if(res && res.data.errCode === 0){
            toast.success('Booking a new appointment succed');
            this.props.isCloseModal()
        }else{
            toast.error('Booking a new appointment error')
        }
    }

    render() {
        let {isOpenModal, isCloseModal, dataTime}=this.props;

        let doctorId=dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';

        console.log('check state: ', this.state)


        return (
            <div>
                <Modal 
                    isOpen={isOpenModal} 
                    className={'booking-modal-container'}
                    size="lg"
                    centered
                >
                    <div className="header d-flex justify-content-between py-2 px-3" style={{borderBottom: '1px solid lightgrey'}}>
                        <h5>Thông tin đặt lịch khám bệnh</h5> 
                        <span onClick={isCloseModal} style={{cursor: 'pointer'}}><i className="fas fa-times"></i></span> 
                    </div>
                    <ModalBody className="pb-0">
                        {/* {JSON.stringify(dataTime)} */}
                        
                        <div className="doctor-infor">
                            <ProfileDoctor 
                                doctorId = {doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime = {dataTime}
                                isShowLinkDetail ={false}
                                isShowPrice={true}
                            />
                        </div>

                        <form>
                            <div className="row">
                                <div className="form-group col-md-3">
                                    <label>Họ tên</label>
                                    <input type="text" className="form-control" 
                                        value={this.state.fullName}
                                        onChange={(e)=> this.handleOnchangeInput(e, 'fullName')}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Số điện thoại</label>
                                    <input type="text" className="form-control" 
                                        value={this.state.phoneNumber}
                                        onChange={(e)=> this.handleOnchangeInput(e, 'phoneNumber')}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Địa chỉ Email</label>
                                    <input type="text" className="form-control" 
                                        value={this.state.email}
                                        onChange={(e)=> this.handleOnchangeInput(e, 'email')}
                                    />
                                </div>

                                <div className="form-group col-3">
                                    <label>Giới tính</label>
                                    <Select 
                                        value={this.state.seletedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}

                                    />
                                </div>
                            </div>

                            <div className="row my-3">
                                <div className="form-group col-3">
                                    <label>Ngáy sinh</label>
                                    <DatePicker 
                                        onChange={this.handleOnchangeDatePicker}
                                        className="form-control"
                                        value={this.state.birthday}
                                        // minDate={yesterday}
                                    />
                                </div>

                                <div className="form-group col-9">
                                    <label>Lý do khám</label>
                                    <input type="text" className="form-control" 
                                        value={this.state.reason}
                                        onChange={(e)=> this.handleOnchangeInput(e, 'reason')}
                                    />
                                </div>
                            </div>

                            <div className="row my-3">
                                <div className="form-group col-12">
                                    <label>Địa chỉ liên hệ</label>
                                    <input type="text" className="form-control" 
                                        value={this.state.address}
                                        onChange={(e)=> this.handleOnchangeInput(e, 'address')}
                                    />
                                </div>
                            </div>

                        </form>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button onClick={()=>this.handleConfirmBooking()} color="primary" className="px-3">Xác nhận</Button>
                        <Button onClick={isCloseModal} color="secondary" className="px-3">Huỷ</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       language: state.app.language,
       genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
