// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

//UTILS
// Headers
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};
// set body
const getBodyRequest = objToSend => {
    return JSON.stringify(objToSend);
    // json ready to Go Internet - exemple:
    // {"name":"Luis Febro","email":"mr.febro@gmail.com","password":"12345678910"}
}
//END UTILS

// Update/Add Array-like data from user
export const updateUser = async (dispatch, objToSend, _idUser) => {
    const body = getBodyRequest(objToSend);
    try {
        const res = await axios.put(`api/users/lists/${_idUser}`, body, config);
        console.log("updateUser", res);
        dispatch({ type: 'USER_UPDATE', payload: res.data });
    } catch(e) {
        console.log("updateUserError", e);
        console.log("updateUserError2", e.response);
        console.log(e);
    }
};