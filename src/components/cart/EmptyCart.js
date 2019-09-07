import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonContainer_pressedEffect2 } from '../Button';

export default function EmptyCart() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-10 mx-auto text-center">
                    <h1 className="text-title"><strong>Oops! Seu carrinho está vazio</strong></h1>
                    <Link to='/'>
                        <ButtonContainer_pressedEffect2 className="text-capitalize">
                            voltar para a vitrine
                        </ButtonContainer_pressedEffect2>
                    </Link>
                </div>
            </div>
        </div>
    );
}