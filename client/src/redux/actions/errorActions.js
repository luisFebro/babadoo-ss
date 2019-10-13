// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
export const checkForServerError = (serverStatus) => {
    // Check if html code error is 500 - Internal Server Error
    if(serverStatus === 500) {
        return true;
    }
    return false;
}

export const returnErrors = (msg, status, id = null) => {
  return {
    type: 'GET_ERRORS',
    payload: { msg, status, id }
  };
};

export const clearErrors = (dispatch) => {
    dispatch({ type: 'CLEAR_ERRORS' });
};