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
    const { isLoading, allProductsList, serverStatus, allFavorites } = useStoreState(state => ({
        isLoading: state.productReducer.cases.isLoading,
        allProductsList: state.productReducer.cases.allProductsList,
        allFavorites: state.productReducer.cases.allFavorites,
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
                        {isError && <div className="text-center text-sub-title">Ocorreu um problema no servidor.<br />Tente recarregar a página novamente<br />ou<br />Verifique sua conexão à internet</div>}
                        {isLoading ? (
                            <div className="col-10 mx-auto">
                                <LoadingIndicator />
                            </div>
                        ) : (
                            allProductsList.map((product, ind) => {
                                // Check if the product is favorite
                                // let isAddedFav = false;
                                // if(allProductsList.includes(allFavorites[ind])) {
                                //     isAddedFav = true;
                                // }
                                // console.log(isAddedFav);
                                return <Product key={product._id} product={product} isFav={false} />
                            })
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}