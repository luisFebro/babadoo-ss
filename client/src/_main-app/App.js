import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { getUpdatedUsers, updateCurrentUser } from '../redux/actions/userActions';
import { readBizInfo } from '../redux/actions/businessInfoActions';
import { getUpdatedAdmin } from '../redux/actions/adminActions';
// End Redux
import { loadUser, tokenConfig } from '../redux/actions/authActions';
import './App.css';
import '../utils/globalHelpers';
import UserProvider from '../data/contexts/UserProvider';
//GENERAL COMPONENTS
import { CustomPreloader } from 'react-preloaders';
import AnimationBizPromo from '../components/AnimationBizPromo';
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
    const { isUserAuthenticated } = useStoreState(state => ({
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
    }));

    const dispatch = useStoreDispatch();

    useEffect(() => {
        readBizInfo(dispatch);
        getUpdatedUsers(dispatch);
        getUpdatedAdmin(dispatch);
        // CODE NOT WORKING n1
        dispatch(loadUser());
    }, []);
    // This is running before rendering because if not, some variable will return undeflined and crash app
    // dispatch(loadUser());
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Navbar />
                <CategorySlider />
                <Switch>
                    {/*Categories Pages*/}
                    <Route exact path="/" render={(props) => (<Home />)} /> {/*This will be routed first, exact make sure only Home content is displayed render based on https://github.com/luisFebro/react_crash_todo/blob/master/src/App.js*/}
                    <Route path="/lingeries" exact component={Lingerie} />
                    <Route path="/cosmeticos" exact component={Cosmetic} />
                    <Route path="/comestiveis" exact component={Edible} />
                    {/*End Categories Pages*/}
                    <Route path="/loja" exact component={Store} />
                    <Route path="/detalhes-do-produto" exact component={Details} />
                    <Route path="/seu-carrinho" exact component={Cart} />
                    <Route path="/finalizar-compra" exact component={CheckoutLocal} />
                    <Route path="/favoritos" exact component={Favorites} />
                    <Route path="/painel-controle-admin" exact component={Dashboard} />
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
                <AnimationBizPromo />
            </ScrollToTop>
        </BrowserRouter>
    );
}

// n1 Every time the user clicks on the screen,he/she is updated
// if(isUserAuthenticated) {
//     window.addEventListener('click', () => {
//         console.log("clicked");
//         updateCurrentUser(dispatch)
//     });
// }
