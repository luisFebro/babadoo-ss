import React, { useState, useEffect } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { showSnackbarBlack } from '../../../../redux/actions/snackbarActions';
import { login, register } from '../../../../redux/actions/authActions';
import getDataObjDiffKeys from '../../../utils/promises/getDataObjDiffKeys';
import { fetchDataAsyncWithHooks } from '../../../utils/promises/fetchDataAsyncWithHooks';
// End Redux
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
export default function FacebookAuth() {
    const [data, setData] = useState({});

    const name = useStoreState(state => state.authReducer.cases.user.name);
    const dispatch = useStoreDispatch();

    // Getting data from database afte mounting
    useEffect(() => { fetchDataAsyncWithHooks('api/users/list', setData) }, []);

    const responseFacebook = response => {
        //Return an Obj with an Array with all emails
        const isSocialOn = 'facebook';
        const emailAllRegisteredUsers = getDataObjDiffKeys(data, ["email"]).email;

        const userEmail = response.email;
        const isEmailAlreadyRegistered = emailAllRegisteredUsers.includes(userEmail);

        // Check if the user is already registed to either log in or Register
        if(isEmailAlreadyRegistered) {
            // Login
            const newUser = {
                email: userEmail,
                password: process.env.REACT_APP_PASSWORD_AUTH_FACEBOOK
            };

            login(newUser)(dispatch, isSocialOn);
            showSnackbarBlack(dispatch, `Olá de Volta! (:`);
        } else {
            // Register
            const newUser = {
                name: response.givenName,
                email: userEmail,
                password: process.env.REACT_APP_PASSWORD_AUTH_FACEBOOK
            };

            register(newUser)(dispatch, isSocialOn);
            showSnackbarBlack(dispatch, 'Conta Babadoo criada via Facebook!');
        }

        //Authenticate User
        showSnackbarBlack(dispatch, 'carregando...');
        // showSnackbarBlack(dispatch, 'Seja Bem-vindo(a)');
        dispatch({"type": 'LOGIN_FACEBOOK', "payload": response });

    }

    const componentClicked = () => {}

    return(
        <FacebookLogin
            appId={process.env.REACT_APP_SOCIAL_FACEBOOK}
            autoLoad={false}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            render={renderProps => (
            <button
                className="btn login-btn"
                style={{backgroundColor: "#3B5899", margin: 5, display: "block" }}
                onClick={renderProps.onClick}
            >
                <img
                    src="img/icons/buttonslogin/facebook.png"
                    alt="ícone de login do google"
                    className="btn-icon"
                />
                <span className="btn-txt">Entrar com <strong>Facebook</strong></span>
            </button>
            )}
        />
    );
}
