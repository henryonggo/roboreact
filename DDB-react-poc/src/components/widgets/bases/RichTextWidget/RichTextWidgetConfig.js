import React, { Component } from "react";
import "./RichTextWidgetConfig.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import { connect as connectFormik } from "formik";
import { connect as connectRedux } from "react-redux";
import { ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import BaseWidgetConfig from "components/widgets/bases/BaseWidgetConfig";
import FormSection from "components/forms/FormSection/FormSection";
import { linkCustomData } from "components/hoc";

import InlineStyle from "./toolbar/custom/InlineStyle";
import BlockType from "./toolbar/custom/BlockType";
import FontSize from "./toolbar/custom/FontSize";
import FontFamily from "./toolbar/custom/FontFamily";
import ListType from "./toolbar/custom/ListType";
import TextAlign from "./toolbar/custom/TextAlign";
import TextColor from "./toolbar/custom/TextColor";
import Hyperlink from "./toolbar/custom/Hyperlink";
import Embed from "./toolbar/custom/Embed";
import Emoji from "./toolbar/custom/Emoji";
import Image from "./toolbar/custom/Image";
import RemoveFormatting from "./toolbar/custom/RemoveFormatting";

import { RICH_TEXT_WIDGET } from "constants/language";

const DEFAULT_CONFIG = {
    contentState: JSON.stringify(convertToRaw(ContentState.createFromText("")))
};

const oCustomToolbarConfig = {
    options: [
        "inline",
        "blockType",
        "fontSize",
        "fontFamily",
        "list",
        "textAlign",
        "colorPicker",
        "link",
        "embedded",
        "emoji",
        "image",
        "remove"
    ],
    inline: {
        component: InlineStyle,
    },
    blockType: {
        component: BlockType
    },
    fontSize: {
        component: FontSize
    },
    fontFamily: {
        component: FontFamily,
        options: [
            "Arial",
            "Georgia",
            "Impact",
            "Tahoma",
            "Times New Roman",
            "Verdana",
            "Comic Sans MS"
        ]
    },
    list: {
        component: ListType,
    },
    textAlign: {
        component: TextAlign
    },
    colorPicker: {
        component: TextColor,
        colors: ["#FFFFFF", "#BC7FFF", "#BBBFFF", "#CCAAAA"]
    },
    link: {
        component: Hyperlink,
        options: ["link"]
    },
    embedded: {
        component: Embed
    },
    emoji: {
        component: Emoji,
        emojis: [
            "😂", "😃",
            "😉", "😋", "😎", "😍",
            "😗", "🤗", "🤔", "😣",
            "😫", "😴", "😛", "😠",
            "😈", "💪", "👌",
            "👍", "👎", "👏", "🙏",
            "⭐", "🔥", "🎉", "📅",
            "✅", "❎", "💯"
        ]
    },
    image: {
        component: Image,
    },
    remove: {
        component: RemoveFormatting
    }
};

class RichTextWidgetConfig extends Component {
    constructor(props) {
        super(props);

        const { name, initConfig, currentTheme, availableThemes } = this.props;

        // Fill Formik customData config for each custom component.
        Object.values(oCustomToolbarConfig).forEach((oCustomConfig) => {
            if (oCustomConfig.component) {
                oCustomConfig.component = linkCustomData(oCustomConfig.component, name);
            }
        });

        // Load theme colors for editor color picker.
        const rTextColor = /RichTextWidgetConfig___text-color-option.*--primary/;
        oCustomToolbarConfig.colorPicker.colors =
            Object.entries(availableThemes[currentTheme].properties)
                .filter(([i_sPropertyName]) => i_sPropertyName.search(rTextColor) > -1)
                .map((i_sProperty) => `rgb(${i_sProperty[1]})`);

        this.initConfig = initConfig ? initConfig : DEFAULT_CONFIG;
    }

    fnOnContentStateChange = (i_oContentState) => {
        const { formik, name } = this.props;
        const sContentState = JSON.stringify(i_oContentState);
        formik.setFieldValue(`${name}.contentState`, sContentState);
    };

    render() {
        const { name, disabled, ...rest } = this.props;

        const oInitContentState = JSON.parse(this.initConfig.contentState);

        return (
            <BaseWidgetConfig
                {...rest}
                name={name}
                initConfig={this.initConfig}
            >
                <FormSection
                    title={RICH_TEXT_WIDGET.CONFIG_TITLE}
                    className="RichTextWidgetConfig"
                    shrinkable={true}
                    minHeight="10rem"
                    scrollable={true}
                >
                    <Editor
                        toolbar={oCustomToolbarConfig}
                        wrapperClassName={Utilities.injectClassNames(
                            "RichTextWidget__wrapper",
                            disabled && "disabled"
                        )}
                        editorClassName="RichTextWidget__editor"
                        toolbarClassName="RichTextWidget__toolbar"

                        initialContentState={oInitContentState}
                        onContentStateChange={this.fnOnContentStateChange}

                        readOnly={disabled}
                    />
                </FormSection>
            </BaseWidgetConfig>
        );
    }
}

RichTextWidgetConfig.propTypes = {
    // Formik props
    formik: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired, // Points to the custom config object

    disabled: PropTypes.bool,
    initConfig: PropTypes.shape({
        contentState: PropTypes.string
    }).isRequired
};


RichTextWidgetConfig.defaultProps = {
    disabled: false
};

const mapStateToProps = (state) => {
    return {
        currentNamespace: state.present.theme.defaultNamespace,
        currentTheme: state.present.theme.namespaces[state.present.theme.defaultNamespace],
        availableThemes: state.present.theme.themes
    };
};

export default connectRedux(mapStateToProps, null)(connectFormik(RichTextWidgetConfig));
