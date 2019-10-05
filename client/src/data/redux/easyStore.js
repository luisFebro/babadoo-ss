import { action } from 'easy-peasy';
// Models
import { dataLoginModel } from './dataLoginModel';
import { dataModalModel } from './dataModalModel';

//Main store
export const easyStore = {
    dataLogin: dataLoginModel,
    dataModal: dataModalModel
}