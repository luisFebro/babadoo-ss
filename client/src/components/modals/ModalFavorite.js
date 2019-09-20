import React from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../../context';
import {
    ButtonContainerPressedEffectDark as DarkBtn,
    ButtonContainerPressedEffectYellow as YellowBtn
} from '../Button';
import { Link } from 'react-router-dom';

export default function ModalFavorite() {
    return (
        <ProductConsumer>
            {value => {
                const { isModalFavoriteOpen, closeModal } = value;
                const { image, title, price } = value.modalProduct;
                if (!isModalFavoriteOpen) {
                    return null;
                } else {
                    return (
                        <ModalContainer>
                            <div className="container">
                                <div className="row">
                                    <div
                                        id="modal"
                                        className="col-10 col-md-6 col-lg-4 mx-auto text-center text-capitalize p-5"
                                    >
                                        <h2
                                            className="animated bounce fast mb-2"
                                            style={{
                                                animationIterationCount: '3'
                                            }}
                                        >
                                            <span>
                                                <i className="fas fa-heart"></i>
                                            </span>
                                            Adicionado aos favoritos
                                        </h2>
                                        <img src={image} alt="product" className="img-fluid shadow-elevation" />
                                        <section className="my-2">
                                            <h5>{title}</h5>
                                        </section>
                                        <div className="d-flex flex-column justify-content-center align-items-center mt-2">
                                            <Link to="/">
                                                <DarkBtn onClick={() => closeModal()}>Voltar</DarkBtn>
                                                <YellowBtn
                                                    className="mt-2"
                                                    onClick={() => {
                                                        closeModal();
                                                        value.openModalOnly();
                                                    }}
                                                >
                                                    Ir aos favoritos
                                                </YellowBtn>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalContainer>
                    );
                }
            }}
        </ProductConsumer>
    );
}

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    #modal {
        background: var(--mainWhite);
    }
    .fa-heart {
        margin-right: 10px;
        color: var(--mainRed);
        font-size: 2.2rem;
    }
`;
