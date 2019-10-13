// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

//CRUD PATTERN
// create product
export const addProduct = products => async (dispatch, getState) => {
    const res = await axios.post('/api/products', products, tokenConfig(getState));
    try {
        dispatch({ type: 'ADD_PRODUCT', payload: res.data });
    } catch(err) {
        dispatch(returnErrors(err.response.data, err.response.status));
    }
};

// read product
export const getAllProducts = async (dispatch) => {
    let didCancel = false; //n1
    try {
        dispatch(setProductsLoading());
        const res = await axios.get('/api/products');
        if(!didCancel) {
            console.log("getAllProducts", res);
            dispatch({ type: 'GET_ALL_PRODUCTS', payload: res.data });
        }

    } catch (err) {
        if(!didCancel) {
            dispatch(returnErrors(err.response.data, err.response.status))
        }
    }
};

// update product
export const changeProduct = id => async (dispatch, getState) => {
    try {
        // statements
    } catch(e) {
        // statements
        console.log(e);
    }
}

// delete product
export const deleteProduct = id => async (dispatch, getState) => {
    const res = await axios.delete(`/api/products/${id}`, tokenConfig(getState));
    try {
        dispatch({ type: 'DELETE_PRODUCT', payload: id });
    } catch(err) {
        dispatch(returnErrors(err.response.data, err.response.status));
    }
};
//END CRUD PATTERN

export const handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
        return { detailProduct: product };
    });
};


export const getOneProduct = id => {
    // const { products } = this.state;
    // const product = products.find(item => item.id === id);
    // return product;
};

// set loading to true to stop the animation loader and starting loading files
// false: animation loader running
// true: data is being displayed to the user.
const setProductsLoading = () => {
    return {
        type: 'PRODUCTS_LOADING'
    };
};


// NOTE:
// n1 : Every Effect Hook comes with a clean up function which runs when a component unmounts.
// The clean up function is the one function returned from the hook.
// In our case, we use a boolean flag called didCancel to let our data fetching logic know about the state (mounted/unmounted) of the component.
// If the component did unmount, the flag should be set to true which results in preventing to set the component state after the data fetching has been asynchronously resolved eventually.