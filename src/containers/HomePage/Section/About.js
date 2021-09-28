import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl';


class About extends Component {
    render() {
        
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói về Github
                </div>

                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="400" src="https://www.youtube.com/embed/a28c0MLNtqY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>

                    <div className="content-right">
                        <p>✔ Be aware all music and pictures belongs to the original artists.
                            ✔ This video was given a special license directly from the artists.
                            ✖ I am in no position to give anyone permission to use this
                        </p>
                        
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);