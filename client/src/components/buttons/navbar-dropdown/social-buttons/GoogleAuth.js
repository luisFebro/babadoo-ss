import React, { useEffect } from 'react';
import axios from 'axios';
// Redux
import { useStoreDispatch, useStoreState } from 'easy-peasy';
import { showSnackbar } from '../../../../redux/actions/snackbarActions';
import { registerGoogle, loginEmail, registerEmail } from '../../../../redux/actions/authActions';
// End Redux
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
// import parse from 'html-react-parser';

export default function GoogleAuth() {
    // REDUX
    const dispatch = useStoreDispatch();
    const { isUserAuthenticated, userList, userName } = useStoreState(state => ({
        userList: state.userReducer.cases.allUsers,
        userName: state.userReducer.cases.currentUser.name,
    }))
    // END REDUX

    const emailAllRegisteredUsers = userList.map(user => user.email);

    const responseGoogle = response => {
        const userEmail = response.profileObj.email;
        const isEmailAlreadyRegistered = emailAllRegisteredUsers.includes(userEmail);
        // Check if the user is already registed to either log in or Register
        if (isEmailAlreadyRegistered) {
            // Login
            const dataUser = {
                email: userEmail,
                password: process.env.REACT_APP_PASSWORD_AUTH_GOOGLE
            };

            loginEmail(dispatch, dataUser)
            showSnackbar(dispatch, `Quase pronto...`);
            setTimeout(() => showSnackbar(dispatch, `Conectado com sua conta Google`, 'success'), 3000);
        } else {
            // Register
            const newUser = {
                name: response.profileObj.givenName,
                email: userEmail,
                password: process.env.REACT_APP_PASSWORD_AUTH_GOOGLE,
                registeredBy: 'google'
            };
            registerGoogle(dispatch, newUser, response);
            showSnackbar(dispatch, 'Conta Babadoo criada via Google!');
        }
    };

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_SOCIAL_GOOGLE}
            render={renderProps => (
                <button
                    className="btn login-btn"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    style={{ backgroundColor: '#CB4024', border: 'none', margin: 5, display: 'block' }}
                >
                    <img src="img/icons/buttonslogin/google.png" alt="ícone de login do google" className="btn-icon" />
                    <span className="btn-txt">
                        Entrar com <strong>Google</strong>
                    </span>
                </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
}
