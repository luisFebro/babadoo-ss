import React from 'react';
import ReactDOM from 'react-dom';
import App from './_main-app/App';
// State Management - Redux and Context
import { createStore, StoreProvider } from 'easy-peasy';
import { easyStore } from './redux/_easyStore';
import { ProductProvider } from './data/contexts/mainContext';
// End State Management - Redux and Context
import * as serviceWorker from './serviceWorker';

const store = createStore(easyStore);

ReactDOM.render(
    <StoreProvider store={store}> {/*L*/}
        <ProductProvider>
            <App />
        </ProductProvider>
    </StoreProvider>,
    document.getElementById('root')
);

/*
LESSON: TypeError: Cannot perform 'get' on a proxy that has been revoked.
This error popped up after removed package-lock.json and module_modules.
The only feasiable solution I could find it was to change the folder and file in the package-lock
the prior version. Luckily, I made a backup from node_modules before preceed with this restoration due to bug in the project page.
 */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
