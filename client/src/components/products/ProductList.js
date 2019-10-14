import React, { useEffect, useState, Fragment } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { getAllProducts } from '../../redux/actions/productActions';
import { checkForServerError } from '../../redux/actions/errorActions';
// End Redux
import LoadingIndicator from '../LoadingIndicator';
import Product from './Product';
import { ProductConsumer } from '../../data/contexts/mainContext';
import PropTypes from 'prop-types';

ProductList.propTypes = {
    checkForServerError: PropTypes.bool,
    getAllProducts: PropTypes.func,
    isLoading: PropTypes.bool,
    allProductsList: PropTypes.object,
}

export default function ProductList() {
    const [isError, setIsError] = useState(false);
    // Redux
    const { isLoading, allProductsList, serverStatus } = useStoreState(state => ({
        isLoading: state.productReducer.cases.isLoading,
        allProductsList: state.productReducer.cases.allProductsList,
        serverStatus: state.errorReducer.cases.status
    }));
    const dispatch = useStoreDispatch();
    // End Redux

    useEffect(() => {
        if(checkForServerError(serverStatus)) {
            console.log("errorServerDetected", serverStatus);
            setIsError(true);
        } else {
            console.log("ServerFine", serverStatus);
            getAllProducts(dispatch);
        }

    }, [serverStatus, setIsError]);

    return (
        <Fragment>
            <div className="py-5">
                <div className="container">
                    <div className="row text-center">
                        {isError && <div className="text-center text-sub-title">Ocorreu um problema. Tente recarregar a página novamente<br /></div>}
                        {isLoading ? (
                            <div className="col-10 mx-auto">
                                <LoadingIndicator />
                            </div>
                        ) : (
                            allProductsList.map(product => (
                                <Product key={product._id} product={product} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}