import React from "react";

import { widgetBaseTypes } from "constants/widgets";

// Widget imports
import HTMLContainerWidget from "components/widgets/bases/HTMLContainerWidget/HTMLContainerWidget";
import RichTextWidget from "components/widgets/bases/RichTextWidget/RichTextWidget";
import WorkflowWidget from "components/widgets/bases/WorkflowWidget/WorkflowWidget";
import MarginalsWidget from "components/widgets/bases/MarginalsWidget/MarginalsWidget";

// Widget config imports
import HTMLContainerWidgetConfig from "components/widgets/bases/HTMLContainerWidget/HTMLContainerWidgetConfig";
import RichTextWidgetConfig from "components/widgets/bases/RichTextWidget/RichTextWidgetConfig";
import WorkflowWidgetConfig from "components/widgets/bases/WorkflowWidget/WorkflowWidgetConfig";
import MarginalsWidgetConfig from "components/widgets/bases/MarginalsWidget/MarginalsWidgetConfig";

// Widget lifecycle imports
import HTMLContainerWidgetLifecycle from "components/widgets/bases/HTMLContainerWidget/HTMLContainerWidgetLifecycle";
import RichTextWidgetLifecycle from "components/widgets/bases/RichTextWidget/RichTextWidgetLifecycle";
import WorkflowWidgetLifecycle from "components/widgets/bases/WorkflowWidget/WorkflowWidgetLifecycle";
import MarginalsWidgetLifecycle from "components/widgets/bases/MarginalsWidget/MarginalsWidgetLifecycle";

// Mapping setup
const BASE_WIDGET_MAPPINGS = {
    [widgetBaseTypes.HTML_CONTAINER_WIDGET]: HTMLContainerWidget,
    [widgetBaseTypes.RICH_TEXT_WIDGET]: RichTextWidget,
    [widgetBaseTypes.WORKFLOW_WIDGET]: WorkflowWidget,
    [widgetBaseTypes.MARGINALS_WIDGET]: MarginalsWidget,
};

const BASE_WIDGET_CONFIG_MAPPINGS = {
    [widgetBaseTypes.HTML_CONTAINER_WIDGET]: HTMLContainerWidgetConfig,
    [widgetBaseTypes.RICH_TEXT_WIDGET]: RichTextWidgetConfig,
    [widgetBaseTypes.WORKFLOW_WIDGET]: WorkflowWidgetConfig,
    [widgetBaseTypes.MARGINALS_WIDGET]: MarginalsWidgetConfig,
};

const BASE_WIDGET_LIFECYCLE_MAPPINGS = {
    [widgetBaseTypes.HTML_CONTAINER_WIDGET]: HTMLContainerWidgetLifecycle,
    [widgetBaseTypes.RICH_TEXT_WIDGET]: RichTextWidgetLifecycle,
    [widgetBaseTypes.WORKFLOW_WIDGET]: WorkflowWidgetLifecycle,
    [widgetBaseTypes.MARGINALS_WIDGET]: MarginalsWidgetLifecycle,
};

class WidgetManager {
    // ------------------------------
    // --- Base Component Getters ---
    // ------------------------------

    getWidgetBaseComponent(i_sType) {
        return BASE_WIDGET_MAPPINGS[i_sType];
    }

    // -----------------------------
    // --- Configuration Getters ---
    // -----------------------------

    getWidgetBaseConfigurationComponent(i_sType, i_oProps) {
        const ConfigComponent = BASE_WIDGET_CONFIG_MAPPINGS[i_sType];

        if (!ConfigComponent) {
            throw new Error(`Error: widget type '${i_sType}' does not have a config component`);
        }

        return <ConfigComponent { ...i_oProps }></ConfigComponent>;
    }

    // -------------------------
    // --- Lifecycle Getters ---
    // -------------------------

    getWidgetBaseLifecycle(i_sType) {
        const oLifecycle = BASE_WIDGET_LIFECYCLE_MAPPINGS[i_sType];

        if (!oLifecycle) {
            throw new Error(`Error: widget type '${i_sType}' does not have a lifecycle component`);
        }

        return oLifecycle;
    }

    getWidgetBaseLifecycleFunction(i_sType, i_sFunctionName) {
        const fnFunc = this.getWidgetBaseLifecycle(i_sType)[i_sFunctionName];

        if (!fnFunc) {
            throw new Error(`Error: widget type '${i_sType}' does not have the '${i_sFunctionName}' lifecycle function`);
        }

        return fnFunc;
    }

    getWidgetBaseLifecycleOnCreate(i_sType) {
        return this.getWidgetBaseLifecycleFunction(i_sType, "onCreate");
    }

    getWidgetBaseLifecycleOnUpdate(i_sType) {
        return this.getWidgetBaseLifecycleFunction(i_sType, "onUpdate");
    }

    getWidgetBaseLifecycleOnRemove(i_sType) {
        return this.getWidgetBaseLifecycleFunction(i_sType, "onRemove");
    }
}

export let widgetManager = new WidgetManager();

export default { 
    widgetManager
};