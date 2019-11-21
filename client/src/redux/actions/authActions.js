import axios from 'axios';
import { getAuthUser } from './userActions';
import { setErrorOn, setErrorOff } from './globalActions';
import { showSnackbar } from './snackbarActions';
import { getBodyRequest } from '../../utils/server/getBodyRequest';
import { configTypeJson } from '../../utils/server/configTypeJson';
// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
// import { postDataWithJsonObj } from '../../utils/promises/postDataWithJsonObj.js'

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // dispatch({ type: 'USER_LOADING' });
    console.log('==USER LOADING==');
    const tokenConf = tokenConfig(getState);
    console.log("tokenConf", tokenConf);
    axios.get('/api/auth/user', tokenConf)
    .then(res => {
        console.log('RESPONSE LAODER USER', res.data);
       // from user reducer
        dispatch({ type: 'AUTHENTICATE_USER' });
        dispatch({ type: 'USER_CURRENT_UPDATED', payload: res.data.profile });
        // getAuthUser(dispatch, res.data.profile);
    })
    .catch(err => {
        err.response && setErrorOn(dispatch, err.response.data.msg);
        // dispatch({
        //   type: 'AUTH_ERROR'
        // });
    });
};

// login Email
// loginEMail with Async/Await
export const loginEmail = objToSend => async (dispatch, isSocialOn = false) => {
    // Request body
    const body = getBodyRequest(objToSend);

    try {
        const res = await axios.post('/api/auth/login', body, configTypeJson);
        if (isSocialOn) {
            if (isSocialOn === ('google' || 'facebook')) {
                return;
            }
        } else {
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            });
            console.log('==Login: Updating current user==');
            getAuthUser(dispatch, res.data.authUserId);
        }
    } catch (err) {
        setErrorOn(dispatch, err.response.data.msg);
        dispatch({
            type: 'LOGIN_FAIL'
        });
    }
};

// Register User
// Register with Default Promises Handling
// objToSend: { name, email, password }
export const registerEmail = objToSend => (dispatch, isSocialOn = null) => {
    // Request body
    const body = getBodyRequest(objToSend);

    axios
        .post('/api/auth/register', body, configTypeJson)
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
                console.log('==Register: Updating current user==');
                getAuthUser(dispatch, res.data.authUserId);
            }
        })
        .catch(err => {
            setErrorOn(dispatch, err.response.data.msg);
            dispatch({
                type: 'REGISTER_FAIL'
            });
        });
};

// Register Google
export const registerGoogle = (dispatch, body, resGoogle) => {
    axios.post('/api/auth/register', body, configTypeJson)
    .then(res => {
        dispatch({ type: 'LOGIN_GOOGLE', payload: res.data.token })
        dispatch({ type: 'USER_GOOGLE_DATA', payload: resGoogle })
        getAuthUser(dispatch, res.data.authUserId);
    })
    .catch(err => {
        err.response && setErrorOn(dispatch, err.response.data.msg);
    })
};

// // Login/Register Google
// export const authenticateFacebook = dispatch => {};

// Logout
export const logout = dispatch => {
    dispatch({ type: 'LOGOUT_SUCCESS' });
    setErrorOff(dispatch);
    setTimeout(() => showSnackbar(dispatch, 'Sua sessão foi finalizada com sucesso.', 3000), 2000);
};

// Setup config/headers and token
export const tokenConfig = getState => {
    //getState method accesses redux store outside of a react component
    const token = getState().authReducer.cases.token;
    console.log('token from tokenConfig', token);
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
