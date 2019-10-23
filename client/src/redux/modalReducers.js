import { reducer } from 'easy-peasy';
// actions are used with the usestoredispatch hook inside the wanting functional component
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.

// REDUCERS
const initialState = {
    isModalDefaultOpen: false,
    isModalUnderConstructionOpen: false,
    // Authentification
    isModalLoginOpen: false,
    isModalRegisterOpen: false,
    // End Authentification
    isModalConfTitleOpen: false
}

export const modalReducers = {
    cases: reducer((state = initialState, action) => {
        switch(action.type) {
            //SHOW
            case 'SHOW_MODAL_DEFAULT':
                return {
                    ...state,
                    isModalDefaultOpen: action.payload
                }
            case 'SHOW_MODAL_LOGIN':
                return {
                    ...state,
                    isModalLoginOpen: action.payload
                }
            case 'SHOW_MODAL_REGISTER':
                return {
                    ...state,
                    isModalRegisterOpen: action.payload
                }
            case 'SHOW_MODAL_UNDER_CONSTRUCTION':
                return {
                    ...state,
                    isModalUnderConstructionOpen: action.payload,
                }
            case 'SHOW_MODAL_CONF_TITLE':
                return {
                    ...state,
                    isModalConfTitleOpen: action.payload,
                }
            // CLOSE
            case 'CLOSE_ALL_MODALS':
                //Change all the keys to false
                for(let key in state) {
                    state[key] = false
                }
            default:
                return state;
        }
    }),
}
