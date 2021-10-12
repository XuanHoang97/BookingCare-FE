import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../HomePage/HomeHeader';
import {FormattedMessage} from 'react-intl';
import {postVerifyBookAppointment} from "../../services/userService"

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
           statusVerify: false,
           errCode: 0
        }
    }

    async componentDidMount() {
        //tranmission params
        if(this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');

            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId,
            })

            if(res && res.data.errCode === 0){
                this.setState({
                    statusVerify: true,
                    errCode: res.data.errCode,
                })
            }else{
                this.setState({
                    statusVerify: true,
                    errCode: res && res.data.errCode ? res.data.errCode : -1
                })
            }
        }
       
    }


    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
       
        }


    }

    render() {
        let {statusVerify, errCode} = this.state;
        
        return (
            <>
                <HomeHeader />
                {
                    statusVerify === false ?
                        <div>Loading data...</div>
                    :   
                    <div className ="mt-3">
                        {
                            errCode === 0 ?
                            <div className="text-success text-center h5 text-uppercase">Xác nhận lịch hẹn thành công</div>:
                            <div className="text-danger text-center h5 text-uppercase">Lịch hẹn không tồn tại hoặc đã được xác nhận</div>
                        }
                    </div>

                }
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
