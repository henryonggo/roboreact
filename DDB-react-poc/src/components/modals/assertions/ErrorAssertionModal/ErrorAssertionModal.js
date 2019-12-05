import React from "react";
import "./ErrorAssertionModal.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import AssertionBaseModal from "components/modals/assertions/AssertionBaseModal";
import * as LANG_CONST from "constants/language";

import { Error } from "@material-ui/icons";

const ErrorAssertionModal = (props) => {
    const {className, ...rest} = props;

    return (
        <AssertionBaseModal
            {...rest}
            className={Utilities.injectClassNames(className, "ErrorAssertionModal")}

            icon={<Error className="ErrorAssertionModal__icon"/>}
        />
    );
};

ErrorAssertionModal.propTypes = {
    className: PropTypes.string,
    title: PropTypes.node
};

ErrorAssertionModal.defaultProps = {
    title: `${LANG_CONST.ERROR_TITLE}`
};

export default ErrorAssertionModal;