import React, { useState, useEffect } from 'react';
// Redux
import { useStoreDispatch } from 'easy-peasy';
import { showSnackbar } from '../../../../redux/actions/snackbarActions';
import { loginEmail, registerEmail } from '../../../../redux/actions/authActions';
import getDataObjDiffKeys from '../../../../utils/promises/getDataObjDiffKeys';
import { fetchDataAsyncWithHooks } from '../../../../utils/promises/fetchDataAsyncWithHooks';
// End Redux
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
export default function FacebookAuth() {
    // Getting an Obj with an Array with all emails
    const [data, setData] = useState({});
    const dispatch = useStoreDispatch();
    const emailAllRegisteredUsers = getDataObjDiffKeys(data, ['email']).email;
    // End
    // Getting data from database afte mounting
    useEffect(() => {
        fetchDataAsyncWithHooks('api/users/list', setData);
    }, []);

    const responseFacebook = response => {
        const isSocialOn = 'facebook';
        const userEmail = response.email;
        const isEmailAlreadyRegistered = emailAllRegisteredUsers.includes(userEmail);
        // Check if the user is already registed to either log in or Register
        if (isEmailAlreadyRegistered) {
            // Login
            const newUser = {
                email: userEmail,
                password: process.env.REACT_APP_PASSWORD_AUTH_FACEBOOK
            };

            loginEmail(newUser)(dispatch, isSocialOn);
            showSnackbar(dispatch, `Olá de Volta! (:`);
        } else {
            // Register
            const newUser = {
                name: response.givenName,
                email: userEmail,
                password: process.env.REACT_APP_PASSWORD_AUTH_FACEBOOK
            };

            registerEmail(newUser)(dispatch, isSocialOn);
            showSnackbar(dispatch, 'Conta Babadoo criada via Facebook!');
        }

        //Authenticate User
        showSnackbar(dispatch, 'carregando...');
        // showSnackbar(dispatch, 'Seja Bem-vindo(a)');
        dispatch({ type: 'LOGIN_FACEBOOK', payload: response });
    };

    const componentClicked = () => {};

    return (
        <FacebookLogin
            appId={process.env.REACT_APP_SOCIAL_FACEBOOK}
            autoLoad={false}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            render={renderProps => (
                <button
                    className="btn login-btn"
                    style={{ backgroundColor: '#3B5899', margin: 5, display: 'block' }}
                    onClick={renderProps.onClick}
                >
                    <img
                        src="img/icons/buttonslogin/facebook.png"
                        alt="ícone de login do google"
                        className="btn-icon"
                    />
                    <span className="btn-txt">
                        Entrar com <strong>Facebook</strong>
                    </span>
                </button>
            )}
        />
    );
}
