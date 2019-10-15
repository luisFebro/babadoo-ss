import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import { useStoreDispatch } from 'easy-peasy';
import { loadUser } from '../redux/actions/authActions';
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
import Favorites from '../pages/favorites';
import Dashboard from '../pages/dashboard-admin';
//>>>Category pages
import Home from '../pages/Home';
import Lingerie from '../pages/category-pages/Lingerie';
import Cosmetic from '../pages/category-pages/Cosmetic';
import Edible from '../pages/category-pages/Edible';
//>>>End category pages
//END GENERAL PAGES
//LAYOUT
// import MenuTopLogin from '../components/_layout/navbar/MenuTopLogin';
import Navbar from '../components/_layout/navbar/Navbar';
import CategorySlider from '../components/_layout/CategorySlider';
import Footer from '../components/_layout/footer/Footer';
// END LAYOUT
// MODALS ANS TOASTS
import AllModals from '../components/modals';
import AllSnackbars from '../components/snackbars';
// END MODALS ANS TOASTS

// BUTTONS
import WhatsappIcon from '../components/buttons/WhatsappIcon';
// END BUTTONS
export default function App() {
    const dispatch = useStoreDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    return (
        <BrowserRouter>
            <ScrollToTop>
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
                    <Route path="/favoritos" component={Favorites} />
                    <Route path="/painel-controle-admin" component={Dashboard} />
                    <Route component={Default} />
                    {/*<Redirect from="*" to="/" />*/}
                </Switch>
                {/*Modals and Snackbars*/}
                <AllModals />
                <AllSnackbars />
                {/*End Modals and Snackbars*/}
                <Footer />
                <WhatsappIcon />
                <CustomPreloader>
                    <Preloader />
                </CustomPreloader>
            </ScrollToTop>
        </BrowserRouter>
    );
}
