import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import SearchCompleteWithImg from './SearchCompleteWithImg';
import { ProductConsumer } from '../context';

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isSearchOpen: false,
        }
    }
    addZoomout() {
        const icon = document.getElementById("searchIcon");

        icon.className += " animated zoomOut slow";
        this.setState({isSearchOpen: true});
    }

    closeBtn() {
        const icon = document.getElementById("searchIcon"),
              closeBtn = document.getElementById("closeBtn");
              // searchComplete = document.getElementById("SearchCompleteWithImg");

        closeBtn.className = "fas fa-times-circle animated rotateOut";
        // searchComplete.className = "animated zoomOut delay-2s";
        icon.className = "fas fa-search animated zoomIn slow"
        this.setState({isSearchOpen: false});
    }
    render() {
        return (
            <ProductConsumer>
                {value => {
                    const { isSearchOpen } = this.state
                    return(
                        <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5 text-nav-items">
                            <Link to='/'>
                                <img src="img/babadoo-logo_no-slogon.png" alt="store" width="70px" height="70px" className="navbar-brand"/>
                            </Link>
                            <ul className="navbar-nav align-items-center" onClick={value.openModalOnly}>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">categorias</Link>
                                </li>
                            </ul>
                           <ul className="navbar-nav ml-auto">
                               <li className="nav-item mr-4 align-items-center" onClick={value.openModalOnly}>
                                   <Link to="/" className="nav-link">
                                    <span>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                   </Link>
                               </li>
                           </ul>
                           <ul className="navbar-nav mr-4 align-items-center" onClick={value.openModalOnly}>
                               <li className="nav-item">
                                   <Link to="/" className="nav-link">
                                    <span>
                                        <i className="fas fa-user-friends"></i>
                                    </span>
                                   </Link>
                               </li>
                           </ul>
                           <ul className="navbar-nav fixed">
                               <li className="nav-item">
                                   <Link to="/" className="nav-link">
                                    <span>
                                        <i
                                            id="searchIcon"
                                            style={{fontSize: "2.1rem"}}
                                            className="fas fa-search" onClick={() => this.addZoomout()}></i>
                                    </span>
                                   </Link>
                               </li>
                           </ul>
                           {isSearchOpen ?
                            (<div>
                                <SearchCompleteWithImg
                                    style={{transition: ".5s"}}
                                    className="animated zoomIn" />
                                <span>
                                    <i
                                        id="closeBtn"
                                        className="fas fa-times-circle animated rotateIn delay-3s"
                                        onClick={() => this.closeBtn()}
                                    >
                                    </i>
                                </span>
                            </div>) :
                            null}

                        </NavWrapper>
                    );
                }}
            </ProductConsumer>

        );
    }
}

// STYLES
const NavWrapper = styled.nav`
    #closeBtn {
        position: fixed;
        cursor: pointer;
        font-size: 1.7em;
        top: 5rem;
        right: 5%;
        color: var(--mainWhite);
        z-index: 999;
        filter: drop-shadow(.001em .1em .1em var(--mainDark));

    }
    & .fixed {
        position: fixed;
        right: 1rem;
        top: 1.5rem;
    }
    & .navbar-nav span i {
        font-size: 1.9rem;
        filter: drop-shadow(.001em .1em .1em var(--mainDark));
    }
    background: var(--mainRed);
    .nav-link {
        color: var(--mainWhite) !important;
        text-transform: capitalize;
    }

    & .nav-link:hover, & .navbar-nav span i:hover  {
        transform: scale(1.1);
        filter: drop-shadow(.001em .1em .1em var(--mainYellow));
    }
`;

