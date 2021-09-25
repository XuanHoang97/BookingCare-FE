import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from "../../utils/emitter"
class ModalUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }

        this.listenToEmitter();
    }

    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', ()=>{
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '', 
            })
        })
    }

    componentDidMount() {
    }

    toggle =()=>{
        this.props.toggleFromParent();
    }

    //onChange Fields
    handleOnChangeInput=(e, id)=>{
        //good code
        let copyState={...this.state}
        copyState[id]=e.target.value;
        this.setState({
            ...copyState
        });
    }

    //validate 
    checkValidateInput=()=>{
        let isValid=true;
        let arrInput=['email', 'password', 'firstName', 'lastName', 'address']
        for(let i=0; i<arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid=false;
                alert('Missing parameter: '+ arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    //tranmission data from parent to child
    handleAddNewUser=()=>{
        let isValid=this.checkValidateInput();
        if(isValid===true){
            //call api create modal
            this.props.createNewUser(this.state);
        }
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={()=>this.toggle()} 
                className={'modal-user-container'}
                size="lg"
            >
                
                <ModalHeader toggle={()=>this.toggle()}>Create a new user</ModalHeader>
                <ModalBody>
                        <form>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label>Email</label>
                                    <input onChange={(e)=>this.handleOnChangeInput(e, "email")} value={this.state.email} type="email" className="form-control" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Password</label>
                                    <input onChange={(e)=>this.handleOnChangeInput(e, "password")} value={this.state.password} type="password" className="form-control" />
                                </div>
                            </div>

                            <div className="row my-3">
                                <div className="form-group col-md-6">
                                    <label>First name</label>
                                    <input onChange={(e)=>this.handleOnChangeInput(e, "firstName")} value={this.state.firstName} type="text" className="form-control" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Last name</label>
                                    <input onChange={(e)=>this.handleOnChangeInput(e, "lastName")} value={this.state.lastName} type="text" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input onChange={(e)=>this.handleOnChangeInput(e, "address")} type="text" className="form-control" />
                            </div>
                        </form>
                </ModalBody>
                <ModalFooter>
                <Button onClick={()=>this.handleAddNewUser()} color="primary" className="px-3">Add new</Button>{' '}
                <Button color="secondary" className="px-3" onClick={()=>this.toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {//code chay co loi ko,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
