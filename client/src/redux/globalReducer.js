import { reducer } from 'easy-peasy';
// About: Reusable with many components, especially for true-false states
//Reducer Naming Structure: (optional verb 'is') + main + state/desc

// REDUCERS
const initialState = {
    isLoading: false,
    gotError: false,
    errorMsg: "", // eg. err.message
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
            case 'SHOW_ERROR':
                return {
                    ...state,
                    gotError: true,
                    errorMsg: action.payload,
                };
            //Close
            case 'CLOSE_LOADING':
                return {
                   ...state,
                   isLoading: false,
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