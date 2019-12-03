import React from 'react';
import RedirectPage from '../components/RedirectPage';

export default function Default({ location }) {
    return(
        <div className="container">
            <div className="row">
                <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                    <h1 className="display-3">404</h1>
                    <h1>error</h1>
                    <h1>Oops! Página não encontrada!</h1>
                    <h3>
                        O pedido para a
                        <br />
                        <span className="text-danger">URL{location.pathname}</span>
                        <br />
                        não foi encontrado!
                    </h3>
                </div>
            </div>
            <RedirectPage activated={true} waitSec={20} />
        </div>
    );
}

