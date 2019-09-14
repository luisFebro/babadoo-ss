import React from 'react';
import {Switch, Route} from
'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import Details from '../components/Details';
import Cart from '../components/cart/Cart';
import Default from '../components/Default';
import FormNodeMailer from '../components/FormNodeMailer';
// MODALS
import Modal from '../components/modals/Modal';
import ModalFavorite from '../components/modals/ModalFavorite';
import UnderConstruction from '../components/modals/UnderConstruction';
//
import WhatsappIcon from "../components/WhatsappIcon";
import Footer from '../components/Footer';
// import TestSemantic from '../components/TestSemantic';

export default function App() {
    return (
        <React.Fragment>
            {/*<TestSemantic />*/}
            <Navbar />
            <Switch>
                <Route exact path="/" component={ProductList} /> {/*This will be routed first*/}
                <Route path ="/detalhes-do-produto" component={Details} />
                <Route path="/seu-carrinho" component={Cart} />
                <Route path="/finalizar-compra" component={FormNodeMailer} />
                <Route component={Default} />
            </Switch>
            <Modal />
            <ModalFavorite />
            <UnderConstruction />
            <Footer />
            <WhatsappIcon />
        </React.Fragment>
    );
}
