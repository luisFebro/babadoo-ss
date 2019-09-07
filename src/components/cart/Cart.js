import React, { Component } from 'react';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import { ProductConsumer } from '../../context';
import CardTotals from './CardTotals';


export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value => {
                        const {cart} = value;
                        if(cart.length > 0) {
                            return (
                                <React.Fragment>
                                    <Title name="seu" title="carrinho" />
                                    <CartColumns />
                                    <CartList value={value} />
                                    <CardTotals value={value} />
                                </React.Fragment>
                            );
                        } else {
                            return <EmptyCart />
                        }
                    }}
                </ProductConsumer>
            </section>
        );
    }
}
