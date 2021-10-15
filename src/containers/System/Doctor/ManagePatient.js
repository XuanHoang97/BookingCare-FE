import React, { Component } from 'react';
import { connect } from "react-redux";
import DatePicker from '../../../components/Input/DatePicker';
import {getAllPatientForDoctor, sendRemedy} from '../../../services/userService'
import moment from 'moment';
import RemedyModal from './RemedyModal'
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import './ManagePatient.scss'


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
           currentDate :moment(new Date()).startOf('day').valueOf(),
           dataPatient: [], 
           isOpenRemedyModal: false,
           dataModal: {},
           isshowLoading: false,
        }
    }

    componentDidMount() {
        this.getDataPatient()
        
    }

    getDataPatient = async () =>{
        let {user} =this.props;
        let {currentDate} = this.state;

        let formatedDate = new Date(currentDate).getTime();

        let res = await getAllPatientForDoctor({
            // doctorId: user.id,
            doctorId: [28, 33],
            date: formatedDate
        })

        if(res && res.data.errCode === 0){
            this.setState ({
                dataPatient: res.data.data
            })
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
       
        }


    }

    handleOnchangeDatePicker =(date)=>{
        this.setState({
            currentDate: date[0]
        }, async ()=>{
          await this.getDataPatient()
        })
    }

    //xac nhan dat lich kham benh
    handleBtnConfirm = (item)=>{
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }

        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })

    }

    isCloseModal = ()=>{
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        });
    }

    //sendRemedy
    sendRemedy = async(dataChild) =>{
        let {dataModal} = this.state;
        this.setState({
            isshowLoading: true
        })
    
        let res = await sendRemedy({
            // ...dataChild,
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        })
        if(res && res.data.errCode === 0){
            this.setState({
                isshowLoading: false
            })
            toast.success('send Remedy succeeds');
            this.isCloseModal();
            await this.getDataPatient();
        }else{
            this.setState({
                isshowLoading: false
            })
            toast.error('somthing wrongs...')
            console.log('error send remedy: ', res.data)
        }
    }



    render() {
        let {dataPatient, isOpenRemedyModal, dataModal} = this.state;
        let {language} = this.props;

        // console.log('check state patient: ', this.state)
        return (
            <>
                <LoadingOverlay
                active={this.state.isshowLoading}
                spinner
                text='Loading...'
                >

                <div className="manage-patient-container">
                    <div className="m-p-title my-3 text-center text-primary font-weight-bold h5" style={{textTransform: 'uppercase'}}>Quản lý bệnh nhân khám bệnh</div>

                    <div className="manage-patient-body">
                        <div className="col-4 form-group">
                            <label>Chọn ngày khám</label>
                            <DatePicker 
                                onChange={this.handleOnchangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                            />
                        </div>

                        <div className ="col-12">
                            <h6 className ="text-info">DANH SÁCH BỆNH NHÂN ĐẶT LỊCH KHÁM BỆNH</h6>
                        </div>

                        <div className="col-12">
                            <table className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>Họ và tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        dataPatient && dataPatient.length >0 ?
                                        dataPatient.map((item,index) => {
                                            return (
                                                <tr key={index}>
                                                    <td scope="row">{index + 1}</td>
                                                    <td>{item.timeTypeDataPatient.valueVi}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{item.patientData.genderData.valueVi}</td>
                                                    <td>
                                                        <button onClick = {() => this.handleBtnConfirm(item)} type="button" className="btn btn-success btn-sm">Xác nhận</button>
                                                        <button type="button" className="btn btn-danger btn-sm ml-3">Huỷ lịch khám</button>
                                                    </td>
                                                </tr>
                                            )
                                        })

                                        : <tr className="text-danger text-center">
                                            <td colSpan="6">
                                                Không có dữ liệu bệnh nhân ! 
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                <RemedyModal 
                    isOpenModal = {isOpenRemedyModal}
                    dataModal={dataModal}
                    isCloseModal = {this.isCloseModal}
                    sendRemedy={this.sendRemedy}
                />

                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
       language: state.app.language,
       user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
