// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue

// Find an object according to an id
export const findAnItem = (dispatch, allItemsList, _id, attachedObj) => {
    const item = allItemsList.find(item => item._id === _id);
    // Putting together the current object with additional obj to change dynamically data from component
    const finalItem = Object.assign({}, item, attachedObj);
    console.log("item from globalActions.js", finalItem);
    dispatch({ type: 'CURRENT_ITEM_FOUND', payload: finalItem });
    return finalItem;
}

// SET LOADING
// On: loading indicator displaying for miliseconds as long as the data is being fetched
// Off: no loading indicator displaying
export const setLoadingOn = (dispatch) => {
    return dispatch({ type: 'SHOW_LOADING' })
}
export const setLoadingOff = (dispatch) => {
    return dispatch({ type: 'CLEAR_LOADING' })
}
// END SET LOADING

// Important: do not forget to clear both success and error methods off since they will after other unrelated parts of the project
// SUCCESS
export const setSuccessOn = (dispatch, successMsg) => {
    return dispatch({ type: 'SHOW_SUCCESS', payload: successMsg})
}
export const setSuccessOff = dispatch => {
    return dispatch({ type: 'CLEAR_SUCCESS' })
}
// END SUCCESS


// ERROR
export const setErrorOn = (dispatch, errorMsg) => {
    return dispatch({ type: 'SHOW_ERROR', payload: errorMsg})
}
export const setErrorOff = dispatch => {
    return dispatch({ type: 'CLEAR_ERROR' })
}
// END ERROR

