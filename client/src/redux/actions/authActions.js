import axios from 'axios';
import { returnErrors } from './errorActions';
import { updateCurrentUser } from './userActions';
import { clearErrors } from './errorActions';
import { getBodyRequest } from '../../utils/server/getBodyRequest';
import { configTypeJson } from '../../utils/server/configTypeJson';
// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
// import { postDataWithJsonObj } from '../../utils/promises/postDataWithJsonObj.js'

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: 'USER_LOADING' });

    const getAuthUser = () => {
      console.log("==USER LOADING==");
      return axios.get('/api/auth/user', tokenConfig(getState));
    }

    const getUpdatedUsers = () => {
      return axios.get('/api/users/list', configTypeJson);
    }

    axios.all([getAuthUser(), getUpdatedUsers()])
      .then(axios.spread((auth, products, users) => {
        // Both requests are now complete
        console.log("auth from authActions", auth.data)
        dispatch({
            type: 'USER_LOADED',
            payload: auth.data
        })
        dispatch({
            type: 'USER_CURRENT_UPDATED',
            payload: auth.data
        })
        dispatch({
            type: 'ALL_USERS_UPDATE',
            payload: users.data
        })
      })).catch(err => {
        if(typeof err.response !== 'undefined') {
            dispatch(returnErrors(err.response.data, err.response.status));
        }
            // dispatch({
            //   type: 'AUTH_ERROR'
            // });
        });
}
//This structure does not work at all. gives errors
// export const loadUser = () => (dispatch, getState) => {
//     try {
//         // User loading
//         dispatch({ type: 'USER_LOADING' });
//         console.log("==USER LOADING==");
//         const res = axios.get('/api/auth/user', tokenConfig(getState));
//         dispatch({
//             type: 'USER_LOADED',
//             payload: res.data
//         })
//         dispatch({
//             type: 'USER_CURRENT_UPDATED',
//             payload: res.data
//         })
//     } catch(err) {
//         console.log(err);
//         dispatch(returnErrors(err.response.data, err.response.status));
//     }
// }

// login Email
// loginEMail with Async/Await
export const loginEmail = (objToSend) => async (dispatch, isSocialOn = false) => {
    // Request body
    const body = getBodyRequest(objToSend);

    try {
        const res = await axios.post('/api/auth', body, configTypeJson);
        if (isSocialOn) {
            if (isSocialOn === ('google' || 'facebook')) {
                return;
            }
        } else {
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            });
            console.log("==Login: Updating current user==")
            updateCurrentUser(dispatch, res.data.user.id);
        }
    } catch(err) {
        dispatch(
            returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
        );
        dispatch({
            type: 'LOGIN_FAIL'
        });
    }
};

// Register User
// Register with Default Promises Handling
// objToSend: { name, email, password }
export const registerEmail = (objToSend) => (dispatch, isSocialOn = null) => {
    // Request body
    const body = getBodyRequest(objToSend);

    axios
        .post('/api/users', body, configTypeJson)
        .then(res => {
            if (isSocialOn) {
                if (isSocialOn === ('google' || 'facebook')) {
                    return;
                }
            } else {
                dispatch({
                    type: 'REGISTER_SUCCESS',
                    payload: res.data
                });
                console.log("==Register: Updating current user==")
                updateCurrentUser(dispatch, res.data.user.id);
            }
        })
        .catch(err => {
            console.log(err.response);
            dispatch(
                returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
            );
            dispatch({
                type: 'REGISTER_FAIL'
            });
        });
};




// Login/Register Google
export const authenticateGoogle = dispatch => {

}

// Login/Register Google
export const authenticateFacebook = dispatch => {

}

// Logout
export const logout = dispatch => {
    dispatch({ type: 'LOGOUT_SUCCESS' });
    clearErrors(dispatch);
    setTimeout(() => dispatch({ type: 'SHOW_SNACKBAR_BLACK', payload: "Sua sessão foi finalizada com sucesso." }), 2000);
};

// Setup config/headers and token
export const tokenConfig = getState => {
    //getState method accesses redux store outside of a react component
    const token = getState().authReducer.cases.token;
    console.log("token from tokenConfig", token);
    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};