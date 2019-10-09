import React from 'react';
// Redux
import { useStoreDispatch } from 'easy-peasy';
import { showSnackbarBlack } from '../../../../redux/actions/snackbarActions';
import { register } from '../../../../redux/actions/authActions';
// End Redux
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';


export default function GoogleAuth() {
    // Redux
    const dispatch = useStoreDispatch();
    // End Redux
    const responseGoogle = response => {
        //Register New user DB
        // showSnackbarBlack(dispatch, 'Carregando...');
        // showSnackbarBlack(dispatch, 'Seja Bem-Vindo(a)!');
        dispatch({type: 'LOGIN_GOOGLE', payload: response });

        // const newUser = {
        //     name: response.profileObj.familyName,
        //     email: response.profileObj.email,
        //     password: ''
        // };

        // register(newUser)(dispatch);

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


