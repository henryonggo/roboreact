import React from "react";
import "./SpinnerLoader.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import CustomValidators from "utilities/customValidators";

const SpinnerLoader = (props) => {
    const { size, thickness } = props;

    const sClassNames = props.className;

    const oBaseStyles = {
        width: `${size}`,
        height: `${size}`,
    };

    const oCommonSpinnerStyles = {
        borderRight: `${thickness} solid transparent`,
        borderLeft: `${thickness} solid transparent`,
        borderTopWidth: `${thickness}`,
        borderBottomWidth: `${thickness}`,
    };

    const oSpinner1Styles = {
        width: `${size}`,
        height: `${size}`,
    };

    const oSpinner2Styles = {
        top: `${thickness}`,
        left: `${thickness}`,
        width: `calc(${size} - ${thickness} * 2)`,
        height: `calc(${size} - ${thickness} * 2)`,
    };

    return (
        <div 
            className={Utilities.injectClassNames("SpinnerLoader", sClassNames)} 
            style={oBaseStyles}
        >
            <div 
                className="SpinnerLoader__spinner-1" 
                style={{...oCommonSpinnerStyles, ...oSpinner1Styles}}
            />
            <div 
                className="SpinnerLoader__spinner-2" 
                style={{...oCommonSpinnerStyles, ...oSpinner2Styles}}
            />
        </div>
    );
};

SpinnerLoader.propTypes = {
    className: PropTypes.string,
    size: CustomValidators.CSSLength,
    thickness: CustomValidators.CSSLength,
};

SpinnerLoader.defaultProps = {
    size: "2rem",
    thickness: "0.2rem",
};

export default SpinnerLoader;
