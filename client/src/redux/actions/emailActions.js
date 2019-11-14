// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
import axios from 'axios';
import { configTypeJson } from '../../utils/server/configTypeJson';
import { getBodyRequest } from '../../utils/server/getBodyRequest';
import { setSuccessOn, setErrorOn } from './globalActions';

export const sendWelcomeEmail = async (dispatch, bodyEmail) => {
    try {
        const res = await axios.post('/api/email/client/welcome-and-confirm', bodyEmail, configTypeJson)
        setSuccessOn(dispatch, res.data.msg);
    } catch(e) {
        // statements
        setErrorOn(dispatch, e);
    }
}

export const sendBuyRequestEmail = async (dispatch, bodyEmail) => {
    try {
        const res = await axios.post('/api/email/admin/order-request', bodyEmail, configTypeJson)
        setSuccessOn(dispatch, res.data.msg);
    } catch(e) {
        // statements
        setErrorOn(dispatch, e);
    }
}