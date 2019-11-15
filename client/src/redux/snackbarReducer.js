import { reducer } from 'easy-peasy';
// actions are used with the usestoredispatch hook inside the wanting functional component
// You can use only one isntance of object like 'cases' for each object.
//Reducer Naming Structure: (optional verb 'is') + main + state/desc

// REDUCERS
const initialState = {
    isBlackSnackbarOpen: false,
    isSuccessSnackbarOpen: false,
    snackbarMsg: '',
    snackbarTiming: 0
};

export const snackbarReducer = {
    cases: reducer((state = initialState, action) => {
        switch (action.type) {
            //Show
            case 'SHOW_SNACKBAR_BLACK':
                return {
                    ...state,
                    isBlackSnackbarOpen: true,
                    snackbarMsg: action.payload.msg,
                    snackbarTiming: action.payload.timeRunning
                };
            //Close
            case 'CLOSE_SNACKBAR_BLACK':
                return {
                    ...state,
                    isBlackSnackbarOpen: false,
                    snackbarMsg: ''
                };

            default:
                return state;
        }
    })
};
