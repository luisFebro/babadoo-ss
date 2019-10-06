import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { bizWhatsapp } from '../../../data/dataBiz';

export default function MenuLogin() {
        const { isUserLoggedIn, name, picture, isAuthenticated } = useStoreState(state => ({
            isAuthenticated: state.authReducer.cases.isAuthenticated,
            isUserLoggedIn: state.dataLogin.isUserLoggedIn,
            name: state.dataLogin.name,
            name2: state.authReducer.cases.user,
            picture: state.dataLogin.picture,
        }));

        const closeMenuLogin = useStoreActions(actions => actions.dataLogin.closeMenuLogin);

        return (
        <Fragment>
            {(isUserLoggedIn || isAuthenticated) ?
                <DivWrapper id="mainNav" className="animated zoomIn slower" style={{ transition: '.5s' }}>
                    <nav className="navbar navbar-expand-sm px-sm-5 text-nav-items py-0 my-0">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/perfil" className="nav-link">
                                    {isUserLoggedIn ?
                                        <img
                                            className="profilePic nav-brand"
                                            src={picture}
                                            alt={name}
                                            title={name}
                                        >
                                        </img> :
                                        <img className="profilePic" src="img/icons/avatar-woman.png" alt="avatar babadoo"/>
                                    }
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mr-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    <p
                                        className="user-name-greeting"
                                    >
                                        {isUserLoggedIn ?
                                            `Olá, ${name}` :
                                            "Olá, Visitante!"
                                        }
                                    </p>
                                </Link>
                                <Link to="/">
                                    <p
                                        className="logout-btn badge badge-danger"
                                        onClick={closeMenuLogin}
                                        style={{cursor: 'pointer'}}
                                    >
                                        sair
                                    </p>
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-3">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    <span>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-3">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    <span>
                                        <i className="fas fa-shopping-bag"></i>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" style={{position: 'relative'}}>
                                    <i className="fab fa-whatsapp mr-2 pt-0"></i>
                                    <span>{ bizWhatsapp }</span>
                                    <span style={{position: "absolute", top: "0.1rem", right: "2rem"}}>Dúvidas?</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </DivWrapper> :
                    null
            }
        </Fragment>
    );
}

MenuLogin.propTypes = {
    isUserLoggedIn: PropTypes.bool,
    picture: PropTypes.string,
    name: PropTypes.string,
};

const DivWrapper = styled.div`
    background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
    max-height: 45px;
    line-height: 45px;

    i {
        font-size: 1.7rem;
    }

    p, nav, span, i {
        padding: 0;
        color: var(--mainWhite);
    }

    p, nav, span {
        font: normal 1rem 'Cabin', sans-serif;
    }

    .profilePic {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
    }

    .user-name-greeting {
        position: relative;
        font: normal 1rem 'Cabin', sans-serif;
        top: -.8rem;
    }

    .logout-btn {
        background: var(--mainDark);
        position: absolute;
        font: normal 1.1rem 'Cabin', sans-serif;
        top: -14px;
        right: 4px;
        padding: 0 3px;
    }

    .user-name-greeting p {
        font-size: .9rem;
    }

    & .nav-link:hover,
    & .navbar-nav span i:hover {
        transform: scale(1.1);
        filter: drop-shadow(0.001em 0.1em 0.1em var(--mainYellow));
    }

    /*MOBILE FIRST RESPONSIVE MEDIA QUERIES*/
    /*media portrait tablets and large phones || for large devices, use min-width: 992px and up*/
    @media only screen and (min-width: 600px) {
        .logout-btn {
            background: var(--mainRed);
            top: 4px;
            padding: 2px 4px;
        }
    }

`;