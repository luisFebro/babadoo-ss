// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue


// SHOW MODALS
export const showModalUnderConstruction = dispatch => {
    return dispatch({ type: 'SHOW_MODAL_UNDER_CONSTRUCTION', payload: true });
}
// default
export const showModalDefault = dispatch => {
    return dispatch({ type: 'SHOW_MODAL_DEFAULT', payload: true });
}
// Auth Modals
export const showModalLogin = dispatch => {
    return dispatch({ type: 'SHOW_MODAL_LOGIN', payload: true });
}

export const showModalRegister = dispatch => {
    return dispatch({ type: 'SHOW_MODAL_REGISTER', payload: true });
}
// END SHOW MODALS


// CLOSE MODALS
export const closeModal = dispatch => {
    return dispatch({ type: 'CLOSE_ALL_MODALS' });
}
// END CLOSE MODALS
