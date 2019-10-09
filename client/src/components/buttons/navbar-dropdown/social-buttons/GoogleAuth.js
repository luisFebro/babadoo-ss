import React from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { showSnackbarBlack } from '../../../../redux/actions/snackbarActions';
import { login, register } from '../../../../redux/actions/authActions';
// End Redux
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import getEmailAllRegisteredUsers from '../../../../pages/dashboard-admin/getEmailAllRegisteredUsers';

const emailAllUsers = getEmailAllRegisteredUsers();



export default function GoogleAuth() {
    const dispatch = useStoreDispatch();

    const responseGoogle = response => {
        //Register New user DB
        // Check if the user is already registed to log in or Register
        let userEmail = response.profileObj.email;
        if(emailAllUsers.email.includes(response.profileObj.email)) {
            // Login
            const newUser = {
                email: userEmail,
                password: 'google'
            };
            login(newUser)(dispatch);
            showSnackbarBlack(dispatch, 'Login: Olá de Volta!');
        } else {
            // Register
            const newUser = {
                name: response.profileObj.givenName,
                email: userEmail,
                password: 'google'
            };
            register(newUser)(dispatch);
            showSnackbarBlack(dispatch, 'Register: Conta Babadoo criada via Google!');
        }

        //Authenticate User
        dispatch({type: 'LOGIN_GOOGLE', payload: response });
        // showSnackbarBlack(dispatch, 'Seja Bem-Vindo(a)!');
        //

    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_SOCIAL_GOOGLE}
            render={renderProps => (
              <button
                className="btn login-btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{backgroundColor: "#CB4024", border: "none", margin: 5, display: "block" }}
               >
                   <img
                        src="img/icons/buttonslogin/google.png"
                        alt="ícone de login do google"
                        className="btn-icon"
                    />
                   <span className="btn-txt">Entrar com <strong>Google</strong></span>
               </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
}


