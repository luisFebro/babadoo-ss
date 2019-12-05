import React, { useEffect, useState, Fragment } from 'react';
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
    const [isError, setIsError] = useState(false);
    // Redux
    const { isLoading, allProductsList, allFavProductsList } = useStoreState(state => ({
        allFavProductsList: state.userReducer.cases.allFavProductsList,
        isLoading: state.globalReducer.cases.isLoading,
        allProductsList: state.productReducer.cases.allProductsList,
    }));
    const dispatch = useStoreDispatch();
    // End Redux


    useEffect(() => {
        getAllProducts(dispatch);
    }, []);

    //Comparing the id from Favorite list with id of main store's showcase
    const idsFromFavList = allFavProductsList.map(fav => {
        return fav._id;
    });

    const mapAllProductsList = allProductsList.map(product => {
        let isAddedFav = false;
        if (idsFromFavList) {
            if (idsFromFavList.includes(product._id)) {
                isAddedFav = true;
            }
        }
        return <Product key={product._id} product={product} isFav={isAddedFav} />;
    })

    return (
        <div className="py-5">
            <div className="container">
                <div className="row">
                    {mapAllProductsList}
                </div>
            </div>
        </div>
    );
}
