import update from "immutability-helper";
import { requestManager } from "managers";

export const setMarginal = (i_oState, i_sMarginalName, i_oMarginalConfig, i_bSaveData = false, i_sServerSaveFunc = null) => {
    if (i_bSaveData && i_sServerSaveFunc) {
        requestManager[i_sServerSaveFunc](i_oMarginalConfig);
    }

    return update(i_oState, {
        [i_sMarginalName]: {
            $set: i_oMarginalConfig
        }
    });
};

export const editMarginal = (i_oState, i_sMarginalName, i_oUpdatedConfig, i_bSaveData = false, i_sServerSaveFunc = null) => {
    const oUpdatedMarginal = update(i_oState[i_sMarginalName], {
        $merge: i_oUpdatedConfig 
    });

    if (i_bSaveData && i_sServerSaveFunc) {
        requestManager[i_sServerSaveFunc](oUpdatedMarginal);
    }

    return update(i_oState, {
        [i_sMarginalName]: { $set: oUpdatedMarginal }
    });
};