export const showSuccessSnackbar = (dispatch, msg) => {
    dispatch({ type: 'SHOW_SNACKBAR_SUCCESS', payload: msg });
}

export const closeSuccessSnackbar = dispatch => {
    dispatch({ type: 'CLOSE_SNACKBAR_SUCCESS' });
}