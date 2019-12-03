import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

RedirectPage.propTypes = {
    activated: PropTypes.bool,
    to: PropTypes.string,
    waitSec: PropTypes.number,
}

export default function RedirectPage({ activated = false, to = "/", waitSec = 0 }) {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        let unmounted = false; // n1
        if(!unmounted) {
            timeToRedirect();
        }
        return () => { unmounted = true }
    }, [])

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
            {needRedirect()}
        </div>
    );
}


/* COMMENTS
n1: https://stackoverflow.com/questions/58038008/how-to-stop-memory-leak-in-useeffect-hook-react
*/