import React, { Component } from 'react';
import ReactDOM from 'react';
import styled from 'styled-components';
// import $ from 'jquery';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { showMenu: false };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    // componentDidMount() {
    //     function toggle() {
    //         let elem = document.querySelector(".menu-toggle");
    //         elem.addEventListener('click', function() {
    //             elem.classList.toggle("active");
    //         })
    //     }
    //     toggle();
    // }
    toggleMenu = function() {
        this.setState({ showMenu: !this.state.showMenu });
    };

    render() {
        return (
            <React.Fragment>
                <HeaderWrapper>
                    <div className="logo">BABADOO</div>

                    {this.state.showMenu && (
                        <nav className="toolbar_navigation-items">
                            <ul>
                                <li>
                                    <a href="#" className="active">
                                        buscar
                                    </a>
                                </li>
                                <li>
                                    <a href="#">mapa da loja</a>
                                </li>
                                <li>
                                    <a href="#">favoritos</a>
                                </li>
                                <li>
                                    <a href="#">carrinho</a>
                                </li>
                                <li>
                                    <a href="#">login</a>
                                </li>
                            </ul>
                        </nav>
                    )}
                    <div className="menu-toggle" onClick={this.props.toggleMenu}>
                        <i class="fa fa-bars" aria-hidden="true"></i>
                    </div>
                </HeaderWrapper>
            </React.Fragment>
        );
    }
}

const HeaderWrapper = styled.header`
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 100px;
    background: #262626;
    width: 100%;
    box-sizing: border-box;

    & .logo {
        color: #fff;
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        float: left;
        font-weight: bold;
    }

    & nav {
        float: right;
    }

    & nav ul {
        display: flex;
        margin: 0;
        padding: 0;
    }

    & nav ul li {
        list-style: none;
    }

    & nav ul li a {
        display: block;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        color: #fff;
        text-decoration: none !important;
    }

    & nav ul li a:hover,
    & nav ul li a.active {
        color: #fff !important;
        background: #2196f3 !important;
    }

    .menu-toggle {
        display: block;
        color: #fff;
        float: right;
        line-height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
    }

    @media (max-width: 991px) {
        padding: 0 20px;

        .menu-toggle {
            display: block;
        }

        & nav {
            display: block;
            position: absolute;
            width: 100%;
            height: calc(100vh - 50px);
            background: #333;
            top: 50px;
            left: 0;
            transition: 0.5s;
        }
        & nav ul {
            display: block;
            text-align: center;
        }
        & nav ul li a {
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
    }
`;
