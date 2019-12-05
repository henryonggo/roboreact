import Loadable from "react-loadable";
import LoaderDisplay from "loader/LoaderDisplay/LoaderDisplay.js";

const TIMEOUT_TIME = 30000; //ms

export const loader = (i_fnImportFunc, i_loaderComponent = LoaderDisplay) => {
    return Loadable({
        loader: i_fnImportFunc,
        loading: i_loaderComponent,
        timeout: TIMEOUT_TIME
    });
};

export default loader;