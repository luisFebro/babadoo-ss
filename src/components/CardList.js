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
                            img = {products[i].img}
                            category={products[i].category}
                            name={products[i].name}
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