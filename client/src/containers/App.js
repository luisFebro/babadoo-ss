import React from 'react';
import { Switch, Route } from
'react-router-dom';
import './App.css';
// REACT SLICK CAROUSELS
import CenterMode from '../components/carousels/CategorySlider';
// END REACT SLICK CAROUSELS
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
//CATEGORY PAGES
import ProductList from '../components/ProductList';
import Lingeries from '../components/category-pages/Lingeries';
import Cosmetics from '../components/category-pages/Cosmetics';
import Edibles from '../components/category-pages/Edibles';
//END CATEGORY PAGES
import Details from '../components/Details';
import Cart from '../components/cart/Cart';
import Default from '../components/Default';
import FormNodeMailer from '../components/FormNodeMailer';
// MODALS
import Modal from '../components/modals/Modal';
import ModalFavorite from '../components/modals/ModalFavorite';
import UnderConstruction from '../components/modals/UnderConstruction';
// END MODALS
import WhatsappIcon from "../components/WhatsappIcon";
import Footer from '../components/Footer';
// import TestSemantic from '../components/TestSemantic';

export default function App() {
    return (
        <React.Fragment>
            {/*<TestSemantic />*/}
            <Navbar />
            <CenterMode />
            <Switch>
                {/*Categories Pages*/}
                <Route exact path="/" component={ProductList} /> {/*This will be routed first*/}
                <Route path="/lingeries" component={Lingeries} />
                <Route path="/cosmeticos" component={Cosmetics} />
                <Route path="/comestiveis" component={Edibles} />
                {/*End Categories Pages*/}
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
