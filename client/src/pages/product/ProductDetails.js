import React, { useEffect, useState, Fragment } from 'react';
import Title from '../../components/Title';
import { useStoreDispatch } from 'easy-peasy';
import { Link } from 'react-router-dom';
import { readProduct, loadRelatedProducts } from '../../redux/actions/productActions';
import { showSnackbar } from '../../redux/actions/snackbarActions';
import ProductImgGallery from './ProductImgGallery';
import ProductInfos from './ProductInfos';
import Product from '../../components/_layout/products/Product';
import Spinner from '../../components/loadingIndicators/Spinner';
import {
    ButtonContainerPressedEffectDark as DarkBtn,
    ButtonContainerPressedEffectYellow as YellowBtn
} from '../../components/buttons/Default';
import Skeleton from '@material-ui/lab/Skeleton';
import removeDashes from '../../utils/string/removeDashes';

export default function ProductDetails({ match }) {
    let dashedTitle = match.params.dashedName;
    const [data, setData] = useState({}); // n1
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { _id, title } = data;
    const inCart = false;

    const dispatch = useStoreDispatch();

    const loadProducts = dashedName => {
        readProduct(dispatch, dashedName)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error');
            setData(res.data);
            const dataProduct = { id: res.data._id, limit: 4 }
            loadRelatedProducts(dispatch, dataProduct)
            .then(res => {
                if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error');
                setRelatedProducts(res.data);
            })

        })
    }

    useEffect(() => {
        loadProducts(dashedTitle)
    }, [])

    const showTitle = () => (
        <div>
            {title
            ? <Title title={`${title} (${data.refCode})`} color="black" />
            : <Skeleton variant="text" height={30} width={'70%'} style={{margin: 'auto'}} />}
        </div>
    );

    const showActionButtons = () => (
        <div className="container-center mt-5">
            <Link to="">
                <DarkBtn>Vitrine</DarkBtn>
                <YellowBtn
                    cart
                    disabled={inCart ? true : false}
                    onClick={() => {
                        // value.addToCart(id);
                    }}
                >
                    {inCart ? 'No carrinho adicionado' : 'adicionar no carrinho'}
                </YellowBtn>
            </Link>
        </div>
    );

    const showRelatedProducts = relatedProducts => {
        const listWithComponent = relatedProducts.map(relatedOne => {
            return <Product key={relatedOne._id} product={relatedOne} />
        })

        return (
            <div style={{paddingTop: '50px'}}>
                <p className='text-left text-container mb-5'>Você também pode gostar:</p>
                {listWithComponent.length === 0
                ? (
                    <span className="container-center">
                        <Spinner />
                    </span>
                ) : (
                    <div className="container">
                        <div className="row">
                            {listWithComponent}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="container py-5">
            {showTitle()}
            <div className="row">
                <ProductImgGallery _id={_id} title={title} thisUrl={dashedTitle} />
                <ProductInfos data={data} />
            </div>
            {showActionButtons()}
            {showRelatedProducts(relatedProducts)}
        </div>
    );
}



/* COMMENTS
n1: LESSON:
useState({}) is the default initial value to fetch data with skeleton loading.
Check for data with each object´s property like destructuring object which will return empty/undefined if the object is not already fetched.
use isLoading conditional with API for tradicitional loading indicators.
*/