import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import {FormattedMessage} from 'react-intl';

class Specialty extends Component {

    changeLanguage=(language)=>{
        this.props.changeLanguageAppRedux(language);
        //fire reduc event: actions
    }

    render() {
        return (
            <div className="section-specialty">
                <div className="specialty-content">
                    Specialty
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);