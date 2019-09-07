import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer_pressedEffect2, ButtonContainer_pressedEffectYellow } from './Button';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
                    const {id, company, image, price, info, title, inCart} = value.detailProduct;
                    return (
                        <div className="container py-5">
                            {/* title */}
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted my-3">
                                    <h1><strong>{title}</strong></h1>
                                </div>
                            </div>
                            {/* end title */}
                            {/*product info*/}
                            <div className="row">
                                <div className="col-5 mx-auto col-md-6 my-3 text-title">
                                    <img src={image} className="img-fluid" alt="product"/>
                                </div>
                                {/* product text */}
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    {/*<h2 className="text-center"> modelo: {title}</h2>*/}
                                    <h4 className="text-uppercase text-muted mt-3 mb-2">
                                        marca: <span className="text-uppercase">
                                        {company}</span>
                                    </h4>
                                    <h4 className="text-yellow">
                                        <strong>
                                            preço: <span>R$</span>
                                            {price}
                                        </strong>
                                    </h4>
                                    <h5 className="text-capitalize font-weight-bold mt-3 mb-0">
                                        Informações do Produto:
                                    </h5>
                                    <p className="text-muted lead text-justify">{info}</p>
                                    {/* buttons */}
                                    <div className="d-flex flex-row mr-2 mt-5">
                                        <Link to="/">
                                            <ButtonContainer_pressedEffect2>
                                                Vitrine
                                            </ButtonContainer_pressedEffect2>
                                            <ButtonContainer_pressedEffectYellow
                                                cart
                                                disabled={inCart ? true:false}
                                                onClick = {() => {
                                                    value.addToCart(id);
                                                    value.openModal(id);
                                                }}
                                            >
                                                {inCart ? "No carrinho" : "adicionar no carinho"}
                                            </ButtonContainer_pressedEffectYellow>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                            {/*end product info*/}
                        </div>
                    );
                }}
            </ProductConsumer>
        );
    }
}