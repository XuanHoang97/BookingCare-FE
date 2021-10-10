import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import {FormattedMessage} from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    async componentDidMount() {

       
    }


    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
       
        }


    }

    render() {
        let {isOpenModal, isCloseModal, dataTime}=this.props;

        // let doctorId = '';
        // if(dataTime && !_.isEmpty(dataTime)){
        //     doctorId=dataTime.doctorId;
        // }

        let doctorId=dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';

        console.log('data props from modal: ', this.props)
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
                    <ModalBody>
                        {/* {JSON.stringify(dataTime)} */}
                        
                        <div className="doctor-infor">
                            <ProfileDoctor 
                                doctorId = {doctorId}
                            />
                        </div>

                        <form>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label>Họ tên</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Số điện thoại</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>

                            <div className="row my-3">
                                <div className="form-group col-md-6">
                                    <label>Địa chỉ Email</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Địa chỉ liên hệ</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Lý do khám</label>
                                <input type="text" className="form-control" />
                            </div>

                            <div className="row my-3">
                                <div className="form-group col-md-6">
                                    <label>Đặt cho ai</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Giới tính</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button onClick={isCloseModal} color="primary" className="px-3">Xác nhận</Button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
