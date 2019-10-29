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
                //Update returns an array. Selecting
                return {
                    isFirstBuyCouponOn: action.payload.map(promotion => promotion.promotions.isFirstBuyCouponOn)[0],
                }
            case 'PROMOTION_STATUS':
                console.log("promotions reducer", action.payload.promotions);
                return {
                    isFirstBuyCouponOn: action.payload.promotions.isFirstBuyCouponOn,
                }
            default:
                return state;
        }
    }),
}


