import { useStoreDispatch, reducer, debug } from 'easy-peasy';
// actions are used with the usestoredispatch hook inside the wanting functional component
// copy and paste the type of actions below
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.

// REDUCERS
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export const authReducer = {
    cases: reducer((state = initialState, action) => {
        switch(action.type) {
            case 'USER_LOADING':
                return {
                    ...state,
                    isLoading: true
                };
            case 'USER_LOADED':
                console.log("USER LOADED switch isAuth to true")
                return {
                    ...state,
                    isAuthenticated: true,
                    isLoading: false,
                    user: action.payload
                }
            case 'LOGIN_SUCCESS':
            case 'REGISTER_SUCCESS':
                console.log("action.payload", action.payload)
                console.log("state",debug(state))
                localStorage.setItem('token', action.payload.token);
                return {
                  ...state,
                  ...action.payload,
                  isAuthenticated: true,
                  isLoading: false
                };
            case 'AUTH_ERROR':
            case 'LOGIN_FAIL':
            case 'LOGOUT_SUCCESS':
            case 'REGISTER_FAIL':
              localStorage.removeItem('token');
              return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
              };
            default:
                return state;
        }
    }),
}