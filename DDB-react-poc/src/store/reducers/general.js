import * as actionTypes from "store/actions/actionTypes";
import * as operations from "store/operations/general";

const initialState = {
    systemInfo: {},
};

const reducer = (state = initialState, action) => {
    const bSaveToServer = (action.$config) ? action.$config.$saveToServer : false;

    switch(action.type) {
        case actionTypes.general.SET_SYSTEM_INFO:
            return operations.setSystemInfo(state, action.systemInfo);
        case actionTypes.general.SET_HEADER:
            return operations.setHeader(state, action.headerConfig, bSaveToServer);
        case actionTypes.general.SET_FOOTER:
            return operations.setFooter(state, action.footerConfig, bSaveToServer);
        default:
            return state;
    }
};

export default reducer;