import React from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import { useStoreActions } from 'easy-peasy';


export default function EmailAuth() {
    const showMenuBarLogin = useStoreActions(actions => actions.dataLogin.showMenuBarLogin);

    return (
        <button
          className="btn login-btn"
          style={{backgroundColor: 'grey', border: "none", margin: 5, display: "block" }}
         >
             <img
                  src="img/icons/buttonslogin/email.png"
                  alt="ícone de login de email"
                  className="btn-icon"
              />
             <span className="btn-txt">Entrar com <strong>Email</strong></span>
         </button>
    );
}


