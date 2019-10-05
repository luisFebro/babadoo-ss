import { useStoreDispatch, action, reducer } from 'easy-peasy';
// ACTIONS ARE USED WITH THE USESTOREDISPATCH HOOK INSIDE THE WANTING FUNCTIONAL COMPONENT
// COPY AND PASTE THE TYPE OF ACTIONS BELOW

// REDUCERS
const initialState = {
    isModalLoginOpen: false,
    isModalUnderConstructionOpen: false,
}
export const dataModalModel = {
    showModal: reducer((state = initialState, action) => {
        console.log("actionShowModal", action)
        switch(action.type) {
            case 'SHOW_MODAL_LOGIN':
                return {
                    isModalLoginOpen: action.payload
                }
                break;
            case 'SHOW_MODAL_UNDER_CONSTRUCTION':
                return {
                    isModalUnderConstructionOpen: action.payload
                }
                break;
            default:
                return state;
        }
    }),

    toggleModal: action((state, payload) => {
        state.isModalLoginOpen = payload;
    }),
    //

    closeModal: action((state, payload) => {
        state.isModalLoginOpen = payload;
    }),
}