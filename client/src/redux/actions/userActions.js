import axios from 'axios';
import { showSnackbar } from './snackbarActions';
import { configTypeJson } from '../../utils/server/configTypeJson';
// import { tokenConfig } from './authActions';
// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue

// RUD
export const readUser = async (dispatch, _userId) => {
    const res = await axios.get(`/api/user/${_userId}`, configTypeJson);
    console.log('===CURRENT USER LOADED===');
    dispatch({
        type: 'USER_READ',
        payload: res.data
    });
};

export const updateUser = async (dispatch, objToSend, _idUser) => {
    try {
        const res = await axios.put(`/api/user/${_idUser}`, objToSend, configTypeJson);
        dispatch({ type: 'USER_UPDATED', payload: res.data });
        return res;
    } catch (err) {
        return err;
    }
};

export const deleteUser = async (dispatch, _idUser) => { // n1
    try {
        const res = await axios.delete(`/api/user/${_idUser}`, configTypeJson);
        dispatch({ type: 'USER_DELETED', payload: _idUser });
        return res;
    } catch(err) {
        return err.response;
    }
};
// END RUD

export const confirmUserAccount = async (userId) => {
    try {
        return await axios.get(`/api/user/confirm-account/${userId}`, configTypeJson);
    } catch (err) {
        return err.response;
    }
}

// LISTS
export const readUserList = async dispatch => {
    try {
        const res = await axios.get('/api/user/list/all', configTypeJson);
        console.log('==ALL USERS UPDATED==');
        dispatch({ type: 'USER_READ_LIST', payload: res.data });
    } catch (err) {
        return err;
    }
};

// FIELDS
export const addElemArrayUser = async (dispatch, objToSend) => {
    try {
        const { userId, changeField } = objToSend;
        const res = await axios.put(`/api/user/field/array/push/${userId}`, changeField, configTypeJson);
        dispatch({ type: 'USER_READ', payload: res.data.user });
        return res;
    } catch (err) {
        return err;
    }
};

export const removeElemArrayUser = async (dispatch, objToSend) => {
    try {
        const { userId, changeField } = objToSend;
        const res = await axios.put(`/api/user/field/array/pull/${userId}`, changeField, configTypeJson);
        dispatch({ type: 'USER_READ', payload: res.data.user });
        return res;
    } catch (err) {
        return err;
    }
};

// Send a notification to admin or client
// THIS WILL BE UPDATED TO RECEIVE add/removeElemArrayUser
export const sendNotification = async (dispatch, objToSend, _idClient) => {
    // if the sender is not the admin, then get his/her id and send to it
    // if admin, then get the current_idClient and send to it
    if (objToSend.messageList.sender !== 'Loja Babadoo') {
        _idClient = '5db4301ed39a4e12546277a8';
    }

    try {
        const res = await axios.put(`/api/user/lists/change-field/notifications/${_idClient}`, objToSend, configTypeJson);
        console.log('res from user Action', res);
        readUserList(dispatch);
        // change name form 'admin'to Loja Babadoo (this is how gonna be displayed to the user)
        if (res.data.name === 'admin') res.data.name = 'Loja Babadoo';
        showSnackbar(dispatch, `Mensagem enviada com sucesso para ${res.data.name}!`, 'success');
    } catch (e) {
        showSnackbar(dispatch, 'Ocorreu um erro ao enviar sua notificação. Tente mais tarde!', 'error');
        console.log('updateUserERROR: ' + e);
    }
};
// END  FIELDS


/* COMMENTS
n1:   // Making the logout of the user firstly to make sure the system will not crash with a remaining activate token left by the deleted user
    // Warning: Do not delete users directly from database without logout
    // This does not work!!!
    // logout(dispatch);
*/