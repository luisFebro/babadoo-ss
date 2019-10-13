// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue


export const showModalUnderConstruction = dispatch => {
    return dispatch({ type: 'SHOW_MODAL_UNDER_CONSTRUCTION', payload: true });
}

// Auth Modals
export const toggleModalLogin = (dispatch, isModalLoginOpen) => {
    return dispatch({type: "TOGGLE_MODAL_LOGIN", payload: isModalLoginOpen});
}

export const toggleModalRegister = (dispatch, isModalRegisterOpen) => {
    return dispatch({type: "TOGGLE_MODAL_REGISTER", payload: isModalRegisterOpen});
}
// End Auth Modals