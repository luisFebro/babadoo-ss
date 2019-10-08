import React from 'react';
import ReactDOM from 'react-dom';
import App from './_main-app/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductProvider } from './data/contexts/mainContext';
import ScrollToTop from 'react-router-scroll-top';
// REDUX - easy-peasy
import { createStore, StoreProvider } from 'easy-peasy';
import { easyStore } from './/redux/easyStore';
const store = createStore(easyStore);
// END REDUX - easy-peasy

ReactDOM.render(
    <ProductProvider>
        <Router>
            <ScrollToTop>
                <StoreProvider store={store}>
                    <App />
                </StoreProvider>
            </ScrollToTop>
        </Router>
    </ProductProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
