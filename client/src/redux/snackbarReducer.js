import { reducer } from 'easy-peasy';
// actions are used with the usestoredispatch hook inside the wanting functional component
// copy and paste the type of actions below
// You can use only one isntance of object like 'cases' for each object.
//Reducer Naming Structure: (optional verb 'is') + main + state/desc

// REDUCERS
const initialState = {
    isBlackSnackbarOpen: false,
    isSuccessSnackbarOpen: false,
    snackbarMsg: "",
}

export const snackbarReducer = {
    cases: reducer((state = initialState, action) => {
        switch(action.type) {
            //Show
            case 'SHOW_SNACKBAR_BLACK':
                return {
                   isBlackSnackbarOpen: true,
                   snackbarMsg: action.payload
                };
            //Close
            case 'CLOSE_SNACKBAR_BLACK':
                return {
                   isBlackSnackbarOpen: false,
                   snackbarMsg: ""
                }

            default:
                return state;
        }
    }),
}