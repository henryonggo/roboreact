import React from "react";
import "./CheckboxList.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import update from "immutability-helper";

import { connect as connectFormik, getIn } from "formik";

import ListItem from "components/ui/ListItem/ListItem";
import IconButton from "components/ui/button/IconButton/IconButton";
import { Close } from "@material-ui/icons";
import Checkbox from "components/forms/Checkbox/Checkbox";

const CheckboxList = (props) => {
    const { formik, className, name, renderItem, onItemRemove, extensionItem, extensionItemOnClick, 
        onItemToggle, disabledAll, disableItemRemoval, disableExtensionItems } = props;

    const aItems = getIn(formik.values, name);

    const _checkboxToggleFunc = (i_sID, i_bDisabled, i_nIdx) => {
        // Make sure checkbox is not disabled
        if (disabledAll || i_bDisabled) {
            return;
        }

        // Update form state
        const oUpdatedState = update(aItems, {
            [i_nIdx]: { selected: { $apply: (i_bSelected) => !i_bSelected }}
        });
        formik.setFieldValue(name, oUpdatedState);

        // Run the item toggle prop func, if there is any
        Utilities.runFunctionsWithParams([i_sID, i_nIdx], onItemToggle);
    };

    const _renderCheckboxListItem = (i_oItem, i_nIdx) => {
        const { id, selected, disabled } = i_oItem;
    
        return (
            <ListItem
                key={id}
                className="CheckboxList__list-item"
                prefixItems={_renderCheckbox(id, selected, disabled, i_nIdx)}
                suffixItems={([ _renderExtensionItem(id, i_nIdx), _renderCloseButton(id, i_nIdx) ])}
                onClick={() => _checkboxToggleFunc(id, disabled, i_nIdx)}
            >
                { renderItem(i_oItem, i_nIdx) }
            </ListItem>
        );
    };
    
    const _renderCheckbox = (i_sID, i_bSelected, i_bDisabled, i_nIdx) => {
        return (
            <Checkbox 
                selected={i_bSelected}
                disabled={i_bDisabled || disabledAll}
                onClick={() => _checkboxToggleFunc(i_sID, i_bDisabled, i_nIdx) }
            />
        );
    };

    const _renderExtensionItem = (i_sID, i_nIdx) => {
        const onClickFunc = (e) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            Utilities.runFunctionsWithParams([i_sID, i_nIdx], extensionItemOnClick); 
        };

        return (
            (React.isValidElement(extensionItem)) ?
                <IconButton
                    tag="div"
                    className="CheckboxList__extension-item"
                    onClick={onClickFunc}
                    disabled={disableExtensionItems}
                >
                    { extensionItem }
                </IconButton>
                : null
        );
    };

    const _renderCloseButton = (i_sID, i_nIdx) => {
        // disableItemRemoval

        const onClickFunc = (e) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            Utilities.runFunctionsWithParams([i_sID, i_nIdx], onItemRemove); };

        return (
            <IconButton
                tag="div"
                className="CheckboxList__remove-button"
                onClick={onClickFunc}
                disabled={disableItemRemoval}
            >
                <Close/>
            </IconButton>
        );
    };

    const sClassNames = Utilities.injectClassNames(className, "CheckboxList");

    return (
        <div className={sClassNames}>
            {
                aItems.map((i_oItem, i_nIdx) => (
                    _renderCheckboxListItem(i_oItem, i_nIdx)
                ))
            }
        </div>
    );
};

CheckboxList.propTypes = {
    // Formik connection mapping
    formik: PropTypes.object.isRequired,

    className: PropTypes.string,

    // Formik state names
    name: PropTypes.string.isRequired, // points to: array [ { id: String, selected: Boolean, disabled: Boolean }, ...]

    disabledAll: PropTypes.bool,

    disableItemRemoval: PropTypes.bool,
    onItemRemove: PropTypes.func.isRequired, // Params: id (String), index (Number)
    onItemToggle: PropTypes.func.isRequired, // Params: id (String), index (Number)

    disableExtensionItems: PropTypes.bool,
    extensionItem: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    extensionItemOnClick: PropTypes.func, // Params: id (String), index (Number)

    renderItem: PropTypes.func, // Params: item (Item Object), index (Number)
};

CheckboxList.defaultProps = {
    disabledAll: false,
    renderItem: (i_oItem) => i_oItem.id,
    disableItemRemoval: false,
    disableExtensionItems: false,
};

export default connectFormik(CheckboxList);

