import { reducer } from 'easy-peasy';
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.
// Reducer Naming Structure: (optional verb 'is') + main + state/desc

// REDUCERS
const initialState = {
    updatedUsers: [],
    currentUpdatedUser: [],
    allFavProductsList: [],
    allRegisteredUsersList: [],
    gotCoupons: false,
}

export const userReducer = {
    cases: reducer((state = initialState, action) => {
        switch (action.type) {
            case 'ALL_USERS_UPDATE':
                return {
                    ...state,
                    updatedUsers: action.payload,
                    allRegisteredUsersList: action.payload.map(data => data.name)
                };
            case 'USER_CURRENT_UPDATED':
                console.log("USER_CURRENT_UPDATED from userReducer", action.payload);
                //Check if user have coupons (If so, the maskot with discount will not appear when user log in)
                let gotAtLeastOneCupon = false;
                if(action.payload.couponsList.length >= 1) {
                    gotAtLeastOneCupon = true;
                }
                return {
                    ...state,
                    currentUpdatedUser: action.payload,
                    allFavProductsList: action.payload.favoriteList,
                    gotCoupons: gotAtLeastOneCupon
                }
            default:
                return state;
        }
    }),
}

// n1:
