import { action } from 'easy-peasy';
// Models
import { modalReducers } from './modalReducers';
import { errorReducer } from './errorReducer';
import { authReducer } from './authReducer';

//Main store
export const easyStore = {
    modalReducers,
    authReducer,
    errorReducer
}