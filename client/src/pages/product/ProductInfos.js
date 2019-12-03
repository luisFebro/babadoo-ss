import React from 'react';
import PropTypes from 'prop-types';

ProductInfos.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        company: PropTypes.string,
        price: PropTypes.number,
    }).isRequired,
}

export default function ProductInfos({ data }) {
    const { title, company, price, info } = data;

    return (
       <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
           <h2 className="text-center"> modelo: {title}</h2>
           <h4 className="text-uppercase text-muted mt-3 mb-2">
               marca: <span className="text-uppercase">{company}</span>
           </h4>
           <h4 className="text-yellow">
               <strong>
                   preço: <span>R$</span>
                   {price}
               </strong>
           </h4>
           <h5 className="text-capitalize font-weight-bold mt-3 mb-0">
               Informações do Produto:
           </h5>
           <p className="text-muted lead text-justify">{JSON.stringify(info)}</p>
       </div>
    );
}