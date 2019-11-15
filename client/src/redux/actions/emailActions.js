// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
import axios from 'axios';
import { configTypeJson } from '../../utils/server/configTypeJson';
import { getBodyRequest } from '../../utils/server/getBodyRequest';
import { setErrorOn } from './globalActions';

export const sendWelcomeEmail = async (dispatch, bodyEmail) => {
    try {
        return await axios.post('/api/email/client/welcome-and-confirm', bodyEmail, configTypeJson);
    } catch (err) {
        err.response && setErrorOn(dispatch, err.response.data.msg);
    }
};

export const sendBuyRequestEmail = async (dispatch, bodyEmail) => {
    try {
        return await axios.post('/api/email/admin/order-request', bodyEmail, configTypeJson);
    } catch (err) {
        err.response && setErrorOn(dispatch, err.response.data.msg); // n1
    }
};

//n1 -here err.response makes sure if response is defined before setting Error. This avoids a popup error
// n2 - This next will redirect the page to home after user send message succefully
