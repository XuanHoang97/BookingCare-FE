import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService' ;
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser'
import {emitter} from "../../utils/emitter";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    // call api
    async componentDidMount() {
        await this.getAllUsers();
    }

    //display users to the view (READ)
    getAllUsers=async()=>{
        let response =await getAllUsers('ALL');
        if(response && response.data.errCode === 0){
            this.setState({
                arrUsers: response.data.users
            })
        }
    }
    
    // Create users (CREATE)
    handleAddNewUser=()=> {
        this.setState({
            isOpenModalUser:  true,
        })
    }

    toggleUserModal=()=> {
        this.setState({
            isOpenModalUser:  !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal=()=>{
        this.setState({
            isOpenModalEditUser:  !this.state.isOpenModalEditUser,
        })
    }

    createNewUser=async(data)=> {
        try{
            let response= await createNewUserService(data);
            if(response && response.data.errCode !==0){
                alert(response.data.errMessage);
            }else{
                await this.getAllUsers();
                this.setState({
                    isOpenModalUser: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        }catch(e){
            console.log(e)
        }
    }

    handleDeleteUser=async(user)=>{
        try{
            let res=await deleteUserService(user.id)
            if(res && res.data.errCode ===0 ){
                await this.getAllUsers();
            }else{
                alert(res.data.errMessage)
            }
        }catch(e){
            console.log(e)
        }
        console.log('click delete', user)
    }

    handleEditUser=(user)=>{
        console.log('test', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        })
    }

    doEditUser=async(user)=>{
        try{
            let res=await editUserService(user);
            if(res && res.data.errCode === 0){
                this.setState({
                    isOpenModalEditUser: false,
                })
                await this.getAllUsers();
            }else{
                alert(res.data.errCode)
            }
        }catch(e){
            console.log(e)
        }
       
        // console.log('click save user', res);
    }

    render() {
        let {arrUsers}=this.state;

        return ( 
            <div className = "users-container" >
                <ModalUser 
                    isOpen={this.state.isOpenModalUser} 
                    toggleFromParent={this.toggleUserModal} 
                    createNewUser={this.createNewUser}
                />

                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser} 
                        toggleFromParent={this.toggleUserEditModal} 
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }

                <div className="title text-center">
                    Manage users with Hoangle 
                </div>

                <div className="mx-2">
                    <button onClick={()=>this.handleAddNewUser()} type="button" className="btn btn-primary px-3">
                        <i className="fas fa-plus"></i> Add new user
                    </button>
                </div>

                <div className="users-table mt-3 mx-2">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {
                                arrUsers && arrUsers.map((item, index)=>{
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td className="d-flex justify-content-center" style={{gap:'15px'}}>
                                                <button onClick={() => this.handleEditUser(item)} type="button" className="btn btn-primary" style={{width: '25px'}}><i className="fas fa-pencil-alt"></i></button>
                                                <button onClick={() => this.handleDeleteUser(item)} type="button" className="btn btn-danger" style={{width: '25px'}}><i className="far fa-trash-alt"></i></button>
                                            </td>     
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);