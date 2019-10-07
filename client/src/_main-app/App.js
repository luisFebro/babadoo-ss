import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import UserProvider from '../data/contexts/UserProvider';
//GENERAL COMPONENTS
import { CustomPreloader } from 'react-preloaders';
// import StoreMap from '../components/StoreMap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
//END GENERAL COMPONENTS
//GENERAL PAGES
import Preloader from '../pages/Preloader';
import Store from '../pages/store';
import Cart from '../pages/cart/Cart';
// import Client from '../pages/Client';
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
//LAYOUT
// import MenuTopLogin from '../components/layout/navbar/MenuTopLogin';
import Navbar from '../components/layout/navbar/Navbar';
import CategorySlider from '../components/layout/CategorySlider';
import Footer from '../components/layout/footer/Footer';
// END LAYOUT
// MODALS
import Modal from '../components/modals/Modal';
import ModalFavorite from '../components/modals/ModalFavorite';
import UnderConstruction from '../components/modals/UnderConstruction';
//> auth
import ModalLogin from '../components/modals/ModalLogin';
import ModalRegister from '../components/modals/ModalRegister';
// END MODALS
// SNACKBARS
import SnackbarBlack from '../components/snackbars/SnackbarBlack';
import SuccessSnackbar from '../components/snackbars/SuccessSnackbar';
// END SNACKBARS
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
                <Route exact path="/" render={(props) => (<Home />)} /> {/*This will be routed first, exact make sure only Home content is displayed render based on https://github.com/luisFebro/react_crash_todo/blob/master/src/App.js*/}
                <Route path="/lingeries" component={Lingerie} />
                <Route path="/cosmeticos" component={Cosmetic} />
                <Route path="/comestiveis" component={Edible} />
                {/*End Categories Pages*/}
                <Route path="/loja" component={Store} />
                <Route path="/detalhes-do-produto" component={Details} />
                <Route path="/seu-carrinho" component={Cart} />
                <Route path="/finalizar-compra" component={CheckoutLocal} />
                <UserProvider>
                    {/*<Route path="/cliente" component={Client}/>*/}
                </UserProvider>
                <Route component={Default} />
            </Switch>
            {/*Modals*/}
            <Modal />
            <ModalFavorite />
            <UnderConstruction />
            <ModalLogin />
            <ModalRegister />
            {/*End Modals*/}
            {/*Snackbars*/}
            <SnackbarBlack />
            <SuccessSnackbar />
            {/*End Snackbars*/}
            <Footer />
            <WhatsappIcon />
            <CustomPreloader>
                <Preloader />
            </CustomPreloader>
        </React.Fragment>
    );
}
