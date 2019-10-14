import React, { useState } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { addFavorite, removeFavorite } from '../../redux/actions/productActions';
import { showSnackbarBlack } from '../../redux/actions/snackbarActions';
import { toggleModalRegister } from '../../redux/actions/modalActions';
// End Redux
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../../data/contexts/mainContext';
import PropTypes from 'prop-types';
import truncateWords from '../../utils/truncateWords'

ProductFavorite.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string,
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
};

export default function ProductFavorite({ product }) {
    const [isFavChanged, setIsFavChanged] = useState(false);

    const { allProductsList, isUserAuthenticated } = useStoreState(state => ({
        allProductsList: state.productReducer.cases.allProductsList,
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated
    }));
    const dispatch = useStoreDispatch();
    // console.log("isAuth", isUserAuthenticated); //Check this behavior: auth is running multiple 11 times
    const toggleFav = () => {
        setIsFavChanged(!isFavChanged);
    }
    const { _id, title, image, price, inCart, isAddedToFav } = product;
    // const { isFav } = this.state;
    return (
        <ProductWrapper className="col-6 col-md-4 col-lg-3 mx-auto my-2">
            <div className="card">
                <ProductConsumer>
                    {value => (
                        <div
                            className="img-container p-1 p-sm-3"
                            onClick={() => {
                                console.log("value.handleDetail(_id)");
                            }}
                        >
                            <Link to="/detalhes-do-produto">
                                <img className="card-img-top" src={image} alt="product" />
                            </Link>
                            <button
                                className="cart-fav"
                                onClick={() => toggleFav()}
                            >
                                {isUserAuthenticated ? (
                                    !isFavChanged ? ( //starting with filledHeart product cart
                                        <i
                                            className="filledHeart fas fa-heart animated heartBeat fast"
                                            onClick = {() => {
                                                removeFavorite(dispatch, allProductsList, _id)
                                                showSnackbarBlack(dispatch, "Removido dos seus favoritos!")
                                            }}
                                            style={{
                                                animationIterationCount: 3
                                            }}
                                        ></i>
                                        ) : (
                                            <i
                                                className="emptyHeart far fa-heart"
                                                onClick={() => {
                                                    addFavorite(dispatch, allProductsList, _id);
                                                    showSnackbarBlack(dispatch, "Adicionado aos seus favoritos!")
                                                    // value.openModalFavorite(_id);
                                                }}
                                            ></i>
                                        )
                                    ) : (
                                        <i
                                            className="emptyHeart far fa-heart"
                                            onClick={() => {
                                                toggleModalRegister(dispatch);
                                                showSnackbarBlack(dispatch, "Faça seu acesso para adicionar aos favoritos!")
                                                // value.openModalFavorite(_id);
                                            }}
                                        ></i>
                                    )
                                }
                            </button>
                            <button
                                className="cart-btn"
                                disabled={inCart ? true : false}
                                onClick={() => {
                                    // value.addToCart(_id);
                                    // value.openModal(_id);
                                }}
                            >
                                {inCart ? (
                                    <p className="text-capitalize mb-0" disabled>
                                        {' '}
                                        No carrinho
                                    </p>
                                ) : (
                                    <i className="fas fa-cart-plus"></i>
                                )}
                            </button>
                        </div>
                    )}
                </ProductConsumer>
                {/*card footer*/}
                <div className="text-product-title p-1 card-footer d-flex flex-column text-center justify-content-between">
                    <p style={{ height: '4em', overflow: 'hidden' }} className="mb-0 text-capitalize">
                        {truncateWords(title, 40)}
                    </p>
                    <h5 className="mt-2 text-right mb-2 mr-2">
                        <span>R$</span>
                        {price}
                    </h5>
                </div>
            </div>
        </ProductWrapper>
    );

}


const ProductWrapper = styled.div`
    .card {
        box-shadow: 0 19px 38px rgba(0,0,0,0.20), 0 15px 12px rgba(0,0,0,0.12);
        border-color: transparent;
        transition: all 1s linear;
    }
    .card-footer {
        background: transparent;
        border-top: transparent;
        transition: all 1s linear;
    }
    &:hover {
        .card{
            box-shadow: 0 19px 38px rgba(0,0,0,0.40), 0 15px 12px rgba(250,0,0,0.32)
            border: .04rem solid rgba(0, 0, 0, .2);
        }
        .card-footer {
            background: rgba(247, 247, 247);
        }
    }

    .img-container {
        position: relative;
        overflow: hidden; //This is essencial for handle bigger pics
    }

    .card-img-top {
        transition: all .6s linear;
    }

    .img-container:hover .card-img-top {
        transform: scale(1.2);
    }

    .cart-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: .2rem .4rem;
        background: var(--mainYellow);
        border: none;
        color: var(--mainWhite);
        font-size: 1.4rem;
        border-radius: .5rem 0 0 0;
        transform: translate(0, 0); /*translate(100%, 100%)*/
        transition: all 1s linear;
    }

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

    .cart-btn:hover {
        color: var(--mainBlue);
        cursor: pointer;
    }

    .cart-btn:focus, .cart-fav:focus {
        outline: none;
    }

    .img-container:hover .cart-btn {
        transform: translate(0, 0);
    }
`;
