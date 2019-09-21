import React, { Component } from 'react';
import LogoSlogon from '../components/LogoSlogon';
import ButtonCart from '../components/buttons/ButtonCart';
import Title from '../components/Title';
import ProductList from '../components/products/ProductList';

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <LogoSlogon />
                <Title name="Nossa" title="Vitrine" />
                <ProductList />
                <ButtonCart />
            </React.Fragment>
        );
    }
}
