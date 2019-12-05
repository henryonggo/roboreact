const GREY1 = "#D7D7D7";
const GREY2 = "#434343";
const GREY3 = "#E8E8E8";
const GREY4 = "#A0A0A0";
const GREY5 = "#C2C2C2";
const PURP1 = "#AD8BC9";

const RED1 = "#ED665D";
const RED2 = "#DE4B41";

const WHITE = "#FFFFFF"

// Supported color formats: RGB, Hex, HSL
const template = {
    id: "Classic",
    "display-color": "#C594EE",
    BASE: {
        "text-color": {
            "primary": "#000000",
            "secondary": "#424242",
        },
        "bg-color": {
            "primary": "#FFFFFF",
            "secondary": GREY1,
        },
        "accent-color": {
            "primary": PURP1,
            "secondary": RED2,
        },
        "selected-color": {
            "primary": RED1,
            "secondary": PURP1
        },
        "icon-color": {
            "primary": RED2,
            "secondary": "#000000",
        },
        "scrollbar-color": {
            "primary": "#A0A0A0",
            "secondary": "#8E8E8E"
        },
        "button-color": {
            "primary": GREY4,
            "secondary": PURP1
        },
        "info-color": {
            "primary": "#000000",
            "secondary": "#424242",
        },
        "error-color": {
            "primary": "#FF3939",
            "secondary": "#FF2222"
        },
        "warning-color": {
            "primary": "#AC8500",
            "secondary": "#9A7700"
        }
    },
    subSections: {
        widget: {
            "bg-color": {
                "primary": GREY3
            },
            "accent-color": {
                "primary": "#434A54"
            },
            "text-color": {
                "primary": "#000000",
                "secondary": "#FFFFFF"
            }
        },
        "widget__icon": {
            "text-color": {
                "primary": GREY1
            }
        },
        modal: {
            "bg-color": {
                "primary": GREY3
            },
            "accent-color": {
                "primary": GREY2
            },
            "text-color": {
                "primary": "#FFFFFF",
                "secondary": GREY1
            }
        },
        "modal__icon": {
            "text-color": {
                "primary": GREY1
            }
        },
        notification: {
            "accent-color": {
                "primary": "rgb(129, 129, 129)"
            }
        },
        "checkbox": {
            "accent-color": {
                "primary": WHITE,
                "secondary": "rgb(136, 136, 136)"
            },
            "selected-color": {
                "primary": PURP1,
                "secondary": GREY4
            }
        },
        "CheckboxField": {
            "accent-color": {
                "primary": GREY4,
                "secondary": "rgb(136, 136, 136)"
            },
            "selected-color": {
                "primary": PURP1,
                "secondary": GREY4
            }
        },
        TabItem: {
            "selected-color": {
                "secondary": GREY1
            }
        },
        "FormSection": {
            "bg-color": {
                "primary": GREY5
            }
        },
        "InputField": {
            "text-color": {
                "primary": "rgba(0, 0, 0)",
                "secondary": "rgba(70, 70, 70)"
            },
            "bg-color": {
                "primary": "rgba(255, 255, 255)"
            }
        },
        "ListItem": {
            "selected-color": {
                "primary": "#909090"
            }
        }
    }
};

// export default template;
module.exports = template;