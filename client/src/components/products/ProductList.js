import React, { useEffect, useState, Fragment } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { getAllProducts } from '../../redux/actions/productActions';
// End Redux
import Product from './Product';
import { ProductConsumer } from '../../data/contexts/mainContext';

export default function ProductList() {
    const [isError, setIsError] = useState(false);
    // Redux
    const { isLoading, allProductsList } = useStoreState(state => ({
        isLoading: state.productReducer.cases.isLoading,
        allProductsList: state.productReducer.cases.allProductsList,
    }));
    const dispatch = useStoreDispatch();
    // End Redux

    useEffect(() => {
        try {
            getAllProducts(dispatch);
        } catch(e) {
            setIsError(true);
        }
    }, []);

    return (
        <Fragment>
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        {isError && <div clasName="text-center text-sub-title">Ocorreu um problema. Tente recarregar a página novamente</div>}
                        {isLoading ? (
                            <h2 className="text-default text-center">Carregando...</h2>
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
