import React from 'react';
import Card from './Card';

const CardList = ({ products }) => {
    return(
        <div>
            {
                products.map((user, i) => {
                    return (
                        <Card
                            key={i}
                            image = {products[i].image} //img
                            title={products[i].title} //category
                            description={products[i].description} //product
                            price={products[i].price}
                            // refer={products[i].ref}
                        />
                    );
                })
            }
        </div>
    );
}

export default CardList;