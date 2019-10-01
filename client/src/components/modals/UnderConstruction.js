import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../../data/contexts/mainContext';
import { underConstruction } from '../../data/dataIllustrations';
import { ButtonContainerPressedEffectDark as DarkBtn } from '../buttons/Default';

export default class UnderConstruction extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
                    const { modalOpenOnly, closeModal } = value;

                    if (!modalOpenOnly) {
                        return null;
                    } else {
                        return (
                            <ModalContainer>
                                <div className="container">
                                    <div className="row">
                                        <div
                                            id="modal"
                                            className="col-10 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-1"
                                        >
                                            <section>
                                                <img
                                                    className="img-fluid mx-auto my-2 shadow-elevation"
                                                    src={underConstruction.img}
                                                    alt={underConstruction.title}
                                                />
                                                <h2>Em Manutenção.</h2>
                                                <h2>Logo ficará disponível! :)</h2>
                                            </section>
                                            <Link to="/">
                                                <DarkBtn className="my-4" onClick={() => closeModal()}>
                                                    voltar para vitrine
                                                </DarkBtn>
                                            </Link>
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
`;
