export const baseProperties = [
    "text-color",
    "bg-color",
    "accent-color",
    "selected-color",
    "icon-color",
    "scrollbar-color",
    "button-color",
    "info-color",
    "error-color",
    "warning-color"
];

export const customBaseProperties = {
    "RichTextWidget": [
        "link-color"
    ],
    "RichTextWidgetConfig": [
        "text-color-option-1",
        "text-color-option-2",
        "text-color-option-3",
        "text-color-option-4",
        "text-color-option-5",
        "text-color-option-6",
    ]
};

export const propertyVariations = [
    "primary",
    "secondary"
];

export const subSections = [
    "header",
    "notification",
    "icon",
    "button",
    "input",
    "spinner",
    "loader",
    "checkbox",
    "tag",
    "assertion",
    "loading-screen",

    "widget",
    "widget__icon",
    "widget__resize",

    "modal",
    "modal__icon",
    "modal__resize",
    "modal__button",

    "TabItem",
    "TabItem__icon",

    "TabBar",
    "TabBar__hamburger",
    "TabBar__scrollbar",

    "TabView",
    "TabView__placeholder",
    "TabView__scrollbar",

    "ListItem",
    "ColorPicker",

    "FormSection",
    "FormSection__icon",
    "FormSection__scrollbar",

    "DraggableList",
    "DraggableList__icon",
    "DraggableList__scrollbar",

    "CheckboxList",
    "CheckboxList__icon",
    "CheckboxList__scrollbar",

    "WorkflowWidget",
    "WorkflowWidget__scrollbar",

    "RichTextWidget",
    "RichTextWidget__scrollbar",

    "RichTextWidgetConfig",

    "FormBaseModal__scrollbar", 
    "DocumentTree__scrollbar",

    "BaseField",
    "InputField",
    "CheckboxField",
    "FileField",
    "ToggleSwitchField",
    "DocumentTree",
];

export const fallbackColor = "#ff69b4";

export default {
    baseProperties,
    customBaseProperties,
    propertyVariations,
    subSections,
    fallbackColor
};
