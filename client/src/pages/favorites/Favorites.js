import React, { Fragment, useEffect, useState } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { loadFavoriteProducts } from '../../redux/actions/productActions';
import { showSnackbar } from '../../redux/actions/snackbarActions';
// End Redux
import ProductFavorite from './ProductFavorite';
import Title from '../../components/Title';
import parse from 'html-react-parser';
import EmptyContent from '../../components/EmptyContent';
import ShareSocialMediaButtons from '../../components/buttons/ShareSocialMediaButtons';
import Spinner from '../../components/loadingIndicators/Spinner';

export default function Favorites() {
    const [favProducts, setFavProducts] = useState([]);

    const { name, userId, isLoading } = useStoreState(state => ({
        name: state.userReducer.cases.currentUser.name,
        userId: state.userReducer.cases.currentUser['_id'],
        isLoading: state.globalReducer.cases.isLoading
    }));
    const dispatch = useStoreDispatch();

    const loadFavoriteList = userId => {
        loadFavoriteProducts(userId)
        .then(res => {
            // if(res !== 200) return showSnackbar(dispatch, res.data.msg, 'error');
            setFavProducts(res.data);
        })
    }

    useEffect(() => {
        if(userId) {
            loadFavoriteList(userId);
        }
    }, [userId])

    const showEmptyContent = () => (
        <EmptyContent
            text={'Sua Galeria está vazia...'}
            img={'img/illustrations/empty-content.png'}
            actionButton={{
                btnName: "dark",
                title: "Escolher seus favoritos",
            }}
        />
    );

    const showFavProducts = () => {
        const favList = favProducts.map(product => {
            return <ProductFavorite key={product._id} product={product} />;
        })

        return(
            <Fragment>
                {favProducts.length === 0 || !name
                ? showEmptyContent()
                : (
                    <div className="py-2">
                        <div className="container">
                            <div className="row">
                                {favList}
                            </div>
                        </div>
                    </div>
                )}
            </Fragment>

        );
    };

    const userAuthenticatedContent = () => (
        <Fragment>
            <Title title={`Seus Favaritos, ${name}`} />
            {isLoading ? <Spinner alignment="center" /> : showFavProducts()}
        </Fragment>
    );

    const visitorContent = () => (
        <Title
            title={`Faça seu Acesso`}
            subTitle={parse(`Você precisa de uma conta para acessar seus favoritos. <br/> Click já no ícone de usuário alí em cima`)}
        />
    );

    const showPage = () => (
        <Fragment>
            {name ? userAuthenticatedContent() : visitorContent()}
        </Fragment>
    );

    return (
        <Fragment>
            {showPage(name)}
        </Fragment>
    );
}

