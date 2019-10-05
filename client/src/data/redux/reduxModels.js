import { action } from 'easy-peasy';
// Models
import { dataLoginModel } from './dataLoginModel';
import { dataModalModel } from './dataModalModel';

//Main store
export const reduxModels = {
    dataLogin: dataLoginModel,
    dataModal: dataModalModel
}