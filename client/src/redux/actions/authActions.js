import axios from 'axios';
import { returnErrors } from './errorActions';
// import { postDataWithJsonObj } from '../../utils/promises/postDataWithJsonObj.js'

// naming structure:
// action > type > specification e.g showMenuDark / SHOW_MENU_DARK

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: 'USER_LOADING' });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: 'USER_LOADED',
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      // dispatch({
      //   type: 'AUTH_ERROR'
      // });
    });
};

// login Email
// postDataWithJsonObj returns a promise
export const loginEmail = ({ email, password }) => (dispatch, isSocialOn = false) => {
    // Headers
     const config = {
         headers: {
             'Content-Type': 'application/json'
         }
     };

     // Request body
     const body = JSON.stringify({ email, password });
     // json ready to Go Internet - exemple:
     // {"name":"Luis Febro","email":"mr.febro@gmail.com","password":"12345678910"}

     axios
        .post('/api/auth', body, config)
        .then(res => {
                if(isSocialOn) {
                    if(isSocialOn === ('google' || 'facebook')) {
                        return;
                    }
                } else {
                    return dispatch({
                      type: 'LOGIN_SUCCESS',
                      payload: res.data
                    })
                }
            }
        )
        .catch(err => {
          dispatch(
            returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
          );
          dispatch({
            type: 'LOGIN_FAIL'
          });
        });
};

// Register User
// postDataWithJsonObj returns a promise
export const registerEmail = ({ name, email, password }) => (dispatch, isSocialOn = null) => {
   // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ name, email, password });
    // json ready to Go Internet - exemple:
    // {"name":"Luis Febro","email":"mr.febro@gmail.com","password":"12345678910"}

    axios
        .post('/api/users', body, config)
        .then(res => {
            if(isSocialOn) {
                if(isSocialOn === ('google' || 'facebook')) {
                    return;
                }
            } else {
                return dispatch({
                    type: 'REGISTER_SUCCESS',
                    payload: res.data
                })
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




