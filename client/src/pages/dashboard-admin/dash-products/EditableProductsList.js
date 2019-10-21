import React, { useEffect, useState, Fragment } from 'react';
import EditableProduct from './EditableProduct';

// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { getAllProducts } from '../../../redux/actions/productActions';
// End Redux
import LoadingIndicator from '../../../components/LoadingIndicator';
import PropTypes from 'prop-types';

ProductList.propTypes = {
    getAllProducts: PropTypes.func,
    isLoading: PropTypes.bool,
    allProductsList: PropTypes.object,
}

export default function ProductList() {
    // Redux
    const { isLoading, allProductsList } = useStoreState(state => ({
        isLoading: state.globalReducer.cases.isLoading,
        allProductsList: state.productReducer.cases.allProductsList,
    }));
    const dispatch = useStoreDispatch();
    // End Redux

    useEffect(() => {
        getAllProducts(dispatch);
    }, []);

    return (
        <Fragment>
            <div className="py-5">
                <div className="container">
                    <div className="row text-center">
                        {isLoading ? (
                            <LoadingIndicator />
                        ) : (
                            allProductsList.map(product => {
                                return <EditableProduct key={product._id} product={product} />
                            })
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}