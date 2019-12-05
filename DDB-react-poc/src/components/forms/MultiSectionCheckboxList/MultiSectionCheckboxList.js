import React from "react";
import PropTypes from "prop-types";
import Utilities from "utilities";

import { connect as connectFormik, getIn } from "formik";

import FormSection from "components/forms/FormSection/FormSection";
import CheckboxList from "components/forms/CheckboxList/CheckboxList";

const MultiSectionCheckboxList = (props) => {
    const { formik, name, renderSectionTitle, renderItem, onItemToggle, onItemRemove,
        indentLevel, disabledSections, extensionItem, extensionItemOnClick, disabledAll,
        disableItemRemoval, disableExtensionItems } = props;

    const renderCheckboxSections = () => {
        const aSections = getIn(formik.values, name);

        return aSections.map((i_oSection, i_nIdx) => {
            const { name: sSectionName } = i_oSection;

            // Do not render empty sections
            if (!i_oSection.items || i_oSection.items.length <= 0) {
                return null;
            }

            return (
                <FormSection
                    key={i_nIdx}
                    title={renderSectionTitle(sSectionName)}
                    
                    shrinkable={true}
                    indentLevel={indentLevel}
                >
                    { renderCheckboxList(sSectionName, i_nIdx) }
                </FormSection>
            );
        });
    };

    const renderCheckboxList = (i_sSectionName, i_nSectionIdx) => {
        const sCheckboxName = `${name}[${i_nSectionIdx}].items`;

        const onItemRemoveHandler = (i_sID, i_nIdx) => Utilities.runFunctionsWithParams([i_nSectionIdx, i_sID, i_nIdx], onItemRemove);
        const onItemToggleHandler = (i_sID, i_nIdx) => Utilities.runFunctionsWithParams([i_nSectionIdx, i_sID, i_nIdx], onItemToggle);
        const extensionItemOnClickHandler = (i_sID, i_sIndex) => Utilities.runFunctionsWithParams([i_nSectionIdx, i_sID, i_sIndex], extensionItemOnClick);

        const oRenderItemSectionParam = { sectionName: i_sSectionName, sectionIndex: i_nSectionIdx };
        const renderItemHandler = (i_oItem, i_nIdx) => renderItem(oRenderItemSectionParam, { item: i_oItem, itemIndex: i_nIdx });

        const bDisableCheckboxList = disabledSections.indexOf(i_sSectionName) > -1 || disabledAll;

        return (
            <CheckboxList 
                key={i_nSectionIdx}
                name={sCheckboxName}
                disabledAll={bDisableCheckboxList}
                
                disableItemRemoval={disableItemRemoval}
                onItemRemove={onItemRemoveHandler}
                onItemToggle={onItemToggleHandler}

                disableExtensionItems={disableExtensionItems}
                extensionItem={extensionItem}
                extensionItemOnClick={extensionItemOnClickHandler}
                
                renderItem={renderItemHandler}
            />
        );
    };

    return (
        <>
            { renderCheckboxSections() }
        </>
    );
};


MultiSectionCheckboxList.propTypes = {
    // Formik state names
    name: PropTypes.string.isRequired, // points to: array [ { name: String, items: [ <CheckboxList name shape>, ...]}, ...]

    onItemRemove: PropTypes.func, // Params: section index (Number), id (String), index (Number)
    onItemToggle: PropTypes.func, // Params: section index (Number), id (String), index (Number)

    disabledSections: PropTypes.arrayOf(PropTypes.string),
    disabledAll: PropTypes.bool,
    indentLevel: PropTypes.number,

    disableItemRemoval: PropTypes.bool,

    disableExtensionItems: PropTypes.bool,
    extensionItem: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    extensionItemOnClick: PropTypes.func, // Params: section index (Number), id (String), index (Number)

    renderSectionTitle: PropTypes.func, // Params: section (String)
    renderItem: PropTypes.func, // Params: { sectionIndex: section index (Number), sectionName: section name (String) }, { item: item (Item Object), itemIndex: item index (Number) }
};

MultiSectionCheckboxList.defaultProps = {
    disabledSections: [],
    disabledAll: false,
    indentLevel: 1,
    disableItemRemoval: false,
    disableExtensionItems: false,
    renderSectionTitle: (i_sSection) => i_sSection,
    renderItem: ({ sectionName, sectionIndex }, { item, itemIndex }) => item.id,
};

export default connectFormik(MultiSectionCheckboxList);
