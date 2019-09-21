import React from 'react';
import { pulse } from '../components/keyframes/pulse';
import styled, { keyframes } from 'styled-components';

export default function Preloader() {
    return (
        <DivWrapper>
            <img
                src="img/babadoo-logo_no-slogon.png"
                alt="babadoo - sexyshop está carregando..."
                widht="150px"
                height="150px"
            />
            <h2>Carregando</h2>
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: var(--mainWhite);
    color: var(--mainDark);
    z-index: 999;

    & img {
        transition: 0.5s;
        animation: ${pulse} 1s linear infinite;
    }

    & h2 {
        margin-top: 50px;
    }

    //Three-dot bouncing loading effect
    //Resource: https://codepen.io/danielmorosan/pen/XmYBVx
    & .spinner {
        //margin: 100px auto 0;
        width: 70px;
        text-align: center;
    }

    & .spinner > div {
        margin: 5px;
        width: 12px;
        height: 12px;
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
