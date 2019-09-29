import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchCompleteWithImg from '../../SearchCompleteWithImg';
import { ProductConsumer } from '../../../data/contexts/mainContext';
import UserDropDown from './UserDropDown';

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isSearchOpen: false
        };
    }

    addZoomout() {
        const icon = document.getElementById('searchIcon');

        icon.className += ' animated zoomOut slow';
        setTimeout(() => {
            this.setState({ isSearchOpen: true });
        }, 1000);
    }

    closeBtn() {
        const icon = document.getElementById('searchIcon'),
            closeBtn = document.getElementById('closeBtn');
        // searchComplete = document.getElementById("SearchCompleteWithImg");

        closeBtn.className = 'fas fa-times-circle animated rotateOut';
        // searchComplete.className = "animated zoomOut delay-2s";
        icon.className = 'fas fa-search animated zoomIn slow';
        setTimeout(() => {
            this.setState({ isSearchOpen: false });
        }, 1000);
    }
    render() {
        return (
            <ProductConsumer>
                {value => {
                    const { isSearchOpen } = this.state;
                    return (
                        <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5 text-nav-items">
                            <Link to="/">
                                <img
                                    src="img/babadoo-logo_no-slogon.png"
                                    alt="store"
                                    width="70px"
                                    height="70px"
                                    className="navbar-brand"
                                />
                            </Link>
                            <ul className="navbar-nav align-items-center">
                                <li className="nav-item">
                                    <Link to="/loja" className="nav-link text-nav-items">
                                        loja
                                    </Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-3 ml-md-auto">
                                <li className="nav-item mr-2 pt-2 align-items-center" onClick={value.openModalOnly}>
                                    <Link to="/" className="nav-link">
                                        <span>
                                            <i className="fas fa-heart"></i>
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav mr-5 align-items-center">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        <span>
                                            <UserDropDown />
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                            <div className="fixed z-index-top">
                                <span>
                                    <i id="searchIcon" className="fas fa-search" onClick={() => this.addZoomout()}></i>
                                </span>
                            </div>
                            {isSearchOpen ? (
                                <div className="backdrop-medium">
                                    <SearchCompleteWithImg style={{ transition: '.5s' }} className="animated zoomIn" />
                                    <span>
                                        <i
                                            id="closeBtn"
                                            className="fas fa-times-circle animated rotateIn delay-3s"
                                            onClick={() => this.closeBtn()}
                                        ></i>
                                    </span>
                                </div>
                            ) : null}
                        </NavWrapper>
                    );
                }}
            </ProductConsumer>
        );
    }
}

// STYLES
const NavWrapper = styled.nav`
    #searchIcon {
        cursor: pointer;
        z-index: 1200;
    }
    #closeBtn {
        position: fixed;
        cursor: pointer;
        font-size: 1.7em;
        top: 5rem;
        right: 5%;
        color: var(--mainWhite);
        z-index: 999;
        filter: drop-shadow(0.001em 0.1em 0.1em var(--mainDark));
    }
    & .fixed {
        position: fixed;
        right: 1.2rem;
        top: 1.9rem;
    }
    & .navbar-nav span i,
    #searchIcon {
        font-size: 2.1rem;
        filter: drop-shadow(0.001em 0.1em 0.1em var(--mainDark));
    }
    background: var(--mainRed);
    .nav-link,
    #searchIcon {
        color: var(--mainWhite) !important;
        text-transform: capitalize;
    }

    & .nav-link:hover,
    & .navbar-nav span i:hover,
    #searchIcon:hover {
        transform: scale(1.1);
        filter: drop-shadow(0.001em 0.1em 0.1em var(--mainYellow));
    }
`;
