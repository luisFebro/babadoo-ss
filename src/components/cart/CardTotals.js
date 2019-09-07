import React from 'react';
import { Link } from 'react-router-dom';

export default function CardTotals({value}) {
const { cartSubtotal, cartTax, cartTotal, clearCart} = value;
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 col-sm-8 mt-2 ml-sm-5 ml-md-auto text-capitalize text-right">
                        <Link to="/">
                            <button
                                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                                type="button"
                                onClick={() => clearCart()}
                            >
                                limpar carinho
                            </button>
                        </Link>
                        <h5>
                            <span className="text-sub-title">
                            subtotal:  </span>
                            <strong>R$ {cartSubtotal}</strong>
                        </h5>
                        <h5>
                            <span className="text-sub-title">
                            frete:  </span>
                            <strong>R$ {cartTax}</strong>
                        </h5>
                        <h5>
                            <span className="text-sub-title">
                            total final:  </span>
                            <strong>R$ {cartTotal}</strong>
                        </h5>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}