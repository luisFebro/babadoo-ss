// Models
import { modalReducers } from './modalReducers';
import { snackbarReducer } from './snackbarReducer';
import { errorReducer } from './errorReducer';
import { authReducer } from './authReducer';

//Main store
export const easyStore = {
    modalReducers,
    authReducer,
    errorReducer,
    snackbarReducer
}