import React from 'react';
// Redux
import { useStoreDispatch } from 'easy-peasy';
import { showSnackbarBlack } from '../../../../redux/actions/snackbarActions';
import { register } from '../../../../redux/actions/authActions';
// End Redux
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
export default function FacebookAuth() {
    // Redux
    const dispatch = useStoreDispatch();
    // End Redux
    const responseFacebook = response => {
        //Register New user DB
        const newUser = {
            name: response.givenName,
            email: response.email,
            password: ''
        };

        register(newUser)(dispatch);

        console.log(newUser.name, newUser.email);

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
