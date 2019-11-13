// Models
import { modalReducers } from './modalReducers';
import { productReducer } from './productReducer';
import { snackbarReducer } from './snackbarReducer';
import { errorReducer } from './errorReducer';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';
import { globalReducer } from './globalReducer';
import { animationReducer } from './animationReducer';
import { adminReducer } from './adminReducer';
import { businessInfoReducer } from './businessInfoReducer';

//Main store
export const easyStore = {
    authReducer,
    userReducer,
    productReducer,
    modalReducers,
    errorReducer,
    snackbarReducer,
    globalReducer,
    animationReducer,
    adminReducer,
    businessInfoReducer,
}