import axios from 'axios';
import { setErrorOn } from './globalActions';
import { showSnackbarBlack } from './snackbarActions';
// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
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
export const getUpdatedAdmin = async (dispatch) => {
    try {
        // setLoadingOn(dispatch);
        const res = await axios.get('/api/admin/coupons', config);
        console.log("==ADMIN DATA UPDATED==")
        console.log("==ADMIN DATA UPDATED== DATA ", res.data)
        dispatch({
            type: 'PROMOTION_UPDATED',
            payload: res.data
        })
        // setLoadingOff(dispatch);
    } catch(e) {
        setErrorOn(dispatch, "Algo deu errado ao carregar a página. Detalhes:" + e);
    }
}

// Add/Change a admin's field  in the database
export const changeFieldAdmin = async (dispatch, objToSend, _idUser) => {
    _idUser = "5db4301ed39a4e12546277a8";
    const body = getBodyRequest(objToSend);
    try {
        const res = await axios.put(`/api/admin/coupons/${_idUser}`, body, config);
        dispatch({ type: 'PROMOTION_STATUS', payload: res.data });
        getUpdatedAdmin(dispatch, _idUser);
        showSnackbarBlack(dispatch, "Alterado com sucesso!");
    } catch(e) {
        showSnackbarBlack(dispatch, "Um Erro aconteceu. Tente novamente.")
        console.log("changeFieldAdminERROR: " + e);
    }
};