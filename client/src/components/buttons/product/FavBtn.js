import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
// Redux
import { getItem } from '../../../redux/actions/productActions';
import { showSnackbar } from '../../../redux/actions/snackbarActions';
import { showModalRegister } from '../../../redux/actions/modalActions';
import { addFieldUser, deleteFieldUser } from '../../../redux/actions/userActions';

FavBtn.propTypes = {
    isFav: PropTypes.bool,
    isActivated: PropTypes.bool,
    showSkeleton: PropTypes.bool,
    productId: PropTypes.string,
}

export default function FavBtn({ isFav, isActivated = true, showSkeleton, productId }) {
    const [toggle, setToggle] = useState(false);

    const { allProductsList, isUserAuthenticated, _idUser } = useStoreState(state => ({
        allProductsList: state.productReducer.cases.allProductsList,
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
        _idUser: state.userReducer.cases.currentUser['_id']
    }));
    const dispatch = useStoreDispatch();

    const handleFieldToChange = (AllProds, productId) => {
        const obj = getItem(AllProds, productId);
        return { favoriteList: obj };
    };
    const bodyFavorite = handleFieldToChange(allProductsList, productId);

    const toggleFav = () => {
        setToggle(!toggle);
    };

    const showFavBtn = isActivated => {
        const handleFavOn = () => (
            <Fragment>
                {showSkeleton
                ? <Skeleton variant="circle" width={30} height={30} />
                : (
                    <i
                        className="filledHeart fas fa-heart animated heartBeat fast"
                        onClick={() => {
                            deleteFieldUser(dispatch, bodyFavorite, _idUser);
                            showSnackbar(dispatch, 'Removido dos seus favoritos!');
                        }}
                        style={{
                            animationIterationCount: 3
                        }}
                    ></i>
                )}
            </Fragment>
        );

        const handleFavOff = () => (
            <Fragment>
                {showSkeleton
                ? <Skeleton variant="circle" width={30} height={30} />
                : (
                    <i
                    className="emptyHeart far fa-heart"
                    onClick={() => {
                        addFieldUser(dispatch, bodyFavorite, _idUser);
                        showSnackbar(dispatch, 'Adicionado aos Seus Favoritos', 'success');
                        // value.openModalFavorite(_id);
                    }}
                    ></i>
                )}
            </Fragment>
        );

        const handleNoLoggedUser = () => (
            <i
                className="emptyHeart far fa-heart"
                onClick={() => {
                    showModalRegister(dispatch);
                    showSnackbar(
                        dispatch,
                        'Faça seu acesso para adicionar aos favoritos!'
                    );
                }}
            ></i>
        );

        return(
            isActivated &&
            <button className="cart-fav" onClick={() => toggleFav()}>
                {isUserAuthenticated ? (
                    (toggle || isFav)
                    ? handleFavOn()
                    : handleFavOff()
                ) : (
                    handleNoLoggedUser()
                )}
            </button>
        );
    };

    return (
        <FavWrapper>
            {showFavBtn(isActivated)}
        </FavWrapper>
    );
}

const FavWrapper = styled.div`
    .cart-fav {
        position: absolute;
        top: 10px;
        right: 10px;
        background: transparent;
        border: none;
    }

    .cart-fav i {
        color: var(--mainRed);
        font-size: 1.7rem;
        transition: .5s;
    }

    .cart-fav .emptyHeart {
        opacity: .3;
    }

    .cart-fav .filledHeart {
        opacity: 1;
        transform: scale(1.1);
    }

    .cart-fav .emptyHeart:hover {
        opacity: 1;
        transform: scale(1.1);
    }

`;