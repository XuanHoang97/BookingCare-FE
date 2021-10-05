import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import {LANGUAGES} from "../../../utils"
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
    }

    //render data
    buildDataInputSelect =(inputData)=>{
        let result =[];
        let {language}=this.props;

        if(inputData && inputData.length > 0){
            inputData.map((item,index)=>{
                let object={};
                let labelVi=`${item.lastName} ${item.firstName}`;
                let labelEn=`${item.firstName} ${item.lastName}`;
                object.label =language ===LANGUAGES.VI ? labelVi : labelEn;
                object.value=item.id;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect=this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            })
        }

        if(prevProps.language !== this.props.language){
            let dataSelect=this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            })
        }
    }


    handleEditorChange=({ html, text })=> {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    //save infor doctor
    handleSaveContentMarkdown=()=>{
        this.props.saveDetailDoctors({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
        })
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor });
        console.log(`Option selected:`, selectedDoctor);
    };

    handleOnchangeDesc=(e)=>{
        this.setState({
            description: e.target.value,
        })
    }


    render() {
        console.log('hoangchnnel: ', this.state)

        return ( 
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">TẠO THÔNG TIN Doctors</div>

                <div className="more-infor d-flex my-3">
                    <div className="content-left form-group col-2">
                        <label htmlFor="">Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                        />
                    </div>

                    <div className="content-right col-10">
                        <label>Thông tin giới thiệu</label>
                        <textarea className="form-control"
                            onChange={(e)=> this.handleOnchangeDesc(e)}
                            value={this.state.description}
                        >
                            Hoanglele
                        </textarea>
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor 
                        style={{ height: '320px'}} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                    />
                </div>
                <button 
                    className="btn btn-success my-3"
                    onClick={()=> this.handleSaveContentMarkdown()}
                >
                    Lưu thông tin
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: (id)=> dispatch(actions.fetchAllDoctors()),
        saveDetailDoctors: (data)=> dispatch(actions.saveDetailDr(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
