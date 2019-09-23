import React from 'react';
import Title from '../../components/Title';
import Product from '../../components/products/Product';
import { ProductConsumer } from '../../data/contexts/mainContext';
import ButtonCart from '../../components/buttons/ButtonCart';

export default function Lingerie() {
    const pageData = {
        titleShare: "Compartilhe essa Categoria",
        pageURL: "https://www.babadoo.herokuapp.com/lingeries",
        pageImg: "https://i.imgur.com/9GjtAiW.png",
        pageTitle: "Babadoo - Categoria Lingeries",
        pageDescription: "",

    }
    pageData.pageDescription = `Conheça nossa linha de Lingeries em ${pageData.pageURL}`
    return (
        <React.Fragment>
            <Title name="" title="Lingeries" />
            <div className="py-2">
                <div className="container">
                    <div className="row">
                        <ProductConsumer>
                            {value => {
                                return value.products.map(product => {
                                    return product.description === 'lingeries' ? (
                                        <Product key={product.id} product={product} />
                                    ) : null;
                                });
                            }}
                        </ProductConsumer>
                    </div>
                </div>
            </div>
            <ButtonCart />
        </React.Fragment>
    );
}
