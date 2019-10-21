import { reducer } from 'easy-peasy';
// About: Reusable with many components, especially for true-false states
//Reducer Naming Structure: (optional verb 'is') + main + state/desc

// REDUCERS
const initialState = {
    isLoading: false,
    gotError: false,
    errorMsg: "", // eg. err.message
}

export const globalReducer = {
    cases: reducer((state = initialState, action) => {
        switch(action.type) {
            //Show
            case 'SHOW_LOADING':
                return {
                   isLoading: true,
                };
            case 'SHOW_ERROR':
                return {
                   gotError: true,
                   errorMsg: action.payload,
                };
            //Close
            case 'CLOSE_LOADING':
                return {
                   isLoading: false,
                }
            case 'CLEAR_ERROR':
                return {
                    gotError: false,
                    errorMsg: "",
                }
            default:
                return state;
        }
    }),
}