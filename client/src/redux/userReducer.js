import { reducer } from 'easy-peasy';
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.
// Reducer Naming Structure: (optional verb 'is') + main + state/desc

// REDUCERS
const initialState = {
    updatedUsers: [],
    currentUpdatedUser: [],
    allFavProductsList: [],
    allMessagesList: [],
    allRegisteredUsersList: [],
    gotCoupons: false
};

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
                if (typeof action.payload.couponsList !== 'undefined') {
                    if (action.payload.couponsList.length >= 1) {
                        gotAtLeastOneCupon = true;
                    }
                }
                console.log("UPDATED USER REDUCER", action.payload);
                return {
                    ...state,
                    currentUpdatedUser: action.payload,
                    allFavProductsList: action.payload.favoriteList,
                    allMessagesList: action.payload.messageList,
                    gotCoupons: gotAtLeastOneCupon
                };
            case 'USER_DELETED':
                return {
                    ...state,
                    updatedUsers: state.updatedUsers.filter(user => user._id !== action.payload)
                };
            // DATA from register/login
            case 'USER_LOADED_DATA':
                return {
                    ...state,
                    // somehting
                };
            case 'USER_EMAIL_DATA':
                return {
                    ...state,
                    currentUpdatedUser: action.payload
                }
            case 'USER_GOOGLE_DATA':
                return {
                    ...state,
                    currentUpdatedUser: {
                        _id: action.payload.tokenId,
                        name: action.payload.profileObj.familyName,
                        email: action.payload.profileObj.email,
                        picture: action.payload.profileObj.imageUrl
                    }
                }
            case 'USER_FACEBOOK_DATA':
                return {
                    ...state,
                    currentUpdatedUser: {
                        _id: action.payload.accessToken,
                        name: action.payload.givenName,
                        email: action.payload.email,
                        picture: action.payload.picture.data.url
                    }
                }
            default:
                return state;
        }
    })
};

// n1:
