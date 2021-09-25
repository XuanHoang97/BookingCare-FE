import actionTypes from './actionTypes';

//don't tranmission data
export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});

//tranmission data
export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});

export const changeLanguageApp = (languageInput) => ({
    type: actionTypes.CHANGE_LANGUAGE,
    language: languageInput
})