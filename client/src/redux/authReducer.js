import { reducer } from 'easy-peasy';
// actions are used with the usestoredispatch hook inside the wanting functional component
// copy and paste the type of actions below
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.

// REDUCERS
const initialState = {
    token: localStorage.getItem('token'),
    isUserAuthenticated: false,
};

export const authReducer = {
    cases: reducer((state = initialState, action) => {
        switch (action.type) {
            case 'AUTHENTICATE_USER':
                return {
                    ...state,
                    isUserAuthenticated: true,
                };
            // social network login
            case 'LOGIN_GOOGLE':
                localStorage.setItem('token', action.payload.token);
                return {
                    ...state,
                    isUserAuthenticated: true,
                };
            case 'LOGIN_FACEBOOK':
                localStorage.setItem('token', action.payload.token);
                return {
                    ...state,
                    isUserAuthenticated: true,
                };
            // end social network login
            case 'LOGIN_SUCCESS':
            case 'REGISTER_SUCCESS':
                localStorage.setItem('token', action.payload.token);
                return {
                    ...state,
                    isUserAuthenticated: true,
                };
            case 'USER_LOADED':
                return {
                    ...state,
                    isUserAuthenticated: true,
                };
            case 'AUTH_ERROR':
            case 'LOGIN_FAIL':
            case 'LOGOUT_SUCCESS':
            case 'REGISTER_FAIL':
                localStorage.removeItem('token');
                return {
                    ...state,
                    isUserAuthenticated: false,
                    token: null,
                };
            default:
                return state;
        }
    })
};

// closeMenuLogin: action((state, payload) => {
//     // let nav = document.querySelector('#mainNav');
//     // nav.className="animated zoomOut slower sticky"
//     state.isUserLoggedIn = false;
//     setTimeout(() => {
//         // nav.style.display = 'none';
//     }, 1500)
// })
