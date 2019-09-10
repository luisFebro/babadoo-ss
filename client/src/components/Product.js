import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from "../context";
import PropTypes from 'prop-types';

export default class Product extends Component {
    render() {
        const { id, title, image, price, inCart } = this.props.product;
        return (
            <ProductWrapper className="col-6 col-md-4 col-lg-3 mx-auto my-3">
                <div className="card">
                    <ProductConsumer>
                        {value => (
                            <div
                                className="img-container p-3"
                                onClick={()=> value.handleDetail(id)}
                            >
                                <Link to="/detalhes-do-produto">
                                    <img
                                        className="card-img-top"
                                        src={image}
                                        alt="product"
                                    />
                                </Link>
                                <button className="cart-fav" onClick={() => { value.openModalOnly() }}>
                                    <img src="img/icons/heart-no-fill.png" width="28px" height="28px" alt="heart icon no fill"/>
                                    {/*<i className="fas fa-heart"></i>*/}
                                </button>
                                <button
                                    className="cart-btn"
                                    disabled={inCart ? true : false}
                                    onClick={() => {
                                        value.addToCart(id);
                                        value.openModal(id);
                                    }}
                                >
                                    {inCart ?
                                        (<p
                                            className="text-capitalize mb-0"
                                            disabled>
                                            {" "}
                                            No carrinho
                                        </p>
                                        ) : (
                                            <i className="fas fa-cart-plus"></i>
                                        )
                                    }
                                </button>
                            </div>
                        )}
                    </ProductConsumer>
                    {/*card footer*/}
                    <div className="text-product-title p-1 card-footer d-flex flex-column text-center justify-content-between">
                        <p className="mb-0">
                            {title}
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
}

Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
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
        background: var(--lightBlue);
        border: none;
        color: var(--mainWhite);
        font-size: 1.4rem;
        border-radius: .5rem 0 0 0;
        transform: translate(100%, 100%);
        transition: all 1s linear;
    }

    .cart-fav {
        position: absolute;
        top: 10px;
        right: 10px;
        background: transparent;
        border: none;
    }

    .cart-fav img {
        color: var(--mainRed);
        opacity: .3;
        transition: .5s;
    }

    .cart-fav img:hover {
        opacity: 1;
        transform: scale(1.1);
    }

    fas .fa-heart {
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
