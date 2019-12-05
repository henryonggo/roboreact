import React from "react";
import "./Checkbox.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

const Checkbox = (props) => {
    const { className, onClick, onChange, selected, id, disabled } = props;
    const sClasses = Utilities.injectClassNames(className, "Checkbox__checkbox-custom");

    const onClickFunc = (e) => { 
        e.preventDefault(); 
        e.stopPropagation(); 
        if (!disabled) {
            Utilities.runFunctions(onClick);
        }
    };

    const onChangeFunc = () => Utilities.runFunctions(onChange);

    return (
        <>
            <input 
                type="checkbox" 
                checked={selected}
                className="Checkbox__checkbox"
                id={id}
                onChange={onChangeFunc}
                disabled={disabled}
            />
            <div 
                className={sClasses} 
                onClick={onClickFunc}
            />
        </>
    );
};

Checkbox.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    selected: PropTypes.bool,
    id: PropTypes.string,
    disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
    selected: false,
    disable: false,
};

export default Checkbox;
