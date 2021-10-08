import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';

import Select from 'react-select';
import {LANGUAGES, CRUD_ACTIONS} from "../../../utils"
import {getDetailInforDoctor} from "../../../services/userService";


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdouwn to table
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            selectedDoctor: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfor();
    }

    //render data
    buildDataInputSelect =(inputData, type)=>{
        let result =[];
        let {language}=this.props;

        if(inputData && inputData.length > 0){
            inputData.map((item,index)=>{
                let object={};
                let labelVi= type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn= type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;
                object.label =language ===LANGUAGES.VI ? labelVi : labelEn;
                object.value=item.id;
                result.push(object);
            })
        }
        return result;
    }

    //compare props_past vs props_present
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect=this.buildDataInputSelect(this.props.allDoctors, 'USERS');
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

        if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
            let{resPrice, resPayment, resProvince}= this.props.allRequiredDoctorInfor;
            
            let dataSelectPrice=this.buildDataInputSelect(resPrice);
            let dataSelectPayment=this.buildDataInputSelect(resPayment);
            let dataSelectProvince=this.buildDataInputSelect(resProvince);

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
    }

    //default react-select
    handleEditorChange=({ html, text })=> {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    //save infor doctor
    handleSaveContentMarkdown=()=>{
        //tranmistion data
        let {hasOldData}=this.state;

        this.props.saveDetailDoctors({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData===true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }

    //onchange select option doctor
    handleChangeSelect = async(selectedDoctor) => {
        this.setState({ selectedDoctor });

        let res= await getDetailInforDoctor(selectedDoctor.value)
        if(res && res.data.errCode===0 && res.data.data.Markdown){
            let markdown=res.data.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false

            })
        }        
    };

    //onchange description doctor
    handleOnchangeDesc=(e)=>{
        this.setState({
            description: e.target.value,
        })
    }


    render() {
        let {hasOldData}=this.state;

        return ( 
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">TẠO THÔNG TIN Doctors</div>

                <div className="more-infor d-flex" style={{margin: '0 5px'}}>
                    <div className="content-left form-group col-3">
                        <label htmlFor="">Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>

                    <div className="content-right col-9">
                        <label>Thông tin giới thiệu</label>
                        <textarea className="form-control"
                            onChange={(e)=> this.handleOnchangeDesc(e)}
                            value={this.state.description}
                        >
                            Hoanglele
                        </textarea>
                    </div>
                </div>

                <div className="more-infor-extra row mx-1">
                    <div className="col-1 form-group">
                        <label>Chọn giá</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder={'Chọn giá'}
                        />
                    </div>

                    <div className="col-2 form-group">
                        <label>Chọn Phương thức</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder={'Chọn Phương thức'}
                        />
                    </div>

                    <div className="col-2 form-group">
                        <label>Chọn tỉnh thành</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placeholder={'Chọn Tỉnh thành'}
                        />
                    </div>

                    <div className="col-3 form-group">
                        <label>Tên phòng khám</label>
                        <input type="text" className="form-control" />
                    </div>

                    <div className="col-4 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input type="text" className="form-control" />
                    </div>

                    <div className="col-12 form-group">
                        <label>Note</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>

                <div className="manage-doctor-editor" style={{margin: '0 20px'}}>
                    <MdEditor 
                        style={{ height: '200px'}} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} 
                    />
                </div>

                <div className="btn-save-infor" style={{margin: '0 20px'}}>
                    <button 
                        onClick={()=> this.handleSaveContentMarkdown()}
                        className={hasOldData===true ? "btn btn-warning my-3" : "btn btn-success my-3"  } 
                    >
                        {hasOldData===true ? "Lưu thông tin" : "Tạo thông tin "  } 
                    </button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};


const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: ()=> dispatch(actions.fetchAllDoctors()),
        saveDetailDoctors: (data)=> dispatch(actions.saveDetailDr(data)),
        getAllRequiredDoctorInfor: ()=> dispatch(actions.getRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
