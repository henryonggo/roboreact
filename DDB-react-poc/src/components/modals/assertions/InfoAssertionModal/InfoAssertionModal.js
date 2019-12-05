import React from "react";
import "./InfoAssertionModal.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import AssertionBaseModal from "components/modals/assertions/AssertionBaseModal";
import * as LANG_CONST from "constants/language";

import { Info } from "@material-ui/icons";

const InfoAssertionModal = (props) => {
    const {className, ...rest} = props;

    return (
        <AssertionBaseModal
            {...rest}
            className={Utilities.injectClassNames(className, "InfoAssertionModal")}
            icon={<Info className="InfoAssertionModal__icon"/>}
        />
    );
};

InfoAssertionModal.propTypes = {
    className: PropTypes.string,
    title: PropTypes.node
};

InfoAssertionModal.defaultProps = {
    title: `${LANG_CONST.INFO_TITLE}`
}; 

export default InfoAssertionModal;