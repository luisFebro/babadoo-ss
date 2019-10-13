// Models
import { modalReducers } from './modalReducers';
import { productReducer } from './productReducer';
import { snackbarReducer } from './snackbarReducer';
import { errorReducer } from './errorReducer';
import { authReducer } from './authReducer';

//Main store
export const easyStore = {
    productReducer,
    authReducer,
    modalReducers,
    errorReducer,
    snackbarReducer
}