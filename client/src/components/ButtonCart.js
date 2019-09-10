import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonContainerPressedEffectYellow as ButtonYellow } from './Button';

export default function ButtonCart() {
    return (
        <Link to="/seu-carrinho" className="ml-2 fixed-bottom m-3">
           <ButtonYellow className="animated tada slower" style={{position: 'relative', zIndex: 150, animationDelay: "10s", animationIterationCount: 2}} >
                <span>
                   <i className="fas fa-cart-plus p-2"> </i>
                </span>
           </ButtonYellow>
        </Link>
    );
}