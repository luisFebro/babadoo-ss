import { reducer } from 'easy-peasy';
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.
// Reducer Naming Structure: (optional verb 'is') + main + state/desc

// REDUCERS
const initialState = {
    updatedUsers: [{name: "init", couponsList: "init"}],
}

export const userReducer = {
    cases: reducer((state = initialState, action) => {
        switch (action.type) {
            case 'USER_UPDATE':
                console.log("USER_UPDATE", action.payload);
                return {
                    ...state,
                    updatedUsers: action.payload,
                    gotCoupons: "resCoupons"
                };
            default:
                return state;
        }
    }),
}

// n1:
