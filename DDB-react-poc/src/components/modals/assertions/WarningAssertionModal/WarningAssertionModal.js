import React from "react";
import "./WarningAssertionModal.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import AssertionBaseModal from "components/modals/assertions/AssertionBaseModal";
import * as LANG_CONST from "constants/language";

import { Warning } from "@material-ui/icons";

const WarningAssertionModal = (props) => {
    const {className, ...rest} = props;

    return (
        <AssertionBaseModal
            {...rest}
            className={Utilities.injectClassNames(className, "WarningAssertionModal")}
            icon={<Warning className="WarningAssertionModal__icon"/>}
        />
    );
};

WarningAssertionModal.propTypes = {
    className: PropTypes.string,
    title: PropTypes.node
};

WarningAssertionModal.defaultProps = {
    title: `${LANG_CONST.WARNING_TITLE}`
};

export default WarningAssertionModal;