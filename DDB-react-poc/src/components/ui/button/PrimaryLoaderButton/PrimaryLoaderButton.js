import React from "react";
import "./PrimaryLoaderButton.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import PrimaryButton from "components/ui/button/PrimaryButton/PrimaryButton";
import SpinnerLoader from "components/ui/loaders/SpinnerLoader/SpinnerLoader";

const SPACING_AMOUNT = "0.3rem";
const SPINNER_SIZE = "1.5rem";

const PrimaryLoaderButton = (props) => {
    const { className, children, disabled, loading, ...rest } = props;

    const sLoadingModifierClass = (loading) ? "loading" : "";
    const sClasses = Utilities.injectClassNames(className, "PrimaryLoaderButton", sLoadingModifierClass);

    const oBaseStyles = {
        paddingLeft: (loading) ? `calc(${SPINNER_SIZE} + ${SPACING_AMOUNT})` : "0",
    };

    return (
        <PrimaryButton
            { ...rest }
            className={sClasses}
            disabled={loading || disabled}
        >
            <div
                className="PrimaryLoaderButton__container"
                style={oBaseStyles}
            >
                <SpinnerLoader 
                    className="PrimaryLoaderButton__spinner"
                    size={SPINNER_SIZE}
                />
                { children }
            </div>
        </PrimaryButton>
    );
};

PrimaryLoaderButton.propTypes = {
    className: PropTypes.string,
    loading: PropTypes.bool,
};

PrimaryLoaderButton.defaultProps = {
    loading: false,
};

export default PrimaryLoaderButton;
