import axios from 'axios';
//login
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('http://localhost:8082/api/login', { email: userEmail, password: userPassword });
}

//display all users
const getAllUsers = (inputId) => {
    return axios.get(`http://localhost:8082/api/get-all-users?id=${inputId}`)
}

// create new user
const createNewUserService = (data) => {
    return axios.post(`http://localhost:8082/api/create-new-user`, data)
}

//delete user
const deleteUserService = (userId) => {
    return axios.delete(`http://localhost:8082/api/delete-user`, {
        data: {
            id: userId
        }
    })
}

//edit user
const editUserService = (inputData) => {
    return axios.put(`http://localhost:8082/api/edit-user`, inputData)
}

//getAllCode
const getAllCodeService = (inputType) => {
    return axios.get(`http://localhost:8082/api/allcode?type=${inputType}`)
}

//get doctor
const getTopDoctorHomeService = (limit) => {
    return axios.get(`http://localhost:8082/api/top-doctor-home?limit=${limit}`)
}

//load doctor 
const getAllDoctors = (limit) => {
    return axios.get(`http://localhost:8082/api/get-all-doctors`)
}

//add description doctor
const saveDetailDoctorService = (data) => {
    return axios.post(`http://localhost:8082/api/save-infor-doctors`, data)
}

//detail doctor
const getDetailInforDoctor = (inputId) => {
    return axios.get(`http://localhost:8082/api/get-detail-doctor-by-id?id=${inputId}`)
}

//create schedule time doctor
const saveBulkScheduleDoctor = (data) => {
    return axios.post(`http://localhost:8082/api/bulk-create-schedule`, data)
}

//load Schedule doctor by date
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`http://localhost:8082/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

//het extra infor doctor
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`http://localhost:8082/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}

// profile doctor
const getProfileDoctorById = (doctorId) => {
    return axios.get(`http://localhost:8082/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

//booking appointment
const postPatientBookAppointment = (data) => {
    return axios.post(`http://localhost:8082/api/patient-book-appointment`, data)
}

//verify email
const postVerifyBookAppointment = (data) => {
    return axios.post(`http://localhost:8082/api/verify-book-appointment`, data)
}

//create specialty
const createNewSpecialty = (data) => {
    return axios.post(`http://localhost:8082/api/create-new-specialty`, data)
}

//get specialty
const getAllSpecialty = () => {
    return axios.get(`http://localhost:8082/api/get-specialty`)
}

//detail specialty
const getAllDetailSpecialty = (data) => {
    return axios.get(`http://localhost:8082/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}



export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getAllDetailSpecialty
};