import React from "react";
import "./ListItem.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

const ListItem = (props) => {
    const { tag, prefixItems, suffixItems, className, onClick, children } = props;

    const ContainerElement = tag;
    const sClassNames = Utilities.injectClassNames("ListItem", className);

    const onClickFunc = (e) => {e.preventDefault(); Utilities.runFunctionsWithParams([e], onClick); };

    return (
        <ContainerElement className={sClassNames} onClick={onClickFunc}>
            <div className="ListItem__super-container">
                <div className="ListItem__prefix-container">
                    { Utilities.renderNodeList(prefixItems) }
                </div>
                <div className="ListItem__children-container">
                    { children }
                </div>

                <div className="ListItem__suffix-container">
                    { Utilities.renderNodeList(suffixItems) }
                </div>
            </div>
        </ContainerElement>
    );
};

ListItem.propTypes = {
    tag: PropTypes.string,
    className: PropTypes.string,
    prefixItems: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    suffixItems: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
};

ListItem.defaultProps = {
    tag: "div",
    className: null,
    prefixItems: null,
    suffixItems: null,
};

export default ListItem;
