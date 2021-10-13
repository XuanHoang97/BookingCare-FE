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
            selectedOption: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
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
            if(type==='USERS'){
                inputData.map((item,index)=>{
                    let object={};
                    let labelVi=`${item.lastName} ${item.firstName}`;
                    let labelEn=`${item.firstName} ${item.lastName}`;
                    object.label =language ===LANGUAGES.VI ? labelVi : labelEn;
                    object.value=item.id;
                    result.push(object);
                })
            }

            if(type==='PRICE'){
                inputData.map((item,index)=>{
                    let object={};
                    let labelVi=`${item.valueVi} VND`;
                    let labelEn=`${item.valueEn} USD`;
                    object.label =language ===LANGUAGES.VI ? labelVi : labelEn;
                    object.value=item.keyMap;
                    result.push(object);
                })
            }

            if(type==='PAYMENT' || type==='PROVINCE'){
                inputData.map((item,index)=>{
                    let object={};
                    let labelVi=`${item.valueVi}`;
                    let labelEn=`${item.valueEn}`;
                    object.label =language ===LANGUAGES.VI ? labelVi : labelEn;
                    object.value=item.keyMap;
                    result.push(object);
                })
            }

            if(type==='SPECIALTY'){
                inputData.map((item,index)=>{
                    let object={};
                   
                    object.label =item.name;
                    object.value=item.id;
                    result.push(object);
                })
            }
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

       
        if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
            let{resPrice, resPayment, resProvince, resSpecialty}= this.props.allRequiredDoctorInfor;
            
            let dataSelectPrice=this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment=this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince=this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty=this.buildDataInputSelect(resSpecialty, 'SPECIALTY');

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
            })
        }

        if(prevProps.language !== this.props.language){
            let{resPrice, resPayment, resProvince}= this.props.allRequiredDoctorInfor;
            
            let dataSelect=this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let dataSelectPrice=this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment=this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince=this.buildDataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listDoctors: dataSelect,
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
        //tranmistion data(compare create vs edit infor)
        let {hasOldData}=this.state;

        this.props.saveDetailDoctors({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,

            clinicId: this.state.selectedClinic ? this.state.selectedClinic : '',
            specialtyId: this.state.selectedSpecialty.value,

            //exchange create vs edit
            action: hasOldData===true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }

    //onchange select
    handleChangeSelect = async(selectedOption) => {
        this.setState({ selectedOption });

        let res= await getDetailInforDoctor(selectedOption.value)
        if(res && res.data.errCode===0 && res.data.data.Markdown){
            let markdown=res.data.data.Markdown;
            let {listPayment, listPrice, listProvince, listSpecialty}=this.state;

            //infor clinic
            let addressClinic= '', nameClinic='', notes='', 
            paymentId= '', priceId ='', provinceId= '', specialtyId = '',
            selectedPayment='',
            selectedPrice='', selectedProvince='', selectedSpecialty = '' ;

            if(res.data.data.Doctor_Infor){
                addressClinic=res.data.data.Doctor_Infor.addressClinic;
                nameClinic=res.data.data.Doctor_Infor.nameClinic;
                notes=res.data.data.Doctor_Infor.notes;

                paymentId=res.data.data.Doctor_Infor.paymentId;
                priceId=res.data.data.Doctor_Infor.priceId;
                provinceId=res.data.data.Doctor_Infor.provinceId;
                specialtyId=res.data.data.Doctor_Infor.specialtyId;

                selectedPayment= listPayment.find(item=> {
                    return item && item.value===paymentId
                })

                selectedPrice= listPrice.find(item=> {
                    return item && item.value===priceId
                })

                selectedProvince= listProvince.find(item=> {
                    return item && item.value===provinceId
                })

                selectedSpecialty=listSpecialty.find(item=> {
                    return item && item.value===specialtyId
                });


            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: notes,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
            })
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',

            })
        }        
    };

    //onchange doctor infor: price, payment, province, specialty, clinic
    handleChangeSelectDoctorInfor=(selectedOption, name)=>{
        let stateName= name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName]=selectedOption;

        this.setState({
            ...stateCopy,
        })
    }

    //onchange: desc, name, addr clinic...
    handleOnchangeText=(e, id)=>{
        let stateCopy = {...this.state};
        stateCopy[id] = e.target.value;

        this.setState({
            ...stateCopy,
        })
    }


    render() {
        let {hasOldData, listSpecialty}=this.state;
        console.log('check state: ', this.state)

        return ( 
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">TẠO THÔNG TIN Doctors</div>

                <div className="more-infor d-flex" style={{margin: '0 5px'}}>
                    <div className="content-left form-group col-4">
                        <label htmlFor="">Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={'Chọn bác sĩ'}
                            name={"selectedOption"}
                        />
                    </div>

                    <div className="content-right col-8">
                        <label>Thông tin giới thiệu</label>
                        <textarea className="form-control"
                            onChange={(e)=> this.handleOnchangeText(e, 'description')}
                            value={this.state.description}
                        >
                            Hoanglele
                        </textarea>
                    </div>
                </div>

                <div className="more-infor-extra row mx-1">
                    <div className="col-2 form-group">
                        <label>Giá khám bệnh</label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={'Chọn giá'}
                            name="selectedPrice"
                        />
                    </div>

                    <div className="col-2 form-group">
                        <label>Chọn Phương thức</label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={'Chọn Phương thức'}
                            name="selectedPayment"
                        />
                    </div>

                    <div className="col-2 form-group">
                        <label>Chọn tỉnh thành</label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={'Chọn Tỉnh thành'}
                            name="selectedProvince"
                        />
                    </div>

                    <div className="col-2 form-group">
                        <label>Tên phòng khám</label>
                        <input type="text" className="form-control" 
                            onChange= {(e)=> this.handleOnchangeText(e, 'nameClinic')} 
                            value= {this.state.nameClinic}
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input type="text" className="form-control" 
                            onChange= {(e)=> this.handleOnchangeText(e, 'addressClinic')} 
                            value= {this.state.addressClinic}
                        />
                    </div>


                    <div className="col-2 form-group">
                        <label>Chọn chuyên khoa</label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder={'Chọn chuyên khoa'}
                            name={"selectedSpecialty"}
                        />
                    </div>

                    <div className="col-2 form-group">
                        <label>Chọn phòng khám</label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={'Chọn phòng khám'}
                            name={"selectedClinic"}
                        />
                    </div>

                    <div className="col-8 form-group">
                        <label>Note</label>
                        <input type="text" className="form-control" 
                            onChange= {(e)=> this.handleOnchangeText(e, 'note')} 
                            value= {this.state.note}
                        />
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
