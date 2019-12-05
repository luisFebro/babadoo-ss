import React, { Fragment, useEffect } from 'react';
// Redux
import { useStoreState } from 'easy-peasy';
// End Redux
import ProductFavorite from './ProductFavorite';
import Title from '../../components/Title';
import parse from 'html-react-parser';
import EmptyContent from '../../components/EmptyContent';
import { ButtonContainerPressedEffectDark as Dark } from '../../components/buttons/Default';
import ShareSocialMediaButtons from '../../components/buttons/ShareSocialMediaButtons';
import { HashLink } from 'react-router-hash-link';
import LoadingThreeDots from '../../components/loadingIndicators/LoadingThreeDots';

export default function Favorites() {
    const { name, allFavProductsList, isLoading } = useStoreState(state => ({
        name: state.userReducer.cases.currentUser.name,
        allFavProductsList: state.userReducer.cases.currentUser.favoriteList,
        isLoading: state.globalReducer.cases.isLoading
    }));

    const loadFavoriteList = () => {

    }

    useEffect(() => {
        loadFavoriteList();
    }, [])

    const favProducts = allFavProductsList.map(product => {
        return <ProductFavorite key={product._id} product={product} />;
    });

    return (
        <Fragment>
            {name ? (
                <div>
                    <Title title={`Seus Favaritos, ${name}`} /> :
                    {allFavProductsList.length !== 0 ? (
                        <div className="py-2">
                            <div className="container">
                                <div className="row">{isLoading ? <LoadingThreeDots /> : favProducts}</div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <EmptyContent
                                text={'Sua Galeria está vazia...'}
                                img={'img/illustrations/empty-content.png'}
                            />
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <HashLink smooth to="/#inicio">
                                    <Dark className="mt-5">Escolher seus favoritos</Dark>
                                </HashLink>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <Title title={`Faça seu Acesso`} />
                    <h4 className="text-sub-title text-center">
                        {parse(
                            `Você precisa de uma conta para acessar seus favoritos. <br/> Click já no ícone de usuário alí em cima`
                        )}
                    </h4>
                </div>
            )}
        </Fragment>
    );
}
