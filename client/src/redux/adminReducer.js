import { reducer } from 'easy-peasy';
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.
// Reducer Naming Structure: (optional verb 'is') + main + state/desc

// REDUCERS
const initialState = {
    isFirstBuyCouponOn: false,
}

export const adminReducer = {
    cases: reducer((state = initialState, action) => {
        switch (action.type) {
            case 'PROMOTION_UPDATED':
                //The payload returns an array because in the server sidethe method returns one array with all docs.NEeed a better approach to get an object.
                return {
                    isFirstBuyCouponOn: action.payload.map(promotion => promotion.promotions.isFirstBuyCouponOn)[0],
                }
            case 'PROMOTION_STATUS':
                // Here the payload returns an object normally. In the DB, by default,  the type is object.
                console.log("promotions reducer", action.payload.promotions);
                return {
                    isFirstBuyCouponOn: action.payload.promotions.isFirstBuyCouponOn,
                }
            default:
                return state;
        }
    }),
}


