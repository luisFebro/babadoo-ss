import React from 'react';
import getDataObjDiffKeys from '../../../utils/promises/getDataObjDiffKeys';

export default function EmailAuth() {
    //Return an Obj with an Array with all emails
    // const emailAllRegisteredUsers = getDataObjDiffKeys(data, ["email"]).email;

    // const userEmail = response.email;
    // const isEmailAlreadyRegistered = emailAllRegisteredUsers.includes(userEmail);

    return (
        <button
            className="btn login-btn"
            style={{ backgroundColor: 'grey', border: 'none', margin: 5, display: 'block' }}
        >
            <img src="img/icons/buttonslogin/email.png" alt="ícone de login de email" className="btn-icon" />
            <span className="btn-txt">
                Entrar com <strong>Nome/Email</strong>
            </span>
        </button>
    );
}
