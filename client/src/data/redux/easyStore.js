import { action } from 'easy-peasy';
// Models
import { dataLoginModel } from './dataLoginModel';
import { modalReducers } from './modalReducers';
import { errorReducer } from './errorReducer';
import { authReducer } from './authReducer';

//Main store
export const easyStore = {
    dataLogin: dataLoginModel,
    modalReducers,
    authReducer,
    errorReducer
}