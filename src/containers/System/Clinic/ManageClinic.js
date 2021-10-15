import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils"
import {createNewClinic} from '../../../services/userService'
import {toast} from 'react-toastify'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: '',
        }
    }

    async componentDidMount() {

       
    }


    async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.language !== this.props.language){
       
        }


    }

    handleOnchangeInput = (e, id) => {
        let stateCopy = {...this.state};
        stateCopy[id] =e.target.value;
        this.setState({
            ...stateCopy,
        })
    }

    handleEditorChange=({ html, text })=> {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

     //upload file
     handleOnchangeImage=async(e)=>{
        let data=e.target.files;
        let file=data[0];
        if(file){
            //read file
            let base64=await CommonUtils.getBase64(file);
            
            this.setState({
                imageBase64: base64
            })
        }

    }

    // create specialty
    handleSaveNewClinic = async() => {
        let res = await createNewClinic(this.state)

        if(res && res.data.errCode === 0){
            toast.success('Add new Clinic succeed')
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        }else{
            toast.error('something went wrong: ')
        }
        
    }

    render() {

        console.log('check state: ', this.state)

        return (
            <div className = "manage-specialty-container">
                <div className="ms-title">Quản lý phòng khám</div>

                <div className="add-new-specialty row mx-1">
                    <div className="col-3 form-group">
                        <label>Tên phòng khám</label>
                        <input type="text" className="form-control" 
                            value={this.state.name}
                            onChange={(e) =>this.handleOnchangeInput(e, 'name')}
                        />
                    </div>

                    <div className="col-3 form-group">
                        <label>Ảnh phòng khám</label>
                        <input type="file" className="form-control-file" 
                            onChange ={(e) => {this.handleOnchangeImage(e)}}
                        />
                    </div>   

                    <div className="col-6 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input type="text" className="form-control" 
                            value={this.state.address}
                            onChange={(e) =>this.handleOnchangeInput(e, 'address')}
                        />
                    </div>

                    <div className="col-12">
                        <MdEditor 
                                style={{ height: '200px'}} 
                                renderHTML={text => mdParser.render(text)} 
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown} 
                        />
                    </div>

                    <div className="col-12 mt-3">
                        <button type="button" className="btn btn-primary"
                            onClick={() =>this.handleSaveNewClinic()}
                        >
                            Save
                        </button>
                    </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
