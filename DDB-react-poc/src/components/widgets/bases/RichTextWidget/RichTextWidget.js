import React, { Component } from "react";
import "./RichTextWidget.scss";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { RICH_TEXT_WIDGET } from "constants/widgets/widgetBaseTypes";

import { Editor } from "react-draft-wysiwyg";
import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export class RichTextWidget extends Component {
    render() {
        const { widgetPresets, widgetPresetID } = this.props;
        const widgetPreset = widgetPresets[widgetPresetID];
        const { contentState } = widgetPreset.customData;

        const oContentState = JSON.parse(contentState);

        return (
            <div className="RichTextWidget">
                <Editor
                    contentState={oContentState}
                    toolbarHidden={true}
                    readOnly={true}
                    
                    wrapperClassName="RichTextWidget__wrapper"
                    editorClassName="RichTextWidget__editor"
                    toolbarClassName="RichTextWidget__toolbar"
                />
            </div>
        );
    }
}

RichTextWidget.propTypes = {
    widgetPresetID: PropTypes.string.isRequired,

    // Mapped store state
    widgetPresets: PropTypes.object.isRequired,
};

RichTextWidget.defaultProps = {

};

const mapStateToProps = (state) => {
    return {
        widgetPresets: state.present.widget.presets[RICH_TEXT_WIDGET],
    };
};


export default connect(mapStateToProps, null)(RichTextWidget);

