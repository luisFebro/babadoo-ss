import { action } from 'easy-peasy';
// Models
import { dataLoginModel } from './dataLoginModel';
import { modalReducers } from './modalReducers';

//Main store
export const easyStore = {
    dataLogin: dataLoginModel,
    modalReducers
}