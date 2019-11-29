import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

RedirectPage.propTypes = {
    activated: PropTypes.bool.isRequired,
    to: PropTypes.string,
    waitMili: PropTypes.number,
}

export default function RedirectPage({ to, activated = false }) {
    const needRedirect = (isActivated, to) => (
        isActivated &&
        <Redirect to={to}/>
    );

    return(
        <div>
            {needRedirect(activated, to)}
        </div>
    );
}
