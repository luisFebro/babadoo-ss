// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
import axios from 'axios';
import { configTypeJson } from '../../utils/server/configTypeJson';
import { getBodyRequest } from '../../utils/server/getBodyRequest';

export const readBizInfo = async dispatch => {
    try {
        const res = await axios.get('/api/business-info', configTypeJson);
        dispatch({ type: 'READ_BIZ_INFO', payload: res.data });
    } catch (e) {
        console.log('readBizInfo ERROR: ' + e);
    }
};
export const updateBizInfo = dispatch => {
    return dispatch({ type: 'CLOSE_LOADING' });
};
