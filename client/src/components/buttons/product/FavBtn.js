import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
// Redux
import { showSnackbar } from '../../../redux/actions/snackbarActions';
import { showModalRegister } from '../../../redux/actions/modalActions';
import { addElemArrayUser, removeElemArrayUser } from '../../../redux/actions/userActions';

FavBtn.propTypes = {
    isFav: PropTypes.bool,
    isActivated: PropTypes.bool,
    showSkeleton: PropTypes.bool,
    productId: PropTypes.string,
}

export default function FavBtn({ productId, isFav, isActivated = true, showSkeleton }) {
    const [toggle, setToggle] = useState(false);

    const { isUserAuthenticated, _idUser } = useStoreState(state => ({
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
        _idUser: state.userReducer.cases.currentUser['_id']
    }));
    const dispatch = useStoreDispatch();

    const toggleFav = () => {
        setToggle(!toggle);
    };

    const showFavBtn = isActivated => {
        const bodyFavorite = {
            userId: _idUser,
            changeField: { favoriteList: productId }
        }
        const handleFavOn = () => (
            <Fragment>
                {showSkeleton
                ? <Skeleton variant="circle" width={30} height={30} />
                : (
                    <i
                        className="filledHeart fas fa-heart animated heartBeat fast"
                        onClick={() => {
                            removeElemArrayUser(dispatch, bodyFavorite);
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
                        addElemArrayUser(dispatch, bodyFavorite);
                        showSnackbar(dispatch, 'Adicionado aos Seus Favoritos', 'success');
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