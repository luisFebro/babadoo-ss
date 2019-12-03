import React, { useEffect, useState } from 'react';
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

export default function ProductDetails({ match }) {
    const [data, setData] = useState({});
    const _id = data && data._id;
    const inCart = false;
    const title = 'Something';
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
        <div className="d-flex flex-row mr-2">
            <Link to="finalizar-compra">
                <DarkBtn>Vitrine</DarkBtn>
                <YellowBtn
                    cart
                    className="mt-3"
                    disabled={inCart ? true : false}
                    onClick={() => {
                        // value.addToCart(id);
                        // value.openModal(id);
                    }}
                >
                    {inCart ? 'No carrinho adicionado' : 'adicionar no carrinho'}
                </YellowBtn>
            </Link>
        </div>
    );

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-10 mx-auto text-center text-slanted my-3">
                    <h2>
                        <strong>{title}</strong>
                    </h2>
                </div>
            </div>
            <ProductImgGallery _id={_id} />
            <div className="row">
                <ProductInfos data={data} />
                {showActionButtons()}
                {JSON.stringify(data)}
            </div>
        </div>
    );
}

