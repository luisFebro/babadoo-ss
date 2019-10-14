import React from 'react';
import { pulse } from '../keyframes/pulse';
import styled, { keyframes } from 'styled-components';

export default function Preloader() {
    return (
        <DivWrapper>
            <section className="loading-container">
                <h2 className="">Carregando</h2>
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </section>
        </DivWrapper>
    );
}

const bounceDots = keyframes`
    0%, 80%, 100% {
      transform: scale(0);
    } 40% {
      transform: scale(1.0);
    }
`;

const DivWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: var(--mainWhite);
    color: var(--mainDark);
    z-index: 999;

    //Three-dot bouncing loading effect
    //Resource: https://codepen.io/danielmorosan/pen/XmYBVx
    .loading-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
    }

    & .spinner {
        //margin: 100px auto 0;
        width: 70px;
        text-align: center;
    }

    & .spinner > div {
        margin: 5px;
        width: 6px;
        height: 6px;
        background-color: #333;

        border-radius: 100%;
        display: inline-block;
        animation: ${bounceDots} 1.4s infinite ease-in-out both;
    }

    & .spinner .bounce1 {
        animation-delay: -0.32s;
    }

    & .spinner .bounce2 {
        animation-delay: -0.16s;
    }
`;
