import { useStoreDispatch, reducer } from 'easy-peasy';
// actions are used with the usestoredispatch hook inside the wanting functional component
// copy and paste the type of actions below
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.

// REDUCERS
const initialState = {
    //> Authentification
    isModalLoginOpen: false,
    isModalRegisterOpen: false,
    //> End Authentification
    isModalUnderConstructionOpen: false,
}

export const modalReducers = {
    cases: reducer((state = initialState, action) => {
        switch(action.type) {
            //SHOW
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

            // TOGGLE
            case 'TOGGLE_MODAL_LOGIN':
                return {
                    isModalLoginOpen: !action.payload
                }
            case 'TOGGLE_MODAL_REGISTER':
                return {
                    isModalRegisterOpen: !action.payload
                }
            case 'TOGGLE_MODAL_UNDER_CONSTRUCTION':
                return {
                    isModalUnderConstructionOpen: !action.payload
                }
            default:
                return state;
        }
    }),
}