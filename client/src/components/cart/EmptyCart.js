import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonContainerPressedEffectDark } from '../Button';

export default function EmptyCart() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-10 mx-auto text-center">
                    <h1 className="text-title">
                        <strong>Nada aqui! Seu carrinho está vazio</strong>
                    </h1>
                    <Link to="/">
                        <ButtonContainerPressedEffectDark className="text-capitalize">
                            voltar para a vitrine
                        </ButtonContainerPressedEffectDark>
                    </Link>
                </div>
            </div>
        </div>
    );
}
