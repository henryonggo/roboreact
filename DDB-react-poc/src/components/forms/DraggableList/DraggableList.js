import React, { Component } from "react";
import "./DraggableList.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import update from "immutability-helper";

import { sortableContainer, sortableElement, sortableHandle, arrayMove } from "react-sortable-hoc";
import IconButton from "components/ui/button/IconButton/IconButton";
import { Close, DragHandle } from "@material-ui/icons";
import ListItem from "components/ui/ListItem/ListItem";

import { connect as connectFormik, getIn } from "formik";

const DragHandleItem = sortableHandle(() => <DragHandle className="DraggableList__grab-icon" />);

const SortableItem = sortableElement((props) => {
    const { children, className, useDragHandle, onRemove, extensionItem,
        extensionItemOnClick, disableExtensionItem, disableRemoval, itemIndex, value } = props;

    const dragHandle = (useDragHandle) ? <DragHandleItem /> : null;
    const renderExtensionItem = (
        (extensionItem) ?
            <IconButton
                tag="div"
                className="DraggableList__extension-item"
                onClick={() => extensionItemOnClick(itemIndex, value)}
                disabled={disableExtensionItem}
            >
                {extensionItem}
            </IconButton>
            : null
    );
    const renderCloseButtonItem = (
        <IconButton
            tag="div"
            className="DraggableList__remove-button"
            onClick={(e) => { e.preventDefault(); onRemove(itemIndex, value); }}
            disabled={disableRemoval}
        >
            <Close />
        </IconButton>
    );

    return (
        <ListItem
            tag="li"
            className={Utilities.injectClassNames(className, "DraggableList__list-item")}
            prefixItems={dragHandle}
            suffixItems={[renderExtensionItem, renderCloseButtonItem]}
        >
            {children}
        </ListItem>
    );
});

const SortableContainer = sortableContainer(({ children }) => {
    return (
        <ul className="DraggableList__list-container">
            {children}
        </ul>
    );
});

class DraggableList extends Component {
    constructor(props) {
        super(props);

        this.wrapperEl = null;
    }

    _getWrapperElement = () => this.wrapperEl;

    fnOnSortEndHandler = ({ oldIndex, newIndex }) => {
        const { formik, name } = this.props;
        const asValues = getIn(formik.values, name);

        // Reorder the values
        const asMovedValues = arrayMove(asValues, oldIndex, newIndex);

        // Update the form state
        formik.setFieldValue(name, asMovedValues);
    };

    fnOnItemRemoveHandler = (i_nIndex) => {
        const { formik, name } = this.props;
        const asValues = getIn(formik.values, name);
        const asRemovedValues = update(asValues, { $splice: [[i_nIndex, 1]] });

        // Update form state
        formik.setFieldValue(name, asRemovedValues);
    };


    render() {
        const { className, listItemClassName, formik, name, renderItem, extensionItem, extensionItemOnClick,
            disableExtensionItems, onItemRemove, disableItemRemoval, helperClass, ...rest } = this.props;

        const onSortEndMerged = (i_oData) => Utilities.runFunctionsWithParams([i_oData], this.fnOnSortEndHandler, rest.onSortEnd);
        const onItemRemoveMerged = (i_nIndex, i_sValue) => Utilities.runFunctionsWithParams([i_nIndex, i_sValue], this.fnOnItemRemoveHandler, onItemRemove);

        const sClasses = Utilities.injectClassNames(className, "DraggableList");

        const asValues = getIn(formik.values, name);

        return (
            <div className={sClasses} ref={el => this.wrapperEl = el}>
                <SortableContainer
                    helperContainer={this._getWrapperElement}
                    {...rest}
                    onSortEnd={onSortEndMerged}

                    helperClass={Utilities.injectClassNames(helperClass, "dragging")}
                >
                    {
                        asValues.map((i_sValue, i_nIndex) => {
                            return (
                                <SortableItem
                                    key={i_nIndex}
                                    index={i_nIndex}
                                    disableRemoval={disableItemRemoval}
                                    onRemove={onItemRemoveMerged}
                                    useDragHandle={rest.useDragHandle}
                                    className={listItemClassName}

                                    itemIndex={i_nIndex}
                                    value={i_sValue}
                                    disableExtensionItem={disableExtensionItems}
                                    extensionItem={extensionItem}
                                    extensionItemOnClick={extensionItemOnClick}
                                >
                                    {renderItem(i_sValue, i_nIndex)}
                                </SortableItem>
                            );
                        })
                    }
                </SortableContainer>
            </div>
        );
    }
}

DraggableList.propTypes = {
    formik: PropTypes.object.isRequired,

    // Formik state name
    name: PropTypes.string.isRequired, // points to: array of strings

    className: PropTypes.string,
    listItemClassName: PropTypes.string,

    renderItem: PropTypes.func, // Params: value (String), index: (Number)
    disableItemRemoval: PropTypes.bool,
    onItemRemove: PropTypes.func.isRequired, // Params: index (number)

    disableExtensionItems: PropTypes.bool,
    extensionItem: PropTypes.node,
    extensionItemOnClick: PropTypes.func, // Params: index (number)
};

DraggableList.defaultProps = {
    disableItemRemoval: false,
    disableExtensionItems: false,
    extensionItem: null,
    renderItem: (i_sCurrValue) => i_sCurrValue, // By default just raw render out the value string
};

export default connectFormik(DraggableList);