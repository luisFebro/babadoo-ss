import React from 'react';
import Title from '../../components/Title';
import Product from '../../components/products/Product';
import { ProductConsumer } from '../../data/contexts/mainContext';
import ButtonCart from '../../components/buttons/ButtonCart';
import ShareSocialMediaButtons from '../../components/buttons/ShareSocialMediaButtons';
import parse from 'html-react-parser';

// Share Button Infos
const dataCategory = {
    name: "Cosméticos",
    urlName: "cosmeticos",
}
const pageData = {
    titleShare: parse(`Compartilhe a Categoria<br />${dataCategory.name}`),
    pageURL: `https://www.babadoo.herokuapp.com/${dataCategory.urlName}`,
    pageImg: "i.imgur.com/9GjtAiW",
    pageTitle: `Babadoo - Categoria ${dataCategory.name}`,
    get pageDescription() {
        return `Conheça nossa linha de ${dataCategory.name} em ${this.pageURL}`;
    }
}
// End Share Button Infos

export default function Cosmetic() {
    return (
        <React.Fragment>
            <Title title="Cosméticos" />
            <div className="py-2">
                <div className="container">
                    <div className="row">
                        <ProductConsumer>
                            {value => {
                                return value.products.map(product => {
                                    return product.description === 'cosméticos' ? (
                                        <Product key={product.id} product={product} />
                                    ) : null;
                                });
                            }}
                        </ProductConsumer>
                    </div>
                </div>
            </div>
            <ButtonCart />
            <ShareSocialMediaButtons data={pageData} />
        </React.Fragment>
    );
}
