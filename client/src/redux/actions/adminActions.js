import axios from 'axios';
import { setErrorOn } from './globalActions';
import { showSnackbar } from './snackbarActions';
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

export const updateBusinessInfo = async (dispatch, objToUpdate) => {
    try {
        const body = getBodyRequest(objToUpdate);
        const res = await axios.put(`/api/admin/business-info/update`, body, configTypeJson);
        dispatch({ type: 'UPDATE_BIZ_INFO', payload: objToUpdate });
    } catch (err) {
        setErrorOn(dispatch, err.response.data.msg);
    }
};
