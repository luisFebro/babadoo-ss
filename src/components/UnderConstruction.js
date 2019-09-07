import React, { Component } from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context';
import { ButtonContainer_pressedEffect2 } from './Button';
import { Link } from 'react-router-dom';

export default class UnderConstruction extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const { modalOpen , closeModal } = value;

                    if(!modalOpen) {
                        return null;
                    } else {
                        return (
                            <ModalContainer>
                                <div className="container">
                                    <div className="row">
                                        <div
                                            id="modal"
                                            className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
                                        >
                                            <section>
                                                <img src="" alt=""/>
                                                <h2>Ainda estamos trabalhando nesta seção.</h2>
                                                <h2>Logo estará disponível.</h2>
                                            </section>
                                            <Link to="/">
                                                <ButtonContainer_pressedEffect2 onClick={()=> closeModal()}>
                                                    voltar para vitrine
                                                </ButtonContainer_pressedEffect2>
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
    background: rgba(0, 0, 0, .3);
    display: flex;
    align-items: center;
    justify-content: center;
    #modal {
        background: var(--mainWhite);
    }
`;