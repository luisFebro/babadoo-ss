import { reducer } from 'easy-peasy';
import updateKey from './helpers/updateKey';

// REDUCERS
const initialState = {
    allData: {
        businessInfo: null,
    }
};

export const adminReducer = {
    cases: reducer((state = initialState, action) => {
        switch (action.type) {
            case 'LOAD_ADMIN':
                return {
                    ...state,
                    allData: action.payload
                }
            case 'UPDATE_BIZ_INFO':
                updateKey(state.allData.businessInfo, action.payload);
                return {
                    ...state,
                }
            default:
                return state;
        }
    })
};
