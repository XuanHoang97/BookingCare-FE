import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss'
import {FormattedMessage} from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils"
import {createNewSpecialty} from '../../../services/userService'
import {toast} from 'react-toastify'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageScpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
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

    handleSaveNewSpecialty = async() => {
        let res = await createNewSpecialty(this.state)

        if(res && res.data.errCode === 0){
            toast.success('Add new specialty succeed')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        }else{
            toast.error('hoang check res: ', res)
        }
        
    }

    render() {

        console.log('check state: ', this.state)

        return (
            <div className = "manage-specialty-container">
                <div className="ms-title">Quản lý chuyên khoa</div>

                <div className="add-new-specialty row mx-1">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input type="text" className="form-control" 
                            value={this.state.name}
                            onChange={(e) =>this.handleOnchangeInput(e, 'name')}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Ảnh chuyên khoa</label>
                        <input type="file" className="form-control-file" 
                            onChange ={(e) => {this.handleOnchangeImage(e)}}
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
                        <button type="button" class="btn btn-primary"
                            onClick={() =>this.handleSaveNewSpecialty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageScpecialty);
