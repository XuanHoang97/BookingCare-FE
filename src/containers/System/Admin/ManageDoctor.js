import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: ''
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleEditorChange=({ html, text })=> {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown=()=>{
        console.log('check state: ', this.state)
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
        return ( 
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">TẠO THÔNG TIN Doctors</div>

                <div className="more-infor d-flex my-3">
                    <div className="content-left form-group col-5">
                        <label htmlFor="">Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={options}
                        />
                    </div>

                    <div className="content-right col-7">
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
                        style={{ height: '320px' }} 
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
