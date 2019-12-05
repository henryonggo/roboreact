import React from "react";
import "./TagListFormSection.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import update from "immutability-helper";
import { connect as connectFormik, getIn } from "formik";
import { modalManager } from "managers";
import { modalTypes } from "constants/modals";

import FormSection from "components/forms/FormSection/FormSection";
import IconButton from "components/ui/button/IconButton/IconButton";
import { Add } from "@material-ui/icons";
import TagItem from "components/ui/TagItem/TagItem";

const TagListFormSection = (props) => {
    const { className, formik, name, ...rest } = props;

    const sTags = getIn(formik.values, name);

    const addNewTagModalOpenHandler = () => {
        modalManager.openModal(modalTypes.TAG_ADD, {
            onConfirm: addNewTagModalSubmitHandler
        });
    };

    const addNewTagModalSubmitHandler = ({ tagName }) => {
        const sUpdatedTags = update(sTags, {
            $apply: i_sTags => Utilities.trim(`${i_sTags}; ${tagName}`, "; ")
        });

        formik.setFieldValue(name, sUpdatedTags);
    };

    const renderTagItems = () => {
        const aTagItems = sTags.split("; ");

        // If there is only an empty string in the tag items list then don't render anything
        if (aTagItems.length === 1 && aTagItems[0] === "") {
            return null;
        }

        return (
            aTagItems.map(( i_sTagItem, i_nIdx) => (
                <TagItem
                    key={i_nIdx}
                    removable={true}
                    onRemove={() => removeTagHandler(i_sTagItem)}
                >
                    { i_sTagItem}
                </TagItem>
            ))
        );
    };

    const removeTagHandler = (i_sTagName) => {
        const sUpdatedTags = update(sTags, {
            $apply: (i_sTags) => {
                let sTrimmed = i_sTags;
                sTrimmed = sTrimmed.replace(`; ${i_sTagName}`, ""); // Cut tag if in middle
                sTrimmed = sTrimmed.replace(`${i_sTagName}`, ""); // Cut tag if on the edge
                sTrimmed = Utilities.trim(sTrimmed, "; "); // Trim any remaining separators
                return sTrimmed;
            }
        });

        formik.setFieldValue(name, sUpdatedTags);
    };

    const sClasses = Utilities.injectClassNames("TagListFormSection", className);

    return (
        <FormSection
            title="Tags"
            shrinkable={true}
            scrollable={false}
            indentLevel={1}

            { ...rest }

            className={sClasses}
            extensionItem={<IconButton><Add/></IconButton>}
            extensionItemOnClick={addNewTagModalOpenHandler}
        >
            <div className="TagListFormSection__tag-item-list">
                { renderTagItems() }
            </div>
        </FormSection>
    );
};

TagListFormSection.propTypes = {
    className: PropTypes.string,

    formik: PropTypes.object.isRequired,

    // Formik state props
    name: PropTypes.string.isRequired,
};

export default connectFormik(TagListFormSection);
