import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';

import {LANGUAGES} from '../../../utils';
import {getScheduleDoctorByDate} from "../../../services/userService"
import {FormattedMessage} from 'react-intl';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
        }
    }

    async componentDidMount() {

       
    }


    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
       
        }

    }

    //show-hide detail infor
    showHideDetailInfor=(status)=>{
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let {isShowDetailInfor}=this.state;

        return (
            <div className="doctor-extra-infor-container pl-3">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">Phòng khám chuyên khoa da liễu</div>
                    <div className="detail-address">207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                </div>

                <div className="content-down">
                    {isShowDetailInfor===false ?
                    <div className="price">GIÁ KHÁM: 250.000đ. 
                        <span onClick={()=>this.showHideDetailInfor(true)} className="text-info ml-3">Xem chi tiết </span> 
                    </div>
                    :
                    <>
                        <div>GIÁ KHÁM: .</div>

                        <div class="card">
                            <div class="card-header">
                                <div className="price-infor d-flex justify-content-beetween">
                                    <div className="price-title">Giá khám</div>
                                    <div className="price text-danger">250.000đ</div>
                                </div>

                                <div>
                                    Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho người nước ngoài là 30 USD
                                </div>
                            </div>
                            <div class="card-body">
                                <div>Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ</div>
                            </div>
                        </div>
                        <div onClick={()=>this.showHideDetailInfor(false)} className="text-info mt-2">Ẩn bảng giá</div>
                    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
