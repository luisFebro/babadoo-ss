// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue

// On: loading indicator displaying for miliseconds as long as the data is being fetched
// Off: no loading indicator displaying
export const setLoadingOn = (dispatch) => {
    return dispatch({ type: 'SHOW_LOADING' })
}
export const setLoadingOff = (dispatch) => {
    return dispatch({ type: 'CLOSE_LOADING' })
}

export const setErrorOn = (dispatch, msgError) => {
    return dispatch({ type: 'SHOW_ERROR', payload: msgError})
}
export const setErrorOff = (dispatch, msgError) => {
    return dispatch({ type: 'CLEAR_ERROR' })
}
