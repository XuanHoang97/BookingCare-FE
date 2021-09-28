import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="user-redux-container">
                <div className="title">
                    User redux Hoang97
                </div>
                <div className="user-redux-body" >
                    Thêm mới người dùng
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
