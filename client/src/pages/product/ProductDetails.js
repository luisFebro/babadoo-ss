import React, { useEffect, useState, Fragment } from 'react';
import Title from '../../components/Title';
import { useStoreDispatch } from 'easy-peasy';
import { Link } from 'react-router-dom';
import { readProduct } from '../../redux/actions/productActions';
import { showSnackbar } from '../../redux/actions/snackbarActions';
import ProductImgGallery from './ProductImgGallery';
import ProductInfos from './ProductInfos';
import {
    ButtonContainerPressedEffectDark as DarkBtn,
    ButtonContainerPressedEffectYellow as YellowBtn
} from '../../components/buttons/Default';
import Skeleton from '@material-ui/lab/Skeleton';

export default function ProductDetails({ match }) {
    const [data, setData] = useState("");
    const { _id, title, info } = data;
    // need tohandle refCOde
    const titleWithRefCode = `${title} (${data && 'info.refCode'})`;
    const inCart = false;

    const dispatch = useStoreDispatch();

    const loadSingleProduct = dashedName => {
        readProduct(dispatch, dashedName)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error');
            setData(res.data);
        })
    }

    useEffect(() => {
        let dashedTitle = match.params.dashedName;
        loadSingleProduct(dashedTitle)
    }, [match])

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

    return (
        <div className="container py-5">
            <Fragment>
                {data
                ? <Title title={titleWithRefCode} color="black" />
                : <Skeleton variant="text" height={30} />}
            </Fragment>
            <div className="row">
                <ProductImgGallery _id={_id} title={title} />
                <ProductInfos data={data} />
            </div>
            {showActionButtons()}
        </div>
    );
}

