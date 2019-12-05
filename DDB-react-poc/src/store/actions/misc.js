import * as actionTypes from "store/actions/actionTypes";
import { INIT_CONFIG } from "store/constants";

export const setBaseline = () => {
    return {
        type: actionTypes.misc.SET_BASELINE,
        $config: { ...INIT_CONFIG, $undoable: true }
    };
};