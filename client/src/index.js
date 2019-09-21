import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './_main-app/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductProvider } from './data/contexts/mainContext';
import ScrollToTop from 'react-router-scroll-top';

ReactDOM.render(
    <ProductProvider>
        <Router>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </Router>
    </ProductProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
