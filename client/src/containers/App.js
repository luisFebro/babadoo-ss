import React from 'react';
import { Switch, Route } from
'react-router-dom';
import './App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategorySlider from '../components/carousels/CategorySlider';
import WhatsappIcon from "../components/WhatsappIcon";
//GENERAL COMPONENTS
import { CustomPreloader } from 'react-preloaders';
import StoreMap from '../components/StoreMap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "animate.css/animate.min.css";
//END GENERAL COMPONENTS
//GENERAL PAGES
import Cart from '../components/cart/Cart';
import FormNodeMailer from '../components/FormNodeMailer';
import Details from '../components/Details';
import Preloader from '../components/Preloader';
import Default from '../components/Default';
//END GENERAL PAGES
//CATEGORY PAGES
import ProductList from '../components/ProductList';
import Lingerie from '../components/category-pages/Lingerie';
import Cosmetic from '../components/category-pages/Cosmetic';
import Edible from '../components/category-pages/Edible';
//END CATEGORY PAGES
// MODALS
import Modal from '../components/modals/Modal';
import ModalFavorite from '../components/modals/ModalFavorite';
import UnderConstruction from '../components/modals/UnderConstruction';
// END MODALS
// import TestSemantic from '../components/TestSemantic';
export default function App() {
    return (
        <React.Fragment>
            {/*<TestSemantic />*/}
            <Navbar />
            <CategorySlider />
            <Switch>
                {/*Categories Pages*/}
                <Route exact path="/" component={ProductList} /> {/*This will be routed first*/}
                <Route path="/lingeries" component={Lingerie} />
                <Route path="/cosmeticos" component={Cosmetic} />
                <Route path="/comestiveis" component={Edible} />
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
            <CustomPreloader>
                <Preloader />
            </CustomPreloader>
        </React.Fragment>
    );
}
