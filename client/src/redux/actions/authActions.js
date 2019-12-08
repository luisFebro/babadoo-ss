import axios from 'axios';
import { getAuthUser } from './userActions';
import { setLoadingProgress } from './globalActions';
import { showSnackbar } from './snackbarActions';
import { configTypeJson } from '../../utils/server/configTypeJson';
// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
// import { postDataWithJsonObj } from '../../utils/promises/postDataWithJsonObj.js'

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // dispatch({ type: 'USER_LOADING' });
    console.log('==USER LOADING==');
    axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => {
       // from user reducer
        dispatch({ type: 'AUTHENTICATE_USER_ONLY' });
        dispatch({ type: 'UPDATE_CURRENT_USER', payload: res.data.profile });
        // getAuthUser(dispatch, res.data.profile);
    })
    .catch(err => {
        return err.response;
    });
};

// login Email
// loginEMail with Async/Await
export const loginEmail = async (dispatch, objToSend) => {
    setLoadingProgress(dispatch, true);
    try {
        const res = await axios.post('/api/auth/login', objToSend, configTypeJson);
        dispatch({ type: 'LOGIN_EMAIL', payload: res.data.token });
        getAuthUser(dispatch, res.data.authUserId);
        setLoadingProgress(dispatch, false);
        return res;
    } catch (err) {
        dispatch({
            type: 'LOGIN_ERROR'
        });
        setLoadingProgress(dispatch, false);
        return err.response;
    }
};

// Register User
// objToSend: { name, email, password, registeredBy = email }
export const registerEmail = async (dispatch, objToSend) => {
    setLoadingProgress(dispatch, true);
    try {
        const res = await axios.post('/api/auth/register', objToSend, configTypeJson);
        dispatch({ type: 'REGISTER_EMAIL', payload: res.data.token });
        getAuthUser(dispatch, res.data.authUserId);
        setLoadingProgress(dispatch, false);
        return res;
    } catch(err) {
        dispatch({
            type: 'REGISTER_ERROR'
        });
        setLoadingProgress(dispatch, false);
        return err.response;
    }
};

// Register Social Networks - note: login is done conditionally in the their auth component
export const registerGoogle = (dispatch, body, resGoogle) => {
    axios.post('/api/auth/register', body, configTypeJson)
    .then(res => {
        dispatch({ type: 'LOGIN_GOOGLE', payload: res.data.token })
        dispatch({ type: 'USER_GOOGLE_DATA', payload: resGoogle })
        getAuthUser(dispatch, res.data.authUserId); // This will get the complementary data from user registered by social network
    })
    .catch(err => {
        return err.response;
    })
};

export const registerFacebook = (dispatch, body, resFacebook) => {
    axios.post('/api/auth/register', body, configTypeJson)
    .then(res => {
        dispatch({ type: 'LOGIN_FACEBOOK', payload: res.data.token })
        dispatch({ type: 'USER_FACEBOOK_DATA', payload: resFacebook })
        getAuthUser(dispatch, res.data.authUserId); // This will get the complementary data from user registered by social network
    })
    .catch(err => {
        return err.response;
    })
};
// Register Social Networks

export const logout = dispatch => {
    dispatch({ type: 'LOGOUT_SUCCESS' });
    dispatch({ type: 'CLEAR_UPDATE_CURRENT_USER' });
    setTimeout(() => showSnackbar(dispatch, 'Sua sessão foi finalizada com sucesso. Volte Sempre!', 4000), 2000);
};

export const changePassword = async (dispatch, bodyPass, userId) => {
    setLoadingProgress(dispatch, true);
    try {
        const res = await axios.post(`/api/auth/change-password?id=${userId}`, bodyPass, configTypeJson);
        setLoadingProgress(dispatch, false);
        return res;
    } catch(err) {
        setLoadingProgress(dispatch, false);
        return err.response;
    }
}


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

    // N1 If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};


/* COMMENTS
n1: eg when user authenticated
{
    headers: {
        Content-type: "application/json"
        x-auth-token: "eyJhbGciOiJIUzI1NiIsInR5..."
    }
}
*/