import { reducer } from 'easy-peasy';
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.
// Reducer Naming Structure: (optional verb 'is') + main + state/desc

// REDUCERS
const initialState = {
    businessInfo: {},
}

export const businessInfoReducer = {
    cases: reducer((state = initialState, action) => {
        switch (action.type) {
            case 'READ_BIZ_INFO':
                return {
                    businessInfo: action.payload
                }
            case 'UPDATE_BIZ_INFO':
                return {
                    businessInfo: action.payload
                }
            default:
                return state;
        }
    }),
}


