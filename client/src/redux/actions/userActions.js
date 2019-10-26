// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import { getAllProducts } from './productActions';
import { setLoadingOn, setLoadingOff, setErrorOn } from './globalActions';
import { logout } from './authActions';
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

// UPDATED DATA
export const getUpdatedUsers = async (dispatch) => {
    try {
        // setLoadingOn(dispatch);
        const res = await axios.get('/api/users/list', config);
        console.log("==ALL USERS UPDATED==")
        dispatch({
            type: 'ALL_USERS_UPDATE',
            payload: res.data
        })
        // setLoadingOff(dispatch);
    } catch(e) {
        setErrorOn(dispatch, "Algo deu errado ao carregar a página. Detalhes:" + e);
    }
}

// update user for a real-time database fetching
export const updateCurrentUser = async (dispatch, _userId) => {
    const res = await axios.get(`/api/users/${_userId}`, config);
    console.log("===USER UPDATED===");
    dispatch({
        type: 'USER_CURRENT_UPDATED',
        payload: res.data
    })
}
// END UPDATED DATA

export const deleteUser = async (dispatch, _idUser) => {
    const res = await axios.delete(`/api/users/${_idUser}`, config);
    dispatch({ type: 'USER_DELETED', payload: _idUser });
}


// HANDLING A USER FIELDS
// Send a notification to admin or client
export const sendNotification = async (dispatch, objToSend, _idClient) => {
    // if the sender is not the admin, then get his/her id and send to it
    // if admin, then get the current_idClient and send to it
    if(objToSend.messageList.sender !== 'Loja Babadoo') {
        _idClient = "5db4301ed39a4e12546277a8";
    }

    const body = getBodyRequest(objToSend);
    try {
        const res = await axios.put(`api/users/lists/change-field/notifications/${_idClient}`, body, config);
        console.log("res from user Action", res);
        getUpdatedUsers(dispatch);
    } catch(e) {
        console.log("changeFieldUserERROR: " + e);
    }
};

// Add/Change a field of a user in the database
export const changeFieldUser = async (dispatch, objToSend, _idUser) => {
    const body = getBodyRequest(objToSend);
    try {
        const res = await axios.put(`api/users/lists/change-field/${_idUser}`, body, config);
        dispatch({ type: 'USER_CURRENT_UPDATED', payload: res.data });
        updateCurrentUser(dispatch, _idUser);
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
        updateCurrentUser(dispatch, _idUser);
    } catch(e) {
        console.log("addFieldUserERROR: " + e);
    }
};

// Delete An obj inside an Array-like data from user
export const deleteFieldUser = async (dispatch, objToSend, _idUser) => {
    console.log("deleteFieldUser objToSend", objToSend);
    console.log("deleteFieldUser _idUser", _idUser);
    const body = getBodyRequest(objToSend);
    try {
        // Making the logout of the user firstly to make sure the system will not crash with a remaining activate token left by the deleted user
        // Warning: Do not delete users directly from database without logout
        logout(dispatch);
        const res = await axios.put(`api/users/lists/delete-field-array/${_idUser}`, body, config);
        dispatch({ type: 'USER_CURRENT_UPDATED', payload: res.data });
        console.log("===FIELD DELETED===");
        updateCurrentUser(dispatch, _idUser);
        // This updates the products to display the favorites and card infos properly
        getAllProducts(dispatch);
    } catch(e) {
        console.log("ERRORdeleteFieldUser: " + e);
    }
};
// END HANDLING A USER FIELDS