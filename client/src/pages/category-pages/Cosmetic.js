import React from 'react';
import Title from '../../components/Title';
import Product from '../../components/products/Product';
import { ProductConsumer } from '../../data/contexts/mainContext';
import ButtonCart from '../../components/buttons/ButtonCart';
import ShareSocialMediaButtons from '../../components/buttons/ShareSocialMediaButtons';

export default function Cosmetic() {
    const pageData = {
        titleShare: "Compartilhe essa Categoria",
        pageURL: "https://www.babadoo.herokuapp.com",
        pageImg: "i.imgur.com/9GjtAiW.png",
        pageTitle: "Babadoo - Categoria Cosméticos",
        pageDescription: "",

    }
    pageData.pageDescription = `Conheça nossa linha de cosméticos em ${pageData.pageURL}`
    return (
        <React.Fragment>
            <Title name="" title="Cosméticos" />
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
