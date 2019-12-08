import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import LinearProgress from '../components/loadingIndicators/LinearProgress';
import { loadReCaptcha } from 'react-recaptcha-google';
// Auth Components
import PrivateRouteAdm from '../components/auth/PrivateRouteAdm';
// Redux
import { readAdmin } from '../redux/actions/adminActions';
import { useStoreDispatch } from 'easy-peasy'; // useStoreState
import { getAllProducts } from '../redux/actions/productActions';
// End Redux
import { loadUser } from '../redux/actions/authActions';
import './App.css';
import '../utils/globalHelpers';
//GENERAL COMPONENTS
import AnimationBizPromo from '../components/AnimationBizPromo';
// import StoreMap from '../components/StoreMap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
//END GENERAL COMPONENTS

// PAGES
// import Preloader from '../pages/Preloader';
// import { CustomPreloader } from 'react-preloaders';
import Store from '../pages/store';
import Cart from '../pages/cart/Cart';
// client
import ChangePassword from '../pages/client/ChangePassword';
import InsertNewPassword from '../pages/client/InsertNewPassword';
import ConfirmAccount from '../pages/client/ConfirmAccount';
// product
import ProductDetails from '../pages/product';
import CheckoutLocal from '../pages/checkout/CheckoutLocal';
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
import Navbar from '../components/_layout/navbar';
import Footer from '../components/_layout/footer/Footer';
// END LAYOUT
// MODALS ANS TOASTS
import AllModals from '../components/modals';
import SnackbarMulti from '../components/Snackbar';
// END MODALS ANS TOASTS

// BUTTONS
import WhatsappIcon from '../components/buttons/WhatsappIcon';
// END BUTTONS
function App() {
    const dispatch = useStoreDispatch();
    readAdmin(dispatch);
    getAllProducts(dispatch); // n2

    useEffect(() => {
        loadReCaptcha();
        dispatch(loadUser(dispatch));
        // CODE NOT WORKING n1
    }, [dispatch]);

    return (
        <BrowserRouter>
            <ScrollToTop>
                <LinearProgress />
                <Navbar />
                <Switch>
                    {/*Categories Pages*/}
                    <Route path="/" exact component={Home} />
                    <Route path="/lingeries" exact component={Lingerie} />
                    <Route path="/cosmeticos" exact component={Cosmetic} />
                    <Route path="/comestiveis" exact component={Edible} />
                    {/*Client*/}
                    <Route path="/cliente/trocar-senha" exact component={ChangePassword} />
                    <Route path="/cliente/trocar-senha/:token" exact component={InsertNewPassword} />
                    <Route path="/cliente/confirmacao-conta/:authUserId" exact component={ConfirmAccount} />
                    {/*End Client*/}
                    <Route path="/loja" exact component={Store} />
                    <Route path="/produto/:dashedName" exact component={ProductDetails} />
                    <Route path="/seu-carrinho" exact component={Cart} />
                    <Route path="/finalizar-compra" exact component={CheckoutLocal} />
                    <Route path="/favoritos" exact component={Favorites} />
                    <PrivateRouteAdm path="/painel-controle-admin" exact component={Dashboard} />
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

export default React.memo(App);

/* n1 Every time the user clicks on the screen,he/she is updated
// if(isUserAuthenticated) {
//     window.addEventListener('click', () => {
//         console.log("clicked");
//         updateCurrentUser(dispatch)
//     });
// }
n2: this loads in the first run because it faces a fetching issue if the user loads a page other than home.
*/


/*
<CustomPreloader>
    <Preloader />
</CustomPreloader>
 */