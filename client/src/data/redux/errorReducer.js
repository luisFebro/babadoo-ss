import { reducer } from 'easy-peasy';
// actions are used with the usestoredispatch hook inside the wanting functional component
// copy and paste the type of actions below
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.

// REDUCERS
const initialState = {
    msg: {},
    status: null,
    id: null
}

export const errorReducer = {
    cases: reducer((state = initialState, action) => {
        switch(action.type) {
            case 'GET_ERRORS':
                return {
                   msg: action.payload.msg,
                   status: action.payload.status,
                   id: action.payload.id
                };
            case 'CLEAR_ERRORS':
                return {
                    msg: {},
                    status: "status_testing",
                    id: "luis_testing",
                }

            default:
                return state;
        }
    }),
}