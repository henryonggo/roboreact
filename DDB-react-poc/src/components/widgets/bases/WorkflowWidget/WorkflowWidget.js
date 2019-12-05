import React, { Component } from "react";
import "./WorkflowWidget.scss";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import GridLayout from "react-grid-layout";
import { withSize } from "react-sizeme";

import { WORKFLOW_WIDGET } from "constants/widgets/widgetBaseTypes";
import workflowButtonLibrary from "./buttons";

const withSizeHOC = withSize();

export class WorkflowWidget extends Component {
    render() {
        const { widgetPresetID, widgetPresets, size } = this.props;
        const { cols, layout, buttons } = widgetPresets[widgetPresetID].customData;

        return (
            <div className="WorkflowWidget">
                <GridLayout
                    className="WorkflowWidget__layout layout"
                    layout={layout}
                    rowHeight={50}
                    cols={cols}
                    width={size.width}

                    isDraggable={false}
                    isResizable={false}
                >
                    {
                        Object.entries(buttons).map(([i_oButtonID, i_oButtonData]) => {
                            const WorkflowButton = workflowButtonLibrary[i_oButtonData.type];
                            return (
                                <div className="WorkflowWidget__button-wrapper" key={i_oButtonID}>
                                    <WorkflowButton {...i_oButtonData} />
                                </div>
                            );
                        })
                    }
                </GridLayout>
            </div>
        );
    }
}

WorkflowWidget.propTypes = {
    widgetPresetID: PropTypes.string.isRequired,
    size: PropTypes.shape({
        height: PropTypes.number,
        width: PropTypes.number
    }).isRequired, // From react-sizeme

    // Mapped store state
    widgetPresets: PropTypes.object.isRequired,
};

WorkflowWidget.defaultProps = {

};

const mapStateToProps = (state) => {
    return {
        widgetPresets: state.present.widget.presets[WORKFLOW_WIDGET],
    };
};

export default connect(mapStateToProps, null)(withSizeHOC(WorkflowWidget));
