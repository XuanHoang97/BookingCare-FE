import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils"
import {toast} from 'react-toastify';
import moment from 'moment';


class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        }
    }

    async componentDidMount() {
        if(this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.dataModal !== this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        })
    }

    //upload file
    handleOnchangeImage=async(e)=>{
        let data=e.target.files;
        let file=data[0];
        if(file){
            //read file
            let base64=await CommonUtils.getBase64(file);            
            this.setState({
                imgBase64: base64,
            })
        }
    }

    handleSendRemedy = ()=> {
        this.props.sendRemedy(this.state)
    }

    

    render() {
        let {isOpenModal, isCloseModal, dataModal, sendRemedy}=this.props;


        // console.log('check state: ', this.state)

        return (
            <div>
                <Modal 
                    isOpen={isOpenModal} 
                    className={'booking-modal-container'}
                    size="lg"
                    centered
                >
                    <div className="header d-flex justify-content-between py-2 px-3" style={{borderBottom: '1px solid lightgrey'}}>
                        <h5>Gửi hoá đơn khám bệnh</h5> 
                        <span onClick={isCloseModal} style={{cursor: 'pointer'}}><i className="fas fa-times"></i></span> 
                    </div>
                    <ModalBody className="pb-0">
                        <div className="row">
                            <div className="col-6 form-group">
                                <div className="mail">
                                    <label>Email bệnh nhân</label>
                                    <input type="email" value = {this.state.email} className="form-control" 
                                        onChange={(e) => this.handleOnChangeEmail(e)}
                                    />
                                </div>
                            </div>

                            <div className="col-6 form-group">
                                <div className="">
                                    <label>Chọn file hoá đơn</label>
                                    <input type="file" 
                                        onChange={(e) => this.handleOnchangeImage(e)}
                                    />
                                </div>
                            </div>
                        </div>

                    </ModalBody>
                    
                    <ModalFooter>
                        <Button onClick={()=>this.handleSendRemedy()} color="primary" className="px-3">Xác nhận</Button>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
