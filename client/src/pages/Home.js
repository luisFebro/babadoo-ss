import React, { Component } from 'react';
import LogoSlogon from '../components/LogoSlogon';
import ButtonCart from '../components/buttons/ButtonCart';
import Title from '../components/Title';
import ProductList from '../components/products/ProductList';
import ShareSocialMediaButtons from '../components/buttons/ShareSocialMediaButtons';

const pageData = {
    titleShare: "Compartilhe a Vitrine Babadoo",
    pageURL: "https://www.babadoo.herokuapp.com",
    pageImg: "https://i.imgur.com/9GjtAiW",
    pageTitle: "Babadoo SexShop - Nossa Vitrine",
    pageDescription: "",
}
pageData.pageDescription = `Conheça nossa vitrine em ${pageData.pageURL}`;

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <LogoSlogon />
                <Title name="Nossa" title="Vitrine" />
                <ProductList />
                <ShareSocialMediaButtons data={pageData} />
                <ButtonCart />
            </React.Fragment>
        );
    }
}
