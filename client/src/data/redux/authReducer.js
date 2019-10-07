import { reducer } from 'easy-peasy';
// actions are used with the usestoredispatch hook inside the wanting functional component
// copy and paste the type of actions below
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.

// REDUCERS
const initialState = {
    token: localStorage.getItem('token'),
    isUserAuthenticated: false,
    isLoading: false,
    user: {
        id: null,
        name: null,
        email: null,
        picture: "img/icons/avatar-woman.png",
    }
}


export const authReducer = {
    cases: reducer((state = initialState, action) => {
        switch(action.type) {
            case "LOGIN_GOOGLE":
                console.log("LOGIN_GOOGLE", action);
                return {
                    ...state,
                    isUserAuthenticated: true,
                    user: {
                        id: action.payload.tokenId,
                        name: action.payload.profileObj.familyName, //change to givenName
                        picture: action.payload.profileObj.imageUrl,
                        email: action.payload.profileObj.email
                    }
                }
            case "LOGIN_FACEBOOK":
                return {
                    ...state,
                    isUserAuthenticated: true,
                    user: {
                        id: action.payload.accessToken,
                        name: action.payload.name, //change to givenName
                        picture: action.payload.picture.data.url,
                        email: action.payload.email
                    }
                }
            case 'LOGIN_SUCCESS':
            case 'REGISTER_SUCCESS':
                localStorage.setItem('token', action.payload.token);
                return {
                  ...state,
                  ...action.payload,
                  isUserAuthenticated: true,
                  isLoading: false,
                  user: {
                      id: action.payload.user.id,
                      email: action.payload.user.email,
                      name: action.payload.user.name,
                      picture: "img/icons/avatar-woman.png",
                  }
                };
            case 'USER_LOADING':
                return {
                    ...state,
                    isLoading: true
                };
            case 'USER_LOADED':
                return {
                    ...state,
                    isUserAuthenticated: true,
                    isLoading: false,
                    user: action.payload
                }
            case 'AUTH_ERROR':
            case 'LOGIN_FAIL':
            case 'LOGOUT_SUCCESS':
            case 'REGISTER_FAIL':
              localStorage.removeItem('token');
              return {
                ...state,
                isUserAuthenticated: false,
                token: null,
                isLoading: false,
                user: {
                    id: null,
                    name: null,
                    email: null,
                    picture: "img/icons/avatar-woman.png",
                }
              };
            default:
                return state;
        }
    }),
}


// closeMenuLogin: action((state, payload) => {
//     // let nav = document.querySelector('#mainNav');
//     // nav.className="animated zoomOut slower sticky"
//     state.isUserLoggedIn = false;
//     setTimeout(() => {
//         // nav.style.display = 'none';
//     }, 1500)
// })