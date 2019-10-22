import { reducer } from 'easy-peasy';
// actions are used with the usestoredispatch hook inside the wanting functional component
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.

// REDUCERS
const initialState = {
    isModalDefaultOpen: false,
    isModalConfOneFieldOpen: false,
    isModalUnderConstructionOpen: false,
    // Authentification
    isModalLoginOpen: false,
    isModalRegisterOpen: false,
    // End Authentification
}

export const modalReducers = {
    cases: reducer((state = initialState, action) => {
        switch(action.type) {
            //SHOW
            case 'SHOW_MODAL_DEFAULT':
                return {
                    isModalDefaultOpen: action.payload
                }
            case 'SHOW_MODAL_LOGIN':
                return {
                    isModalLoginOpen: action.payload
                }
            case 'SHOW_MODAL_REGISTER':
                return {
                    isModalRegisterOpen: action.payload
                }
            case 'SHOW_MODAL_UNDER_CONSTRUCTION':
                return {
                    isModalUnderConstructionOpen: action.payload,
                }
            case 'SHOW_MODAL_CONF_ONE_FIELD':
                return {
                    isModalConfOneFieldOpen: action.payload,
                }

            // CLOSE
            case 'CLOSE_ALL_MODALS':
                return {
                    isModalDefaultOpen: false,
                    isModalLoginOpen: false,
                    isModalRegisterOpen: false,
                    isModalUnderConstructionOpen: false
                }
            default:
                return state;
        }
    }),
}