// naming structure: action > type > speficification
export const returnErrors = (msg, status, id = null) => {
  return {
    type: 'GET_ERRORS',
    payload: { msg, status, id }
  };
};

export const clearErrors = (dispatch) => {
    dispatch({ type: 'CLEAR_ERRORS' });
};