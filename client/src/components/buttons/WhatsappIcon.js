import React from 'react';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';

export default function WhatsappIcon() {
    let { userName } = useStoreState(state => ({
        userName: state.userReducer.cases.currentUpdatedUser.name
    }));
    return (
        <DivWrapper>
            {userName !== 'admin' ? (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-whatsapp-web text-hide animated rubberBand fast"
                    style={{ animationDelay: '15s', animationIterationCount: '3' }}
                    title="Clique aqui para enviar uma mensagem em nosso WhatsApp"
                    href="http://linkwhatsapp.com.br/go/9tL"
                >
                    {' '}
                    {/*(92) 99506-6603*/}
                </a>
            ) : null}
        </DivWrapper>
    );
}

const DivWrapper = styled.div`
    .link-whatsapp-web {
        position: fixed;
        display: inline-block;
        right: 10px;
        bottom: 10px;

        height: 60px;
        width: 60px;

        background: url(https://imgur.com/2RhqZyw.png);
        background-size: contain;
        opacity: 0.7;

        z-index: 99;

        transition: opacity 0.5s 0s, visibility 0s 0.3s;
    }

    .link-whatsapp-web:hover {
        transform: scale(1.1);
        opacity: 1;
    }

    .text-hide {
        color: transparent;
        text-shadow: none;
        background-color: transparent;
        border: 0;
    }
`;
