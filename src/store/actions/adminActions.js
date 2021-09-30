import actionTypes from './actionTypes';
import { getAllCodeService } from "../../services/userService"

//gender
export const fetchGenderStart = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllCodeService('GENDER');
            if (res && res.data.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

//Position
export const fetchPositionStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION');
            if (res && res.data.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error', e)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

//role 
export const fetchRoleStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE');
            if (res && res.data.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error', e)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})