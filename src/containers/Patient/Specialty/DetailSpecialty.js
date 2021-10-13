import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {getAllDetailSpecialty, getAllCodeService} from '../../../services/userService';
import _ from 'lodash'

import {FormattedMessage} from 'react-intl';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            // arrDoctorId: [28]
            dataDetailSpecialty: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id=this.props.match.params.id;

            let res=await getAllDetailSpecialty({
                id: id,
                location: 'ALL'
            });

            let resProvince = await getAllCodeService('PROVINCE');
            
            if(res && res.data.errCode === 0 && resProvince && resProvince.data.errCode === 0) {
                let data = res.data.data;
                let arrDoctorId = [];
                if(data && !_.isArray(res.data.data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: resProvince.data.data
                })
            }            
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
       
        }


    }

    handleOnchangeSelect = (e) => {
        console.log('check onchange: ', e.target.value);
    }

    render() {
        let {arrDoctorId, dataDetailSpecialty, listProvince} = this.state;

        console.log("check state: " , this.state);
        return (
            <div className="detail-specialty-container">
                <HomeHeader />

                <div className="detail-specialty-body" style = {{margin: '0 60px'}}>
                    <div className = "description-specialty my-3">
                        {
                            dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML}} >
                                
                            </div>
                        }
                    </div>

                    <div className="search-sp-doctor col-2 p-0">
                        <select class="form-control" onChange={(e) => this.handleOnchangeSelect(e)}>
                            {
                                listProvince && listProvince.length >0 &&
                                listProvince.map((item,index)=>{
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {item.valueVi}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    {
                        arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item,index)=>{
                            return (
                                <div className="each-doctor d-flex my-3 py-3" key={index} style={{minHeight: '300px', border: '1px solid lightgrey'}}>
                                    <div className="content-left col-6">
                                        <div className="profile-doctor">
                                            <ProfileDoctor 
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="content-right col-6">
                                        <div style = {{borderBottom: '1px solid lightgrey'}}>
                                            <DoctorSchedule 
                                                doctorIdFromParent={item} 
                                            />
                                        </div>

                                        <div  className="my-3">
                                            <DoctorExtraInfor 
                                                doctorIdFromParent={item}
                                            />
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
