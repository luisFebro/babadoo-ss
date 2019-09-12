import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { ProductConsumer } from '../context';

export default class Navbar extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
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
                               <li className="nav-item mr-3 align-items-center" onClick={value.openModalOnly}>
                                   <Link to="/" className="nav-link">
                                    <span>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                   </Link>
                               </li>
                           </ul>
                           <ul className="navbar-nav mr-3 align-items-center" onClick={value.openModalOnly}>
                               <li className="nav-item">
                                   <Link to="/" className="nav-link">
                                    <span>
                                        <i className="fas fa-user-friends"></i>
                                    </span>
                                   </Link>
                               </li>
                           </ul>
                           <ul className="navbar-nav">
                               <li className="nav-item mr-1 align-items-center" onClick={value.openModalOnly}>
                                   <Link to="/" className="nav-link">
                                    <span>
                                        <i className="fas fa-search"></i>
                                    </span>
                                   </Link>
                               </li>
                           </ul>
                        </NavWrapper>
                    );
                }}
            </ProductConsumer>

        );
    }
}

// STYLES
const NavWrapper = styled.nav`
    .navbar-nav span i {
        font-size: 1.9rem;
    }
    background: var(--mainRed);
    .nav-link {
        color: var(--mainWhite) !important;
        text-transform: capitalize;
    }
`;

