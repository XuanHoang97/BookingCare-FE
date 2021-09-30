import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES} from "../../../utils"
import * as actions from "../../../store/actions"
import "./UserRedux.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
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
        if(prevProps.genderRedux !== this.props.genderRedux){
            this.setState({
                genderArr: this.props.genderRedux,
            })
        }
        
        if(prevProps.positionRedux !== this.props.positionRedux){
            this.setState({
                positionArr: this.props.positionRedux,
            })
        }

        if(prevProps.roleRedux !== this.props.roleRedux){
            this.setState({
                roleArr: this.props.roleRedux,
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


    render() {
        let genders=this.state.genderArr;
        let roles=this.state.roleArr;
        let positions=this.state.positionArr;
        let {language}=this.props;
        let isGetGenders=this.props.isLoadingGender;


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

                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.email"/></label>
                                <input type="email" class="form-control" placeholder="Email" />
                            </div>
                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input type="password" class="form-control" placeholder="Password" />
                            </div>

                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.first-name"/></label>
                                <input type="email" class="form-control" placeholder="Email" />
                            </div>
                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.last-name"/></label>
                                <input type="text" class="form-control" placeholder="Password" />
                            </div>
                            
                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.phone-number"/></label>
                                <input type="text" class="form-control" placeholder="0123456789" />
                            </div>

                            <div class="form-group col-9">
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input type="text" class="form-control" placeholder="Apartment, studio, or floor" />
                            </div>
                            
                            <div class="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id="manage-user.gender"/></label>
                                <select class="form-control">
                                    {
                                        genders && genders.length >0 &&
                                        genders.map((item,index)=>{
                                            return(
                                                <option key={index}>
                                                    {language===LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div class="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id="manage-user.position"/></label>
                                <select class="form-control">
                                    {
                                        positions && positions.length >0 &&
                                        positions.map((item,index)=>{
                                            return(
                                                <option key={index}>
                                                    {language===LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div class="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id="manage-user.role"/></label>
                                <select class="form-control">
                                    {
                                        roles && roles.length >0 &&
                                        roles.map((item,index)=>{
                                            return(
                                                <option key={index}>
                                                    {language===LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div class="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id="manage-user.image"/></label>
                                
                                <div className="preview-img-container">
                                    <input id="previewImg" type="file" hidden 
                                    onChange={(e)=>this.handleOnchangeImage(e)} 
                                    />

                                    <label htmlFor="previewImg" className="btn btn-success w-100"><i class="fas fa-upload"></i> Tải ảnh</label>
                                    
                                    <div className="preview-image" 
                                        style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                        onClick={()=>this.openPreviewImage()}
                                    >
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-3">
                                <button class="btn btn-primary"><FormattedMessage id="manage-user.save"/></button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: ()=> dispatch(actions.fetchGenderStart()),
        getPositionStart: ()=> dispatch(actions.fetchPositionStart()),
        getRoleStart: ()=> dispatch(actions.fetchRoleStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
