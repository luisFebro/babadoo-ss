// Models
import { modalReducers } from './modalReducers';
import { productReducer } from './productReducer';
import { snackbarReducer } from './snackbarReducer';
import { errorReducer } from './errorReducer';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';

//Main store
export const easyStore = {
    authReducer,
    userReducer,
    productReducer,
    modalReducers,
    errorReducer,
    snackbarReducer,
}