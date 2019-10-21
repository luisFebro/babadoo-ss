import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { logout } from '../../../redux/actions/authActions';
import { showSnackbarBlack } from '../../../redux/actions/snackbarActions';
import { showModalUnderConstruction } from '../../../redux/actions/modalActions';
// End Redux
// Utils
import isRealObj from '../../../utils/isRealObj';
import truncateWords from '../../../utils/truncateWords';
// End Utils
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { bizWhatsapp } from '../../../data/dataBiz';

MenuLogin.propTypes = {
    isUserAuthenticated: PropTypes.bool,
    picture: PropTypes.string,
    name: PropTypes.string,
    allFavProductsList: PropTypes.arrayOf(PropTypes.object),
};

export default function MenuLogin() {
        // Redux
        const { isUserAuthenticated, name, picture, allFavProductsList } = useStoreState(state => ({
            isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
            name: state.authReducer.cases.user.name,
            picture: state.authReducer.cases.user.picture,
            allFavProductsList: state.userReducer.cases.allFavProductsList
        }));
        const dispatch = useStoreDispatch();
        // End Redux
        const animateZoomOut = () => {
            //NOT WORKING
            const mainNav = document.querySelector('#mainNav');

            mainNav.classList.add('animated', 'zoomOut', 'slow');
            mainNav.style.animationDelay = '0s';
        }
        const changeCss = () => {
          const navElement = document.querySelector("#mainNav");
          if(isRealObj(navElement)) {
            if(window.scrollY > 50) {
              navElement.className += " shadow-elevation-soft";
            }
          }
        }

        useEffect(() => window.addEventListener('scroll', changeCss, true), []);

        return (
        <Fragment>
            {isUserAuthenticated ?
                <DivWrapper id="mainNav" className="animated zoomIn slower">
                    <nav className="navbar navbar-expand-sm px-sm-5 text-nav-items py-0 my-0">
                        <ul className="navbar-nav container-ul">
                            <li className="nav-item">
                                <Link to="/perfil" className="nav-link">
                                    {isUserAuthenticated ?
                                        picture ?
                                        <img
                                            className="profilePic nav-brand"
                                            src={picture}
                                            alt={name}
                                            title={name}
                                        /> : null
                                    : <img className="profilePic" src="img/icons/avatar-woman.png" alt="avatar babadoo"/>
                                    }
                                </Link>
                                <p
                                    className="user-name-greeting badge badge-warning"
                                >
                                    {name ?
                                        `Olá, ${truncateWords(name, 10)}` :
                                        "Olá, Visitante!"
                                    }
                                </p>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-3">
                            <li className="nav-item">
                                <Link to="/favoritos" className="nav-link">
                                    <span style={{ position: 'relative' }} >
                                        <i className="fas fa-heart animated bounce slow">
                                            <span  style={{ position: 'absolute', top: '-.5em', left: '1.6em', marginLeft: '.01em', padding: '.9px 3px' }} className="badge badge-danger">
                                                {!allFavProductsList.length ? null : allFavProductsList.length }
                                            </span>
                                        </i>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-3">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" onClick={() => showModalUnderConstruction(dispatch)}>
                                    <span>
                                        <i className="fas fa-bell animated bounce slow"></i>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" style={{position: 'relative'}}>
                                    <i className="fab fa-whatsapp mr-2 pt-0"></i>
                                    <span>{ bizWhatsapp }</span>
                                    <span style={{position: "absolute", top: "0.1rem", right: "2.7rem"}}>Dúvidas?</span>
                                </Link>
                                <button
                                    style={{cursor: 'pointer', padding: '0 4px', border: 'none'}}
                                    className="logout-btn badge badge-danger"
                                    onClick={() => {
                                        animateZoomOut();
                                        logout(dispatch);
                                    }}
                                >
                                    sair
                                </button>
                            </li>
                        </ul>
                    </nav>
                </DivWrapper> :
                    null
            }
        </Fragment>
    );
}

const DivWrapper = styled.div`
    background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
    max-height: 45px;
    line-height: 45px;

    i {
        font-size: 2.5rem;
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

    .container-ui {
        position: relative;
    }

    .user-name-greeting {
        color: var(--mainDark);
        padding: 0 3px;
        position: absolute;
        font: normal 1rem 'Cabin', sans-serif;
        top: 3rem;
    }

    .logout-btn {
        background: var(--mainRed);
        position: absolute;
        font: normal 1rem 'Cabin', sans-serif;
        top: 1px;
        right: 4px;
        padding: 0 3px;
    }

    & .nav-link:hover,
    & .navbar-nav span i:hover {
        transform: scale(1.1);
        filter: drop-shadow(0.001em 0.1em 0.1em var(--mainRed));
    }

    /*MOBILE FIRST RESPONSIVE MEDIA QUERIES*/
    /*media portrait tablets and large phones || for large devices, use min-width: 992px and up*/
    @media only screen and (min-width: 600px) {
        .logout-btn {
            top: 4px;
            font: normal 1.2rem 'Cabin', sans-serif;
            padding: 5px 8px;
        }
        i {
            font-size: 1.9rem;
        }
        .user-name-greeting {
            font: normal 1.1rem 'Cabin', sans-serif;
            padding: 2px 5px;
            top: 2.8rem;
        }
    }

`;