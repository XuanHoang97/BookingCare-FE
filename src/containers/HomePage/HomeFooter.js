import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl';


class HomeFooter extends Component {
    render() {
        
        return (
            <div className="home-footer">
                <p className="text-center text-success">Start project: 24/09/2021</p>
                <p className="text-center">&copy; 2021 Hoangle97.
                    <span>More information, please visit:</span>
                    <a href="https://github.com/nothing1997" target="_blank" className=""> https://github.com/nothing1997</a>      
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);