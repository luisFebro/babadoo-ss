import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

RedirectPage.propTypes = {
    activated: PropTypes.bool,
    to: PropTypes.string,
    waitSec: PropTypes.number,
}

export default function RedirectPage({ activated = false, to = "/", waitSec = 0 }) {
    const [redirect, setRedirect] = useState(false);

    const timeToRedirect = () => {
        const milisecs = waitSec * 1000;
        setTimeout(() => setRedirect(true), milisecs);
    }

    const needRedirect = () => (
        (activated && redirect) &&
        <Redirect to={to}/>
    );

    return(
        <div>
            {timeToRedirect()}
            {needRedirect()}
        </div>
    );
}
