import * as actionTypes from "store/actions/actionTypes";

const initialState = {};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.misc.SET_BASELINE:
            return state;
        default:
            return state;
    }
};

export default reducer;