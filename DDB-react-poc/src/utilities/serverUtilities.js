import endpoints from "constants/server/csp/cspEndpoints";
import keys from "keys";

const sServerURL = keys.serverPath;

export const getCSPEndpointData = (i_sFuncName) => {
    if (endpoints[i_sFuncName]) {
        return { url: sServerURL, func: endpoints[i_sFuncName] };
    } else {
        return undefined;
    }
};

export default {
    getCSPEndpointData
};