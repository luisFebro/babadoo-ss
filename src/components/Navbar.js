import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Search_completeWithImg from './Search_completeWithImg';
import { ButtonContainer_pressedEffectYellow } from './Button';

export default class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5 text-nav-items">
                <Link to='/'>
                    <img src="img/babadoo-logo_no-slogon.png" alt="store" width="70px" height="70px" className="navbar-brand"/>
                </Link>
               <ul className="navbar-nav align-items-center">
                   <li className="nav-item ml-5">
                       <Search_completeWithImg />
                   </li>
               </ul>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                        <Link to="/" className="nav-link">categorias</Link>
                    </li>
                </ul>
               <ul className="navbar-nav align-items-center ml-auto">
                   <li className="nav-item ml-3">
                       <Link to="/about" className="nav-link">favorite</Link>
                   </li>
               </ul>
               <Link to="/cart" className="">
                   <ButtonContainer_pressedEffectYellow className="ml-3 mr-2 text-capitalize">
                        <span>
                           <i className="fas fa-cart-plus"></i>
                        </span>
                       my cart
                   </ButtonContainer_pressedEffectYellow>
               </Link>

            </NavWrapper>
        );
    }
}

// STYLES
const NavWrapper = styled.nav`
    background: var(--mainRed);
    .nav-link {
        color: var(--mainWhite) !important;
        text-transform: capitalize;
    }
`;

