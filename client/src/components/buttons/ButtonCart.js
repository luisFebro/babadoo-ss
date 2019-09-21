import React from 'react';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../../data/contexts/mainContext';
import { ButtonContainerPressedEffectYellow as ButtonYellow } from './Default';

export default function ButtonCart() {
    return (
        <ProductConsumer>
            {value => {
                return (
                    <Link to="/seu-carrinho" className="ml-2 fixed-bottom m-3" style={{ zIndex: 100 }}>
                        <ButtonYellow
                            className="animated tada slower"
                            style={{
                                padding: '7px',
                                position: 'relative',
                                zIndex: 150,
                                animationDelay: '20s',
                                animationIterationCount: 2
                            }}
                        >
                            <span>
                                <i className="fas fa-cart-plus p-2">
                                    <span style={{ marginLeft: '.2em' }} className="badge badge-danger p-1">
                                        {value.cartTotalItems}
                                    </span>
                                </i>
                            </span>
                        </ButtonYellow>
                    </Link>
                );
            }}
        </ProductConsumer>
    );
}
