import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers} from '../../services/userService' ;
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    // call api
    async componentDidMount() {
        let response =await getAllUsers('ALL');
        if(response && response.data.errCode === 0){
            this.setState({
                arrUsers: response.data.users
            })
        }
    }


    render() {
        let arrUsers=this.state.arrUsers;
        console.log('check render', this.state);

        return ( 
            <div className = "users-container" >
                <div className="title text-center">
                    Manage users with Hoangle 
                </div>

                <div className="users-table mt-3 mx-2">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        
                        {
                            arrUsers && arrUsers.map((item, index)=>{
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td className="d-flex justify-content-center" style={{gap:'15px'}}>
                                            <button type="button" class="btn btn-primary" style={{width: '35px'}}><i class="fas fa-pencil-alt"></i></button>
                                            <button type="button" class="btn btn-danger" style={{width: '35px'}}><i class="far fa-trash-alt"></i></button>
                                        </td>     
                                    </tr>
                                )
                            })
                        }
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