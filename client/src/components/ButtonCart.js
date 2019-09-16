import React from 'react';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import { ButtonContainerPressedEffectYellow as ButtonYellow } from './Button';

export default function ButtonCart() {
    return (
        <ProductConsumer>
            {value => {
                 return(
                    <Link style={{zIndex: 100}} to="/seu-carrinho" className="ml-2 fixed-bottom m-3">
                       <ButtonYellow className="animated tada slower" style={{padding: "7px", position: 'relative', zIndex: 150, animationDelay: "10s", animationIterationCount: 2}} >
                            <span>
                               <i className="fas fa-cart-plus p-2">
                               <span style={{marginLeft: ".2em"}} className="badge badge-danger p-1">{value.cartTotalItems}</span>
                               </i>
                            </span>
                       </ButtonYellow>
                    </Link>
                );
            }}
        </ProductConsumer>
    );
}