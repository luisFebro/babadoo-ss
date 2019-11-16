// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
import axios from 'axios';
import { tokenConfig } from './authActions';
import { setLoadingOn, setLoadingOff, setErrorOn } from './globalActions';
import { getRandomArray } from '../../utils/getRandomArray';
import { getBodyRequest } from '../../utils/server/getBodyRequest';
import { configTypeJson } from '../../utils/server/configTypeJson';

// get an obj with all infos of a item from a specific id
export const getItem = (allProductsList, _id) => {
    const product = allProductsList.find(item => item._id === _id);
    return product;
};
//END UTILS

//CRUD PATTERN
// create product
export const addProduct = product => async (dispatch, getState) => {
    const res = await axios.post('/api/product', product, tokenConfig(getState));
    try {
        dispatch({ type: 'ADD_PRODUCT', payload: res.data });
    } catch (err) {
        setErrorOn(dispatch, err.response.data.msg);
    }
};

// read / update product
export const getAllProducts = async dispatch => {
    // let didCancel = false; //n1
    try {
        setLoadingOn(dispatch);
        const res = await axios.get('/api/product');
        console.log('==GOT ALL PRODUCTS==');
        const randomOrder = getRandomArray(res.data);
        dispatch({ type: 'GET_ALL_PRODUCTS', payload: randomOrder });
        setLoadingOff(dispatch);
        // if(!didCancel) {
        // }
    } catch (err) {
        console.log('getAllProductsError', err);
        setErrorOn(dispatch, err.response.data.msg);
        // if(!didCancel) {
        // }
    }
};

// update product
export const changeProduct = async (dispatch, bodyToSend, _idProduct) => {
    const body = getBodyRequest(bodyToSend);
    // Switching obj keys dynamically to update in Reducer
    const targetKey = Object.keys(bodyToSend)[0];
    const dataToUpdate = {
        _id: _idProduct,
        [`${targetKey}`]: bodyToSend[targetKey]
    };
    try {
        const res = axios.put(`/api/product/${_idProduct}`, body, configTypeJson);
        console.log('==CHANGING PRODUCT==');
        dispatch({ type: 'CHANGE_PRODUCT', payload: dataToUpdate });
    } catch (e) {
        // statements
        console.log(e);
    }
};

// delete product
export const deleteProduct = async (dispatch, _idProduct) => {
    try {
        const res = await axios.delete(`/api/product/${_idProduct}`, configTypeJson);
        console.log('==PRODUCT DELETED==');
        dispatch({ type: 'DELETE_PRODUCT', payload: _idProduct });
        // update
        getAllProducts(dispatch);
    } catch (err) {
        setErrorOn(dispatch, err.response.data.msg);
    }
};
//END CRUD PATTERN

export const handleDetail = id => {
    // const product = this.getItem(id);
    // this.setState(() => {
    //     return { detailProduct: product };
    // });
};

export const addToCart = id => {
    const { products, cart } = this.state;
    let tempProducts = [...products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(
        () => {
            return {
                products: tempProducts,
                cart: [...cart, product]
            };
        },
        () => {
            this.addTotals();
            this.countItems();
        }
    );
};

// NOTE:
// n1 : Every Effect Hook comes with a clean up function which runs when a component unmounts.
// The clean up function is the one function returned from the hook.
// In our case, we use a boolean flag called didCancel to let our data fetching logic know about the state (mounted/unmounted) of the component.
// If the component did unmount, the flag should be set to true which results in preventing to set the component state after the data fetching has been asynchronously resolved eventually.
