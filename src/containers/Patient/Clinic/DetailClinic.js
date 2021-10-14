import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {getAllDetailClinic, getAllCodeService} from '../../../services/userService';
import _ from 'lodash'

import {FormattedMessage} from 'react-intl';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id=this.props.match.params.id;

            let res=await getAllDetailClinic({
                id: id,
            });
            
            if(res && res.data.errCode === 0) {
                let data = res.data.data;
                let arrDoctorId = [];
                if(data && !_.isEmpty(res.data.data)){
                    let arr = data.doctorClinic;
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data.data,
                    arrDoctorId: arrDoctorId,
                })
            }            
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
       
        }


    }

    render() {
        let {arrDoctorId, dataDetailClinic} = this.state;

        console.log("check state: " , this.state);
        return (
            <div className="detail-specialty-container bg-light">
                <HomeHeader />

                <div className="detail-specialty-body" style = {{margin: '0 60px'}}>
                    <div className = "description-specialty my-3 p-3 bg-white">
                        {   
                            dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                            <>  
                                <div className="name text-info mb-4 font-weight-bold h5" style = {{textTransform: 'uppercase'}}>
                                    {dataDetailClinic.name}
                                </div>
                                
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML}} >
                                    
                                </div>

                            </>
                        }
                    </div>


                    {
                        arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item,index)=>{
                            return (
                                <div className="each-doctor d-flex my-3 py-3 bg-white" key={index} style={{minHeight: '300px', border: '1px solid lightgrey'}}>
                                    <div className="content-left col-6">
                                        <div className="profile-doctor">
                                            <ProfileDoctor 
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail ={true}
                                                isShowPrice={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
