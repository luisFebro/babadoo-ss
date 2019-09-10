import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { ButtonContainerPressedEffectYellow } from './Button';

export default class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5 text-nav-items">
                <Link to='/'>
                    <img src="img/babadoo-logo_no-slogon.png" alt="store" width="70px" height="70px" className="navbar-brand"/>
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">categorias</Link>
                    </li>
                </ul>
               <ul className="navbar-nav ml-auto">
                   <li className="nav-item mr-3 align-items-center">
                       <Link to="/" className="nav-link">
                        <span style={{width: '25px', height: '25px'}}>
                            <i className="fas fa-heart"></i>
                        </span>
                       </Link>
                   </li>
               </ul>
               <ul className="navbar-nav mr-3 align-items-center">
                   <li className="nav-item">
                       <Link to="/" className="nav-link">
                        <span>
                            <i className="fas fa-user-friends"></i>
                        </span>
                       </Link>
                   </li>
               </ul>
               <Link to="/seu-carrinho" className="ml-2 fixed-bottom m-3">
                   <ButtonContainerPressedEffectYellow className="animated tada slower" style={{position: 'relative', zIndex: 150, animationDelay: "10s", animationIterationCount: 2}} >
                        <span>
                           <i className="fas fa-cart-plus p-2"> </i>
                        </span>
                   </ButtonContainerPressedEffectYellow>
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

