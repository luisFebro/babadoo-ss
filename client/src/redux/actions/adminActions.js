import axios from 'axios';
import { setErrorOn } from './globalActions';
import { showSnackbarBlack } from './snackbarActions';
import { configTypeJson } from '../../utils/server/configTypeJson';
import { getBodyRequest } from '../../utils/server/getBodyRequest';
// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue


export const readAdmin = async dispatch => {
    try {
        // setLoadingOn(dispatch);
        const res = await axios.get('/api/admin', configTypeJson);
        console.log('==ADMIN DATA UPDATED==');
        dispatch({
            type: 'READ_ADMIN',
            payload: res.data
        });
        // setLoadingOff(dispatch);
    } catch (err) {
        setErrorOn(dispatch, err.response.data.msg);
    }
}

export const updateBusinessInfo = async (dispatch, objToSend, _idUser) => {
    console.log("objToSend admin", objToSend)
    const body = getBodyRequest(objToSend);
    try {
        const res = await axios.put(`/api/admin/business-info/update`, body, configTypeJson);
        dispatch({ type: 'UPDATE_BIZ_INFO', payload: res.data });
        showSnackbarBlack(dispatch, 'Alterado com sucesso!');
    } catch (err) {
        setErrorOn(dispatch, err.response.data.msg);
    }
};
