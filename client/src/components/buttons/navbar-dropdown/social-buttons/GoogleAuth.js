import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { showSnackbarBlack } from '../../../../redux/actions/snackbarActions';
import { login, register } from '../../../../redux/actions/authActions';
// End Redux
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import getDataObjDiffKeys from '../../../utils/promises/getDataObjDiffKeys';
import { fetchDataAsyncWithHooks } from '../../../utils/promises/fetchDataAsyncWithHooks'
// import parse from 'html-react-parser';

export default function GoogleAuth() {
    const [data, setData] = useState({});

    // const name = getState().authReducer.cases.user.name);
    const dispatch = useStoreDispatch();
    console.log(name);

    // Getting data from database afte mounting
    useEffect(() => { fetchDataAsyncWithHooks('api/users/list', setData) }, []);

    const responseGoogle = response => {
        //Return an Obj with an Array with all emails
        const isSocialOn = 'google';
        const emailAllRegisteredUsers = getDataObjDiffKeys(data, ["email"]).email;

        const userEmail = response.profileObj.email;
        const isEmailAlreadyRegistered = emailAllRegisteredUsers.includes(userEmail);

        // Check if the user is already registed to either log in or Register
        if(isEmailAlreadyRegistered) {
            // Login
            const newUser = {
                email: userEmail,
                password: 'google'
            };

            login(newUser)(dispatch, isSocialOn);
            showSnackbarBlack(dispatch, `Olá de Volta!`);
        } else {
            // Register
            const newUser = {
                name: response.profileObj.givenName,
                email: userEmail,
                password: 'google'
            };
            register(newUser)(dispatch, isSocialOn);
            showSnackbarBlack(dispatch, 'Conta Babadoo criada via Google!');
        }

        //Authenticate User
        dispatch({type: 'LOGIN_GOOGLE', payload: response });

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


