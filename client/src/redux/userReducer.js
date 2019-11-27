import { reducer } from 'easy-peasy';
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.
// Reducer Naming Structure: (optional verb 'is') + main + state/desc

// HELPERS
function checkCoupons(payload) {
    let gotAtLeastOneCupon = false;
    if (typeof payload !== 'undefined') {
        if (payload.length >= 1) {
            gotAtLeastOneCupon = true;
        }
    }
    return gotAtLeastOneCupon;
}

// REDUCERS
const initialState = {
    currentUser: {},
    allUsers: [],
    allFavProductsList: [],
    allMessagesList: [],
    allRegisteredUsersList: [],
    gotCoupons: false
};

export const userReducer = {
    cases: reducer((state = initialState, action) => {
        switch (action.type) {
            case 'UPDATE_ALL_USERS':
                return {
                    ...state,
                    allUsers: action.payload,
                    allRegisteredUsersList: action.payload.map(data => data.name)
                };
            case 'UPDATE_CURRENT_USER':
                //Check if user have coupons (If so, the maskot with discount will not appear when user log in)
                return {
                    ...state,
                    currentUser: action.payload,
                    allFavProductsList: action.payload.favoriteList,
                    allMessagesList: action.payload.messageList,
                    gotCoupons: checkCoupons(action.payload.couponsList)
                };
            case 'USER_DELETED':
                return {
                    ...state,
                    allUsers: state.allUsers.filter(user => user._id !== action.payload)
                };
            // CUSTOMIZED DATA HANDLING from social network
            case 'USER_GOOGLE_DATA':
                return {
                    ...state,
                    currentUser: {
                        _id: action.payload.tokenId,
                        name: action.payload.profileObj.familyName,
                        email: action.payload.profileObj.email,
                        picture: action.payload.profileObj.imageUrl
                    }
                }
            case 'USER_FACEBOOK_DATA':
                return {
                    ...state,
                    currentUser: {
                        _id: action.payload.accessToken,
                        name: action.payload.givenName,
                        email: action.payload.email,
                        picture: action.payload.picture.data.url
                    }
                }
            case 'CLEAR_UPDATE_CURRENT_USER':
                return {
                    ...state,
                    currentUser: {}
                }
            default:
                return state;
        }
    })
};

// n1:
