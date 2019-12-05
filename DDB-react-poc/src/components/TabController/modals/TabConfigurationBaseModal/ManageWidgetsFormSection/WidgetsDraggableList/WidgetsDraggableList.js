import React from "react";
import "./WidgetsDraggableList.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import { connect as connectFormik } from "formik";

import { connect as connectRedux } from "react-redux";

import DataPairedDraggableList from "components/forms/DataPairedDraggableList/DataPairedDraggableList";

const WidgetsDraggableList = (props) => {
    const { className, formik, widgetsOrderName, widgetsDataName, ...rest } = props;

    const renderWidgetItem = (i_sWidgetID) => {
        const { widgetPresets } = props;
        const oWidgetData = formik.values.widgets[i_sWidgetID];

        if (!oWidgetData) {
            return null;
        }

        const { presetType, presetID } = oWidgetData;
        const oPreset = widgetPresets[presetType][presetID];
        const sPresetName = (oPreset) ? oPreset.name : null;

        return (
            <span>{sPresetName}</span>
        );
    };

    const sClasses = Utilities.injectClassNames("WidgetsDraggableList", className);

    return (
        <DataPairedDraggableList
            // Overridable props
            axis="y"
            lockAxis="y"
            distance={5}
            useDragHandle={true}
            lockToContainerEdges={true}

            { ...rest }

            className={sClasses}
            name={widgetsOrderName}
            dataName={widgetsDataName}
            renderItem={renderWidgetItem}
        />
    );
};

WidgetsDraggableList.propTypes = {
    className: PropTypes.string,

    // Formik state names
    widgetsOrderName: PropTypes.string.isRequired, // points to: array of strings
    widgetsDataName: PropTypes.string.isRequired, // points to: object of widget data 

    onItemRemove: PropTypes.func, // Params: index (number)

    // Maped store state to props
    widgetPresets: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    widgetPresets: state.present.widget.presets,
}); 

const mapDispatchToProps = () => ({}); // do nothing

export default connectRedux(mapStateToProps, mapDispatchToProps)(connectFormik(WidgetsDraggableList));
