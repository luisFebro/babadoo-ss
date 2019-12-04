import React from 'react';
import styled from 'styled-components';
import { spin } from '../../keyframes/spin';

export default function Spinner() {
    return (
        <SpinnerInner />
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