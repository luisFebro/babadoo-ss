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
import Modal from '../components/Modal';
import UnderConstruction from '../components/UnderConstruction';
import WhatsappIcon from "../components/WhatsappIcon";
import Footer from '../components/Footer';
// import SearchCompleteWithImg from '../components/SearchCompleteWithImg'
import FormNodeMailer from '../components/FormNodeMailer';

export default function App() {
    return (
        <React.Fragment>
            <Navbar />
            {/*<SearchCompleteWithImg />*/}
            <Switch>
                <Route exact path="/" component={ProductList} /> {/*This will be routed first*/}
                <Route path ="/detalhes-do-produto" component={Details} />
                <Route path="/seu-carrinho" component={Cart} />
                <Route path="/finalizar-compra" component={FormNodeMailer} />
                <Route component={Default} />
            </Switch>
            <Modal />
            <UnderConstruction />
            <Footer />
            <WhatsappIcon />
        </React.Fragment>
    );
}
