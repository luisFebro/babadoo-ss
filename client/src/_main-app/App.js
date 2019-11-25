import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
// Redux
import { readAdmin } from '../redux/actions/adminActions';
import { useStoreDispatch } from 'easy-peasy'; // useStoreState
import { getUpdatedUsers, updateCurrentUser } from '../redux/actions/userActions';
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

// PAGES
import Preloader from '../pages/Preloader';
import Store from '../pages/store';
import Cart from '../pages/cart/Cart';
// customer
import ChangePassword from '../pages/customer/ChangePassword';
// end customer
import CheckoutLocal from '../pages/checkout/CheckoutLocal';
import Details from '../pages/Details';
import Default from '../pages/Default';
import Favorites from '../pages/favorites';
import Dashboard from '../pages/dashboard-admin';
// Categories
import Home from '../pages/Home';
import Lingerie from '../pages/category-pages/Lingerie';
import Cosmetic from '../pages/category-pages/Cosmetic';
import Edible from '../pages/category-pages/Edible';
// End categories
//END PAGES

//LAYOUT
// import MenuTopLogin from '../components/_layout/navbar/MenuTopLogin';
import Navbar from '../components/_layout/navbar/Navbar';
import CategorySlider from '../components/_layout/CategorySlider';
import Footer from '../components/_layout/footer/Footer';
// END LAYOUT
// MODALS ANS TOASTS
import AllModals from '../components/modals';
import SnackbarMulti from '../components/Snackbar';
// END MODALS ANS TOASTS

// BUTTONS
import WhatsappIcon from '../components/buttons/WhatsappIcon';
// END BUTTONS
export default function App() {
    // const { isUserAuthenticated } = useStoreState(state => ({
    //     isUserAuthenticated: state.authReducer.cases.isUserAuthenticated
    // }));

    const dispatch = useStoreDispatch();
    readAdmin(dispatch);

    useEffect(() => {
        getUpdatedUsers(dispatch);
        dispatch(loadUser(dispatch));
        // CODE NOT WORKING n1
    }, []);

    return (
        <BrowserRouter>
            <ScrollToTop>
                <Navbar />
                <CategorySlider />
                <Switch>
                    {/*Categories Pages*/}
                    <Route exact path="/" render={props => <Home />} />{' '}
                    <Route path="/lingeries" exact component={Lingerie} />
                    <Route path="/cosmeticos" exact component={Cosmetic} />
                    <Route path="/comestiveis" exact component={Edible} />
                    {/*Customer*/}
                    <Route path="/cliente/trocar-senha" exact component={ChangePassword} />
                    {/*End Customer*/}
                    <Route path="/loja" exact component={Store} />
                    <Route path="/produto/:dashed-name" exact component={Details} />
                    <Route path="/seu-carrinho" exact component={Cart} />
                    <Route path="/finalizar-compra" exact component={CheckoutLocal} />
                    <Route path="/favoritos" exact component={Favorites} />
                    <Route path="/painel-controle-admin" exact component={Dashboard} />
                    <Route component={Default} />
                </Switch>
                {/*Modals and Snackbars*/}
                <AllModals />
                <SnackbarMulti />
                {/*End Modals and Snackbars*/}
                <Footer />
                <WhatsappIcon />
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

/*
<CustomPreloader>
    <Preloader />
</CustomPreloader>
 */