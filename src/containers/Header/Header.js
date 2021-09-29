import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import {LANGUAGES} from "../../utils";
import {FormattedMessage} from "react-intl";

class Header extends Component {
    handleChangeLanguage=(language)=>{
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log('check user', userInfo);

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className="languages">
                    <span className="welcome">
                        <FormattedMessage id="home-header.welcome" />
                        {userInfo && userInfo.firstName ? userInfo.firstName : 'Hoang97'}
                    </span>

                    <span 
                        onClick={() =>this.handleChangeLanguage(LANGUAGES.VI)} 
                        className={language===LANGUAGES.VI ? "language-vi active" : "language-vi" } 
                    >VN
                    </span>

                    <span 
                        onClick={() =>this.handleChangeLanguage(LANGUAGES.EN)} 
                        className={language===LANGUAGES.EN ? "language-en active" : "language-en" } 
                    >EN
                    </span>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="logout">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language)=> dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
