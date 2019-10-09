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
// const emailAllUsers = getEmailAllRegisteredUsers();

export default function GoogleAuth() {
    const [data, setData] = useState({});
    const dispatch = useStoreDispatch();

    // Getting data from database
    const fetchData = async () => {
        try {
            const response = await axios.get('api/users/list');
            setData(response.data);
            // statements
        } catch(e) {
            // console.log(e);
            throw new Error(`fetchData: something went wrong! error: ${e.message}`);
        }
    };

    useEffect(() => { fetchData(data) }, [data]);

    const responseGoogle = response => {
        //Return an Obj with an Array with all emails
        const emailAllRegisteredUsers = getDataObjDiffKeys(data, ["email"]).email;

        const userEmail = response.profileObj.email;
        const isEmailAlreadyRegistered = emailAllRegisteredUsers.includes(userEmail);
        console.log(isEmailAlreadyRegistered);
        //Register New user DB
        // Check if the user is already registed to either log in or Register
        if(isEmailAlreadyRegistered) {
            // Login
            const newUser = {
                email: userEmail,
                password: 'google'
            };
            // login(newUser)(dispatch);
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


