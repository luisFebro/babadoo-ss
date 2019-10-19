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

// Add/Change a field of a user in the database
export const changeFieldUser = async (dispatch, objToSend, _idUser) => {
    const body = getBodyRequest(objToSend);
    try {
        const res = await axios.put(`api/users/lists/change-field/${_idUser}`, body, config);
        dispatch({ type: 'USER_CURRENT_UPDATED', payload: res.data });
    } catch(e) {
        console.log("changeFieldUserERROR: " + e);
    }
};

// Add An obj inside an Array-like data from user
export const addFieldUser = async (dispatch, objToSend, _idUser) => {
    const body = getBodyRequest(objToSend);
    try {
        const res = await axios.post(`api/users/lists/add-field-array/${_idUser}`, body, config);
        console.log("USER_CURRENT_UPDATED from addFieldUser", res.data);
        dispatch({ type: 'USER_CURRENT_UPDATED', payload: res.data });
    } catch(e) {
        console.log("addFieldUserERROR: " + e);
    }
};

// Delete An obj inside an Array-like data from user
export const deleteFieldUser = async (dispatch, objToSend, _idUser) => {
    const body = getBodyRequest(objToSend);
    try {
        const res = await axios.put(`api/users/lists/delete-field-array/${_idUser}`, body, config);
        dispatch({ type: 'USER_CURRENT_UPDATED', payload: res.data });
        console.log("field deleted successfully!");
    } catch(e) {
        console.log("deleteFieldUserERROR: " + e);
    }
};