import React from "react";
import "./TagItem.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import { Close } from "@material-ui/icons";

const TagItem = (props) => {
    const { className, children, removable, onRemove, onClick } = props;
    const sClassNames = Utilities.injectClassNames(className, "TagItem");

    const removeFunc = (e) => { e.preventDefault(); e.stopPropagation(); Utilities.runFunctionsWithParams([e], onRemove); };
    const onClickFunc = (e) => { e.preventDefault(); e.stopPropagation(); Utilities.runFunctionsWithParams([e], onClick); };

    const renderCloseButton = () => (
        (removable) ?
            <div className="TagItem__close-button" onClick={removeFunc}>
                <Close/>
            </div>
            : null
    );

    return (
        <div className={sClassNames} onClick={onClickFunc}>
            <div className="TagItem__content" >
                { children }
            </div>
            { renderCloseButton() }
        </div>
    );
};

TagItem.propTypes = {
    removable: PropTypes.bool, 
    onRemove: PropTypes.func,
    onClick: PropTypes.func, 
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
};

TagItem.defaultProps = {
    removable: false,
};

export default TagItem;
