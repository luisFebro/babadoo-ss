import React from 'react';
import Title from '../Title';
import Product from '../Product';
import { ProductConsumer } from '../../context';

export default function Lingerie() {
    return (
        <React.Fragment>
            <Title name="" title="Lingeries" />
            <div className="py-2">
                <div className="container">
                    <div className="row">
                        <ProductConsumer>
                            {value => {
                                return value.products.map(product => {
                                    return product.description === "lingeries" ?
                                        (<Product
                                            key={product.id}
                                            product={product} />
                                        ) :
                                        null
                                })
                            }}
                        </ProductConsumer>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}