import { reducer } from 'easy-peasy';
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.
// Reducer Naming Structure: (optional verb 'is') + main + state/desc

// REDUCERS
const initialState = {
    updatedUsers: [],
    currentUpdatedUser: [],
    allFavProductsList: [],
    allMessagesList: [{sender: 'Babadoo', id: '123hgfssax4556', time: '12:30', message: "Hi there, Iam a new Message!"}, {sender: 'Babadoo', id: '1234556', time: '12:30', message: "Hi there, Iam a new Message!"}, {sender: 'Babadoo', id: '123455sdshg6', time: '14:30', message: "Hi there, Luis!"}],
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
                //Check if user have coupons (If so, the maskot with discount will not appear when user log in)
                let gotAtLeastOneCupon = false;
                if(action.payload.couponsList.length >= 1) {
                    gotAtLeastOneCupon = true;
                }
                return {
                    ...state,
                    currentUpdatedUser: action.payload,
                    allFavProductsList: action.payload.favoriteList,
                    allMessagesList: action.payload.messageList,
                    gotCoupons: gotAtLeastOneCupon
                }
            case 'USER_DELETED':
                return {
                    ...state,
                    updatedUsers: state.updatedUsers.filter(user => user._id !== action.payload)
                }
            case 'USER_NOTIFICATIONS':
                return {
                    ...state,
                    allMessagesList: action.payload,
                }
            default:
                return state;
        }
    }),
}

// n1:
