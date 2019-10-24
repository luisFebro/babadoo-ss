import React, { useState } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
// import { addFieldUser, deleteFieldUser } from '../../../redux/actions/userActions';
import { findAnItem } from '../../../redux/actions/globalActions';
import { showModalConfTitle, showModalConfYesNo } from '../../../redux/actions/modalActions';
// import ModalChangeTitle from '../../../components/modals/confirmation/ModalChangeTitle';
// End Redux
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import truncateWords from '../../../utils/truncateWords'
import DeleteButton from '../../../components/buttons/DeleteButton';
import EditButton from '../../../components/buttons/EditButton';


EditableProduct.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string,
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
};

export default function EditableProduct({ product, isFav }) {
    const [isFavChanged, setIsFavChanged] = useState(false);
    // const [isAddedAsFav, setIsAddedAsFav] = useState(isFav);

    const { allProductsList, isUserAuthenticated, _idUser, modalConfProps } = useStoreState(state => ({
        allProductsList: state.productReducer.cases.allProductsList,
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
        _idUser: state.userReducer.cases.currentUpdatedUser["_id"],
        modalConfProps: state.modalReducers.cases.modalConfProps
    }));
    const dispatch = useStoreDispatch();
    // console.log("isAuth", isUserAuthenticated); //Check this behavior: auth is running multiple 11 times
    const toggleFav = () => {
        setIsFavChanged(!isFavChanged);
    }
    const { _id, title, image, price, inCart } = product;

    return (
        <ProductWrapper className="col-6 col-md-4 col-lg-3 mx-auto my-2">
            <div className="card">
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
                        // onClick={() => toggleFav()}
                    >
                        {isUserAuthenticated ? (
                            (isFavChanged || isFav) ? (
                                <i
                                    className="filledHeart fas fa-heart animated heartBeat fast"
                                    onClick = {() => {
                                        /*deleteFieldUser(dispatch, bodyFavorite, _idUser);
                                        showSnackbarBlack(dispatch, "Removido dos seus favoritos!");*/
                                    }}
                                    style={{
                                        animationIterationCount: 3
                                    }}
                                ></i>
                                ) : (
                                    <i
                                        className="emptyHeart far fa-heart"
                                        onClick={() => {
                                            /*addFieldUser(dispatch, bodyFavorite, _idUser);
                                            showSnackbarBlack(dispatch, "Adicionado aos seus favoritos!")*/
                                            // value.openModalFavorite(_id);
                                        }}
                                    ></i>
                                )
                            ) : (
                                <i
                                    className="emptyHeart far fa-heart"
                                    onClick={() => {
                                        /*showModalRegister(dispatch);
                                        showSnackbarBlack(dispatch, "Faça seu acesso para adicionar aos favoritos!")*/
                                    }}
                                ></i>
                            )
                        }
                    </button>
                </div>
                {/*card footer*/}
                <div className="text-product-title p-1 card-footer d-flex flex-column text-center justify-content-between">
                    <p
                        style={{position: 'relative', height: '4em', overflow: 'hidden' }}
                        className="mb-0 text-capitalize"
                    >
                        {truncateWords(title, 40)}
                        <EditButton top={1} left={-5} onClick={() => {
                            const attachedObj = {
                                mainSubject: "Título",
                                nameForm: "title",
                                typeForm: "text"
                            }
                            findAnItem(dispatch, allProductsList, _id, attachedObj);
                            showModalConfTitle(dispatch);
                        }} />
                    </p>
                    <h5
                        style={{position: 'relative'}}
                        className="mt-2 text-right mb-2 mr-2"
                    >
                        <span>R$</span>
                        {price}
                        <EditButton top={-48} left={100} onClick={() => {
                            const attachedObj = {
                                mainSubject: "Preço",
                                nameForm: "price",
                                typeForm: "number"
                            }
                            findAnItem(dispatch, allProductsList, _id, attachedObj);
                            showModalConfTitle(dispatch);
                        }} />
                    </h5>
                </div>
                <DeleteButton
                    top={-20}
                    left={50}
                    onClick={() => {
                        const attachedObj = {
                            action: {
                                noun: "Exclusão",
                                verb: "Excluir"
                            },
                            mainSubject: "Produto",
                        }
                        findAnItem(dispatch, allProductsList, _id, attachedObj);
                        showModalConfYesNo(dispatch);
                        // let container = document.querySelector(`div[key="${_id}"]`);
                        // container.classList.add("animated", "hinge", "slower")

                    }}
                />
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
