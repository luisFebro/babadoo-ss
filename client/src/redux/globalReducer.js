import { reducer } from 'easy-peasy';
// About: Reusable with many components, especially for true-false states
//Reducer Naming Structure: (optional verb 'is') + main + state/desc

// REDUCERS
const initialState = {
    isLoading: false,
    gotSuccess: false,
    successMsg: "",
    gotError: false,
    errorMsg: "",
    currentItemFound: null,
}

export const globalReducer = {
    cases: reducer((state = initialState, action) => {
        switch(action.type) {
            // Objs
            case 'CURRENT_ITEM_FOUND':
                return {
                    ...state,
                    currentItemFound: action.payload,
                };
            //Show
            case 'SHOW_LOADING':
                return {
                   ...state,
                   isLoading: true,
                };
            case 'SHOW_SUCCESS':
                return {
                    ...state,
                    gotSuccess: true,
                    successMsg: action.payload,
                }
            case 'SHOW_ERROR':
                return {
                    ...state,
                    gotError: true,
                    errorMsg: action.payload,
                };
            //Clear
            case 'CLEAR_LOADING':
                return {
                   ...state,
                   isLoading: false,
                }
            case 'CLEAR_SUCCESS':
                return {
                    ...state,
                    gotSuccess: false,
                    successMsg: "",
                }
            case 'CLEAR_ERROR':
                return {
                    ...state,
                    gotError: false,
                    errorMsg: "",
                }
            default:
                return state;
        }
    }),
}