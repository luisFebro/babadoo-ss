export const showSuccessSnackbar = (dispatch, msg) => {
    dispatch({ type: 'SHOW_SNACKBAR_BLACK', payload: msg });
}

export const closeSuccessSnackbar = dispatch => {
    dispatch({ type: 'CLOSE_SNACKBAR_BLACK' });
}