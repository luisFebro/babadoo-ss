import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import { ProductConsumer } from '../context';
import LogoSlogon from './LogoSlogon';
import ButtonCart from './ButtonCart';

export default class ProductList extends Component {
    render() {
        return (
            <React.Fragment>
                <LogoSlogon />
                <div className="py-5">
                    <div className="container">
                        <Title name="Nossa" title="Vitrine" />

                        <div className="row">
                            <ProductConsumer>
                                {value => {
                                    return value.products.map(product => {
                                        return <Product key={product.id} product={product} />
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
                <ButtonCart />
            </React.Fragment>
        );
    }
}
