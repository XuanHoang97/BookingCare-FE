import React, { Component } from 'react';
import { connect } from "react-redux";
import {FormattedMessage} from 'react-intl';
import {getProfileDoctorById} from '../../../services/userService';
import { LANGUAGES } from 'utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
           dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({dataProfile: data})
    }

    //get infor doctor
    getInforDoctor = async(id) =>{
        let result = {};
        if(id){
            let res = await getProfileDoctorById(id);
            if(res && res.data.errCode ===0){
                result =res.data.data;
            }
        }
        return result;
    }


    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
       
        }

        if(this.props.doctorId !== prevState.doctorId){
            // this.getInforDoctor(this.props.doctorId)
        }

    }

    //description doctor
    renderBookingModal=(dataTime)=>{
        let {language}= this.props;

        if(dataTime && !_.isEmpty(dataTime)){
            //convert string to obj js
            let time=language ===LANGUAGES.VI ? dataTime.timeTypeData.valueVi: dataTime.timeTypeData.valueEn;

            let date=language===LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('dddd - MM/DD/YYYY')
            
            return (
                <>
                    <div>{time} - {date}</div>
                    <div>Miễn phí đặt lịch</div>
                </>
            )
        }
        return <></>;
    }

    render() {
        let {dataProfile}=this.state;
        let {language, isShowDescriptionDoctor, dataTime}=this.props;

        let nameVi ='', nameEn= '';
        if(dataProfile && dataProfile.positionData){
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }

        console.log('check state: ', this.state)
        return (
            <div>
                <div className="intro-doctor" style= {{display: 'grid', gridTemplateColumns: '18% 82%'}}>
                    <div className="content-left"
                        style={{backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`, 
                        height:'80px', width: '80px',borderRadius: '50%', backgroundRepeat:'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}
                    >

                    </div>

                    <div className="content-right my-1">
                        <h5 className="up font-weight-bold">
                            {language===LANGUAGES.VI ? nameVi : nameEn}
                        </h5>
                        <div className="down">
                            {isShowDescriptionDoctor === true ? 
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                        && <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                : <>{this.renderBookingModal(dataTime)}</>
                            }
                        </div>
                    </div>
                </div>

                <div className="price my-3">
                    Giá khám: 
                    {
                        dataProfile && dataProfile.Doctor_Infor && language===LANGUAGES.VI ?
                        <NumberFormat
                            value={dataProfile.Doctor_Infor.priceTypeData.valueVi }
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                            className="mx-2 text-primary"
                        />
                        : <span className="text-warning"> Đang cập nhật...</span> 
                        
                    }

                    {
                        dataProfile && dataProfile.Doctor_Infor && language===LANGUAGES.EN &&
                        <NumberFormat
                            value={dataProfile.Doctor_Infor.priceTypeData.valueEn }
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                            className="mx-2 text-primary"
                        /> 
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
