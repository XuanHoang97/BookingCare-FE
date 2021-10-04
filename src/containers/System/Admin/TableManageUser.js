import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    // fetch all user  
    componentDidMount() {
        this.props.fetchUserRedux()
    }

    //compare state_old vs state_present
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    //delete user 
    handleDeleteUser=(user)=>{
        this.props.deleteUserRedux(user.id);
    }

    //edit user
    handleEditUser=(user) =>{
        this.props.handleEditUserKey(user)
    }

    render() {
        let arrUsers=this.state.usersRedux;

        return ( 
            <React.Fragment>
                <table id="TableManageUser">
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
                        arrUsers && arrUsers.length >0 && 
                        arrUsers.map((item, index)=>{
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td className="d-flex" style={{gap:'15px'}}>
                                        <button 
                                            onClick={() => this.handleEditUser(item)}
                                            type="button" className="btn btn-primary d-flex justify-content-center align-items-center" 
                                            style={{width: '25px'}}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        
                                        <button 
                                            onClick={() => this.handleDeleteUser(item)}
                                            type="button" className="btn btn-danger d-flex justify-content-center align-items-center" 
                                            style={{width: '25px'}}>
                                            <i className="far fa-trash-alt"></i>
                                        </button>
                                    </td>     
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: ()=> dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
