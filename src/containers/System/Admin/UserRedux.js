import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService} from '../../../services/userService'

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try{
            let res=await getAllCodeService('gender');
            if(res && res.errCode ===0){
                this.setState({
                    genderArr: res.data
                })
            }
            console.log('check res: ', res)
        }catch(e){
            console.log(e);
        }
    }


    render() {
        console.log('check state: ', this.state);
        let genders=this.state.genderArr;

        return (
            <div className="user-redux-container">
                <div className="title">
                    LEARN REACT-REDUX WITH 'HOANG97'
                </div>
                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3">
                                <FormattedMessage id="manage-user.add"/>
                            </div>

                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.email"/></label>
                                <input type="email" class="form-control" placeholder="Email" />
                            </div>
                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input type="password" class="form-control" placeholder="Password" />
                            </div>

                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.first-name"/></label>
                                <input type="email" class="form-control" placeholder="Email" />
                            </div>
                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.last-name"/></label>
                                <input type="text" class="form-control" placeholder="Password" />
                            </div>
                            
                            <div class="form-group col-3">
                                <label><FormattedMessage id="manage-user.phone-number"/></label>
                                <input type="text" class="form-control" placeholder="0123456789" />
                            </div>

                            <div class="form-group col-9">
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input type="text" class="form-control" placeholder="Apartment, studio, or floor" />
                            </div>
                            
                            <div class="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id="manage-user.gender"/></label>
                                <select class="form-control">
                                    {
                                        genders && genders.length >0 &&
                                        genders.map((item,index)=>{
                                            return(
                                                <option key={index}>{item.valueVi}</option>
                                            )
                                        })
                                    }
                                    
                                </select>
                            </div>

                            <div class="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id="manage-user.position"/></label>
                                <select class="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>

                            <div class="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id="manage-user.role"/></label>
                                <select class="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>

                            <div class="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id="manage-user.image"/></label>
                                <input type="text" class="form-control" />
                            </div>

                            <div className="col-12 mt-3">
                                <button class="btn btn-primary"><FormattedMessage id="manage-user.save"/></button>
                            </div>
                        </div>
                    </div>
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
