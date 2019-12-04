import React, { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import { spin } from '../../keyframes/spin';
import PropTypes from 'prop-types';

Spinner.propTypes = {
    expireSec: PropTypes.number,
}

export default function Spinner({ expireSec }) {
    const [run, setRun] = useState(true);

    useEffect(() => {
        stopSpinnerAfter();
    }, [])

    const stopSpinnerAfter = () => {
        const milisecs = expireSec * 1000;
        setTimeout(() => setRun(false), milisecs);
    }

    const showSpinner = isRunning => (
        isRunning &&
        <SpinnerInner />
    );

    return (
        <Fragment>
            {showSpinner(run)}
        </Fragment>
    );
}

const Wrapper = styled.div`
    height: 40px;
    width: 40px;
    margin: auto;

    border: 2px solid #f3f3f3;
    border-top: 3px solid #f25a41;
    border-radius: 100%;

    animation: ${spin} .8s linear infinite;
`;

const SpinnerInner = styled(Wrapper)`
    position: relative;
`;

/* concept from: https://codepen.io/smashtheshell/pen/jqGxzr*/