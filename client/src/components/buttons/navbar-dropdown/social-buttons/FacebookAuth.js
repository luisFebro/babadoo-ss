import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useStoreDispatch } from 'easy-peasy';
export default function FacebookAuth() {
    // Redux
    const dispatch = useStoreDispatch();
    // End Redux
    const responseFacebook = response => {
        dispatch({type: 'SHOW_SNACKBAR_BLACK', payload: 'carregando...' });
        dispatch({"type": 'LOGIN_FACEBOOK', "payload": response });
    }

    const componentClicked = () => {}

    return(
        <FacebookLogin
            appId={process.env.REACT_APP_SOCIAL_FACEBOOK}
            autoLoad={false}
            fields="name,email,picture"
            onClick={null}
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
