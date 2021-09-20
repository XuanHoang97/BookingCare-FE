import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
    }

    render() {
        return (
            <div className="login-bg">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="login col-12 text-login"> Login </div>
                        <div className="col-12 form-group login-input">
                            <label htmlFor="">Username</label>
                            <input type="text" className="form-control" placeholder="Enter your Username"/>
                        </div>
                        
                        <div className="col-12 form-group login-input">
                            <label htmlFor="">Password</label>
                            <input type="password" className="form-control" placeholder="Enter your Password"/>
                        </div>

                        <div className="col-12">
                            <button className="btn-login">Login</button>
                        </div>

                        <div className="col-12">
                            <span className="forgot-password small">Forgot for Password ?</span>
                        </div>

                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login"> Or login with: </span>
                        </div>

                        <div className="col-12 social-login">
                            <i class="fab fa-google-plus-g google"></i>
                            <i class="fab fa-twitter twitter"></i>
                            <i class="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
