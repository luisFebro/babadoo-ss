import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useStoreActions } from 'easy-peasy';

export default function FacebookAuth() {
    const showMenuBarLogin = useStoreActions(actions => actions.dataLogin.showMenuBarLogin);

    const responseFacebook = response => {
        showMenuBarLogin([response, {name: "facebook"}]);
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
