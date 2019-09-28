import React from 'react';
import styled from 'styled-components';

export default function menuTopLogin() {
    return (
        <DivWrapper>
            <h4>Olá, Visitante!</h4>
        </DivWrapper>
    );
}

const DivWrapper = styled.div`
    position: absolute;
    top: 0;
    display: inline-block;
    height: 50px;
    width: 100%;
    color: var(--mainWhite);
    font: normal 1.3rem Arial;
    background-color: #f3f3f3;
    margin-right: 20px;
`;