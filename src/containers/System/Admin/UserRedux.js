import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES} from "../../../utils"
import * as actions from "../../../store/actions"
import "./UserRedux.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser'
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        }
    }

    //fetch data
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    // render data 
    componentDidUpdate(prevProps, prevState, snapshot){
        //get data default select option
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders=this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length>0 ? arrGenders[0].key : ''
            })
        }
        
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions= this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length>0 ? arrPositions[0].key : ''
            })
        }

        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles=this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length>0 ? arrRoles[0].key :''
            })
        }

        //reset value after create success a new userr
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }
    }

    //upload file
    handleOnchangeImage=(e)=>{
        let data=e.target.files;
        let file=data[0];
        if(file){
            let objectUrl=URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: file
            })
        }

    }

    //preview-image
    openPreviewImage=()=>{
        if(!this.state.previewImgURL)return;
        this.setState({
            isOpen: true,
        })
    }

    //add new a user
    handleSaveUser=()=>{
        let isValid=this.checkValidateInput();
        if(isValid===false) return;

        //fire redux action
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position
        })
    }

    //validate 
    checkValidateInput=()=>{
        let isValid=true;
        let arrCheck=['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for(let i=0; i< arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid=false;
                alert('This input is required: '+ arrCheck[i])
                break;
            }
        }

        return isValid;
    }

    //onchange
    onChangeInput=(e, id)=>{
        let copyState={...this.state}
        copyState[id]=e.target.value;
        this.setState({
            ...copyState
        })
    }


    render() {
        let genders=this.state.genderArr;
        let roles=this.state.roleArr;
        let positions=this.state.positionArr;
        let {language}=this.props;
        let isGetGenders=this.props.isLoadingGender;

        let {email, password, firstName, lastName,
            phoneNumber, address, gender, position, role, avatar}=this.state;

        return (
            <div className="user-redux-container">
                <div className="title">
                    LEARN REACT-REDUX WITH 'HOANG97'
                </div>
                <div>{isGetGenders===true ? 'Loading genders' : ''}</div>

                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3">
                                <FormattedMessage id="manage-user.add"/>
                            </div>

                            <div className="form-group col-3">
                                <label><FormattedMessage id="manage-user.email"/></label>
                                <input value={email} onChange={(e) => this.onChangeInput(e, 'email')} type="email" className="form-control" />
                            </div>

                            <div className="form-group col-3">
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input value={password} onChange={(e) => this.onChangeInput(e, 'password')} type="password" className="form-control" />
                            </div>

                            <div className="form-group col-3">
                                <label><FormattedMessage id="manage-user.first-name"/></label>
                                <input value={firstName} onChange={(e) => this.onChangeInput(e, 'firstName')} type="email" className="form-control" />
                            </div>
                            <div className="form-group col-3">
                                <label><FormattedMessage id="manage-user.last-name"/></label>
                                <input value={lastName} onChange={(e) => this.onChangeInput(e, 'lastName')} type="text" className="form-control"  />
                            </div>
                            
                            <div className="form-group col-3">
                                <label><FormattedMessage id="manage-user.phone-number"/></label>
                                <input value={phoneNumber} onChange={(e) => this.onChangeInput(e, 'phoneNumber')} type="text" className="form-control" />
                            </div>

                            <div className="form-group col-9">
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input value={address} onChange={(e) => this.onChangeInput(e, 'address')} type="text" className="form-control"  />
                            </div>
                            
                            <div className="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id="manage-user.gender"/></label>
                                <select className="form-control"
                                    onChange={(e) => this.onChangeInput(e, 'gender')}
                                >
                                    {
                                        genders && genders.length >0 &&
                                        genders.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.key}>
                                                    {language===LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id="manage-user.position"/></label>
                                <select className="form-control"
                                    onChange={(e) => this.onChangeInput(e, 'position')}
                                >
                                    {
                                        positions && positions.length >0 &&
                                        positions.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.key} >
                                                    {language===LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id="manage-user.role"/></label>
                                <select className="form-control"
                                    onChange={(e) => this.onChangeInput(e, 'role')}
                                >
                                    {
                                        roles && roles.length >0 &&
                                        roles.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.key}>
                                                    {language===LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id="manage-user.image"/></label>
                                
                                <div className="preview-img-container">
                                    <input id="previewImg" type="file" hidden 
                                    onChange={(e)=>this.handleOnchangeImage(e)} 
                                    />

                                    <label htmlFor="previewImg" className="btn btn-success w-100"><i className="fas fa-upload"></i> Tải ảnh</label>
                                    
                                    <div className="preview-image" 
                                        style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                        onClick={()=>this.openPreviewImage()}
                                    >
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 my-3">
                                <button className="btn btn-primary" onClick={() => this.handleSaveUser()}>
                                    <FormattedMessage id="manage-user.save"/>
                                </button>
                            </div>
                        
                            <div className="col-12 mb-5">
                                <TableManageUser/>
                            </div>
                        </div>
                    </div>
                </div>
                

                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGenderReact: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: ()=> dispatch(actions.fetchGenderStart()),
        getPositionStart: ()=> dispatch(actions.fetchPositionStart()),
        getRoleStart: ()=> dispatch(actions.fetchRoleStart()),
        createNewUser: (data)=> dispatch(actions.createNewUser(data)),
        fetchUserRedux: ()=> dispatch(actions.fetchAllUsersStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
