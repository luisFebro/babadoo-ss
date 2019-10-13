import React, { useEffect, useState, Fragment } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { getAllProducts } from '../../redux/actions/productActions';
import { checkForServerError } from '../../redux/actions/errorActions';
// End Redux
import Product from './Product';
import { ProductConsumer } from '../../data/contexts/mainContext';
import PropTypes from 'prop-types';

ProductList.propTypes = {
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

    console.log("serverStatus", serverStatus);
    useEffect(() => {
        checkForServerError(serverStatus, setIsError);
        if(!isError) {
            getAllProducts(dispatch);
        }

    }, [serverStatus]);

    return (
        <Fragment>
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        {isError && <div className="text-center text-sub-title">Ocorreu um problema. Tente recarregar a página novamente</div>}
                        {isLoading ? (
                            <h2 className="text-sub-title text-center"><center>Carregando...</center></h2>
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