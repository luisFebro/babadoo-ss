import React from 'react';
import Title from '../../components/Title';
import Product from '../../components/products/Product';
import { ProductConsumer } from '../../data/contexts/mainContext';
import ButtonCart from '../../components/buttons/ButtonCart';
import ShareSocialMediaButtons from '../../components/buttons/ShareSocialMediaButtons';
import styled from 'styled-components';

export default function Lingerie() {
    const pageData = {
        titleShare: "Compartilhe essa Categoria",
        pageURL: "https://www.babadoo.herokuapp.com",
        pageImg: "i.imgur.com/9GjtAiW",
        pageTitle: "Babadoo - Categoria Lingeries",
        pageDescription: "",

    }
    pageData.pageDescription = `Conheça nossa linha de Lingeries em ${pageData.pageURL}`
    return (
        <React.Fragment>
            <DivWrapper>
               <div className="category-container">
                   <img style={{width: "100%", maxHeight: "100%", filter: "brightness(70%)", paddingBottom: "15px"}} src="img/category-pictures/lingerie-features.jpg" alt="destaques de lingeries"/>
                   <h1 className="category-title text-categories">
                       Lingeries<br /> Babadoo
                   </h1>
               </div>
            </DivWrapper>
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
            <ShareSocialMediaButtons data={pageData} />
        </React.Fragment>
    );
}

const DivWrapper = styled.div`
    .category-container {
        position: relative;
    }
    .category-title {
        position: absolute;
        size: 1.6em;
        color: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    @media (min-width: 600px) {
        display: flex;
        justify-content: center;
        img {
            width: 80%

        }
    }

`;