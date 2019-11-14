// naming structure:
// action > type > specification e.g showMenuDark / SHOW_MENU_DARK
//BLACK for transition notifications
export const showSnackbarBlack = (dispatch, msg, timeRunning = 4000) => {
    const data = {
        msg,
        timeRunning
    }
    dispatch({ type: 'SHOW_SNACKBAR_BLACK', payload: data });
    // setSuccessOff is add to snackbarBlack component
}

export const closeSnackbarBlack = dispatch => {
    dispatch({ type: 'CLOSE_SNACKBAR_BLACK' });
}

//SUCCESS GREEN for approved actions
export const showSnackbarSuccess = (dispatch, msg) => {
    dispatch({ type: 'SHOW_SNACKBAR_SUCCESS', payload: msg });
}

export const closeSnackbarSuccess = dispatch => {
    dispatch({ type: 'CLOSE_SNACKBAR_SUCCESS' });
}