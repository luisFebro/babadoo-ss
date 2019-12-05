import React, { useEffect, Fragment } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { getAllProducts } from '../../../redux/actions/productActions';
// import { checkForServerError } from '../../redux/actions/errorActions';
// End Redux
import LoadingThreeDots from '../../loadingIndicators/LoadingThreeDots';
import Product from './Product';
import { ProductConsumer } from '../../../data/contexts/mainContext';
import PropTypes from 'prop-types';

export default function ProductList() {
    // Redux
    const { allProductsList } = useStoreState(state => ({
        allProductsList: state.productReducer.cases.allProductsList,
    }));
    const dispatch = useStoreDispatch();
    // End Redux

    useEffect(() => {
        getAllProducts(dispatch);
    }, []);

    const list = allProductsList.map(product => {
        return <Product key={product._id} product={product} />;
    })

    return (
        <div className="py-5">
            <div className="container">
                <div className="row">
                    {list}
                </div>
            </div>
        </div>
    );
}
