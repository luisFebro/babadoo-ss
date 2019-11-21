// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
import axios from 'axios';
import { tokenConfig } from './authActions';
import { getAllProducts } from './productActions';
import { setLoadingOn, setLoadingOff, setErrorOn } from './globalActions';
import { showSnackbar } from './snackbarActions';
import { logout } from './authActions';
import { getBodyRequest } from '../../utils/server/getBodyRequest';
import { configTypeJson } from '../../utils/server/configTypeJson';

// UPDATED DATA
export const getUpdatedUsers = async dispatch => {
    try {
        // setLoadingOn(dispatch);
        const res = await axios.get('/api/user/list/all', configTypeJson);
        console.log('==ALL USERS UPDATED==');
        dispatch({
            type: 'ALL_USERS_UPDATE',
            payload: res.data
        });
        // setLoadingOff(dispatch);
    } catch (e) {
        setErrorOn(dispatch, 'Algo deu errado ao carregar a página. Detalhes:' + e);
    }
};

// update user for a real-time database fetching
// This will be replaced by getAuthUser since we use "new: true" to get a real-time response from DB
export const updateCurrentUser = async (dispatch, _userId) => {
    const res = await axios.get(`/api/user/${_userId}`, configTypeJson);
    console.log('===CURRENT USER UPDATED===');
    dispatch({
        type: 'CURRENT_USER',
        payload: res.data
    });
};

// the same as updateCurrentUser which will be replaced
export const getAuthUser = async (dispatch, _userId) => {
    const res = await axios.get(`/api/user/${_userId}`, configTypeJson);
    console.log('===AUTH USER LOADED===');
    dispatch({
        type: 'CURRENT_USER',
        payload: res.data
    });
};
// END UPDATED DATA

export const deleteUser = async (dispatch, _idUser) => {
    // Making the logout of the user firstly to make sure the system will not crash with a remaining activate token left by the deleted user
    // Warning: Do not delete users directly from database without logout
    // This does not work!!!
    // logout(dispatch);
    const res = await axios.delete(`/api/user/${_idUser}`, configTypeJson);
    dispatch({ type: 'USER_DELETED', payload: _idUser });
};

// HANDLING A USER FIELDS
// Send a notification to admin or client
export const sendNotification = async (dispatch, objToSend, _idClient) => {
    // if the sender is not the admin, then get his/her id and send to it
    // if admin, then get the current_idClient and send to it
    if (objToSend.messageList.sender !== 'Loja Babadoo') {
        _idClient = '5db4301ed39a4e12546277a8';
    }

    const body = getBodyRequest(objToSend);
    try {
        const res = await axios.put(`/api/user/lists/change-field/notifications/${_idClient}`, body, configTypeJson);
        console.log('res from user Action', res);
        getUpdatedUsers(dispatch);
        // change name form 'admin'to Loja Babadoo (this is how gonna be displayed to the user)
        if (res.data.name === 'admin') res.data.name = 'Loja Babadoo';
        showSnackbar(dispatch, `Mensagem enviada com sucesso para ${res.data.name}!`, 'success');
    } catch (e) {
        showSnackbar(dispatch, 'Ocorreu um erro ao enviar sua notificação. Tente mais tarde!', 'error');
        console.log('changeFieldUserERROR: ' + e);
    }
};

// Add/Change a field of a user in the database
export const changeFieldUser = async (dispatch, objToSend, _idUser) => {
    const body = getBodyRequest(objToSend);
    try {
        const res = await axios.put(`/api/user/lists/change-field/${_idUser}`, body, configTypeJson);
        dispatch({ type: 'CURRENT_USER', payload: res.data });
        updateCurrentUser(dispatch, _idUser);
    } catch (e) {
        console.log('changeFieldUserERROR: ' + e);
    }
};

// Add An obj inside an Array-like data from user
export const addFieldUser = async (dispatch, objToSend, _idUser) => {
    const body = getBodyRequest(objToSend);
    try {
        const res = await axios.post(`/api/user/lists/add-field-array/${_idUser}`, body, configTypeJson);
        console.log('CURRENT_USER from addFieldUser', res.data);
        dispatch({ type: 'CURRENT_USER', payload: res.data });
        updateCurrentUser(dispatch, _idUser);
    } catch (e) {
        console.log('addFieldUserERROR: ' + e);
    }
};

// Delete An obj inside an Array-like data from user
export const deleteFieldUser = async (dispatch, objToSend, _idUser) => {
    const body = getBodyRequest(objToSend);
    try {
        const res = await axios.put(`/api/user/lists/delete-field-array/${_idUser}`, body, configTypeJson);
        dispatch({ type: 'CURRENT_USER', payload: res.data });
        console.log('===FIELD DELETED===');
        updateCurrentUser(dispatch, _idUser);
        // This updates the products to display the favorites and card infos properly
        getAllProducts(dispatch);
    } catch (e) {
        console.log('ERRORdeleteFieldUser: ' + e);
    }
};
// END HANDLING A USER FIELDS
