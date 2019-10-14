import React, { Fragment } from 'react';
// Redux
import { useStoreState } from 'easy-peasy';
// End Redux
import Title from '../../components/Title';
import parse from 'html-react-parser';
import EmptyContent from '../../components/EmptyContent';
import { ButtonContainerPressedEffectDark as Dark } from '../../components/buttons/Default';
import { HashLink } from 'react-router-hash-link';
import ProductFavorite from '../../components/products/ProductFavorite';
import PropTypes from 'prop-types';

Favorites.propTypes = {
    name: PropTypes.string,
    allFavorites: PropTypes.object
}

export default function Favorites() {
    const { name, allFavorites } = useStoreState(state => ({
        name: state.authReducer.cases.user.name,
        allFavorites: state.productReducer.cases.allFavorites
    }));

    return (
        <Fragment>
            {(name !== null) ?
                <div>
                    <Title title={`Seus Favaritos, ${name}`} /> :
                    { (allFavorites.length >= 1) ?
                    <div className="py-2">
                        <div className="container">
                            <div className="row">
                                {allFavorites.map(product => {
                                    console.log("productIDfavorites", product._id)
                                    return <ProductFavorite key={product._id} product={product} />
                                })}
                            </div>
                        </div>
                    </div> :
                        <div>
                            <EmptyContent text={"Sua Galeria está vazia..."} img={"img/illustrations/empty-content.png"} />
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <HashLink smooth to='/#inicio'>
                                    <Dark className="mt-5">
                                        Escolher seus favoritos
                                    </Dark>
                                </HashLink>
                            </div>
                        </div>
                    }
                </div> :
                <div>
                    <Title title={`Faça seu Acesso`} />
                    <h4
                        className="text-sub-title text-center"
                    >
                        {parse(`Você precisa de uma conta para acessar seus favoritos. <br/> Click já no ícone de usuário alí em cima`)}
                    </h4>
                </div>
            }
        </Fragment>
    );
}