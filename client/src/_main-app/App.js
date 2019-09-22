import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import CategorySlider from '../components/carousels/CategorySlider';
import UserProvider from '../data/contexts/UserProvider';
import history from '../history';
//GENERAL COMPONENTS
import { CustomPreloader } from 'react-preloaders';
// import StoreMap from '../components/StoreMap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
//END GENERAL COMPONENTS
//GENERAL PAGES
import Preloader from '../pages/Preloader';
import Cart from '../pages/cart/Cart';
import Client from '../pages/Client';
import CheckoutLocal from '../pages/checkout/CheckoutLocal';
import Details from '../pages/Details';
import Default from '../pages/Default';
//>>>Category pages
import Home from '../pages/Home';
import Lingerie from '../pages/category-pages/Lingerie';
import Cosmetic from '../pages/category-pages/Cosmetic';
import Edible from '../pages/category-pages/Edible';
//>>>End category pages
//END GENERAL PAGES
//CONTAINER COMPONENTS
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
// END CONTAINER COMPONENTS
// MODALS
import Modal from '../components/modals/Modal';
import ModalFavorite from '../components/modals/ModalFavorite';
import UnderConstruction from '../components/modals/UnderConstruction';
// END MODALS
// BUTTONS
import WhatsappIcon from '../components/buttons/WhatsappIcon';
// END BUTTONS
export default function App() {
    return (
        <React.Fragment>
            <Navbar />
            <CategorySlider />
            <Switch>
                {/*Categories Pages*/}
                <Route exact path="/" component={Home} /> {/*This will be routed first*/}
                <Route path="/lingeries" component={Lingerie} />
                <Route path="/cosmeticos" component={Cosmetic} />
                <Route path="/comestiveis" component={Edible} />
                {/*End Categories Pages*/}
                <Route path="/detalhes-do-produto" component={Details} />
                <Route path="/seu-carrinho" component={Cart} />
                <Route path="/finalizar-compra" component={CheckoutLocal} />
                <Route component={Default} />
            </Switch>
            <Router history={history}>
                <UserProvider>
                    <Route path="/cliente" component={Client}/>
                </UserProvider>
            </Router>
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
