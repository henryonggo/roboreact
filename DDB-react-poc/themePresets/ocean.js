const BLUE1 = "rgb(23, 32, 45)";
const BLUE2 = "rgb(32, 42, 59)";
const BLUE3 = "rgb(50, 65, 90)";
const BLUE4 = "rgb(121, 156, 255)";
const BLUE5 = "rgb(75, 120, 161)";
const BLUE6 = "rgb(122, 155, 185)";

const WHITE1 = "rgb(255, 255, 255)";
const WHITE2 = "rgb(240, 240, 240)";

const template = {
    id: "Ocean",
    "display-color": "#657AE1",
    BASE: {
        "text-color": {
            "primary": WHITE1,
            "secondary": "rgb(192, 192, 192)"
        },
        "bg-color": {
            "primary": BLUE1,
            "secondary": BLUE2
        },
        "accent-color": {
            "primary": BLUE3,
            "secondary": BLUE4
        },
        "selected-color": {
            "primary": BLUE5,
            "secondary": BLUE6
        },
        "icon-color": {
            "primary": "rgb(187, 245, 255)",
            "secondary": WHITE2
        },
        "scrollbar-color": {
            "primary": "rgb(85, 85, 85)",
            "secondary": "rgb(68, 68, 68)"
        },
        "button-color": {
            "primary": BLUE5,
            "secondary": BLUE4
        },
        "info-color": {
            "primary": WHITE1,
            "secondary": "rgb(192, 192, 192)"
        },
        "error-color": {
            "primary": "#FF3939",
            "secondary": "#FF2222"
        },
        "warning-color": {
            "primary": "#FCCB21",
            "secondary": "#FDC607"
        }
    },
    subSections: {
        header: {
            "bg-color": {
                "primary": BLUE2,
                "secondary": BLUE1
            }
        },
        widget: {
            "text-color": {
                "secondary": WHITE1
            },
            "bg-color": {
                "primary": BLUE2,
                "secondary": BLUE1
            }
        },
        icon: {
            "text-color": {
                "primary": "rgb(180, 180, 180)"
            },
            "accent-color": {
                "primary": "rgb(187, 245, 255)",
                "secondary": "rgb(240, 240, 240)"
            }
        },
        notification: {
            "bg-color": {
                "primary": BLUE3
            },
            "accent-color": {
                "primary": "rgb(129, 129, 129)"
            }
        },
        TabView: {
            "bg-color": {
                primary: BLUE1
            }
        },
        "TabBar__hamburger": {
            "bg-color": {
                "primary": BLUE3,
                "secondary": BLUE4
            }
        },
        "TabView__placeholder": {
            "bg-color": {
                "primary": "rgb(136, 136, 136)"
            }
        },
        TabItem: {
            "selected-color": {
                "primary": BLUE6,
                "secondary": BLUE5
            }
        },
        spinner: {
            "accent-color": {
                "primary": BLUE4
            }
        },
        "FormSection": {
            "bg-color": {
                "primary": BLUE3
            }
        },
        "InputField": {
            "text-color": {
                "primary": "rgba(0, 0, 0)",
                "secondary": "rgba(70, 70, 70)"
            },
            "bg-color": {
                "primary": "rgba(255, 255, 255)",
                "secondary": "rgb(136, 136, 136)"
            }
        },
        "CheckboxField": {
            "text-color": {
                "primary": "rgba(0, 0, 0)",
                "secondary": "rgba(70, 70, 70)"
            },
            "bg-color": {
                "primary": "rgba(255, 255, 255)",
                "secondary": "rgb(136, 136, 136)"
            },
            "accent-color": {
                "primary": "rgb(192, 192, 192)",
                "secondary": "rgba(70, 70, 70)"
            }
        },
        "FileField": {
            "text-color": {
                "primary": "rgba(0, 0, 0)",
                "secondary": "rgba(70, 70, 70)"
            },
            "bg-color": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(136, 136, 136)"
            },
        },
        "checkbox": {
            "accent-color": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(136, 136, 136)"
            }
        },
        "RichTextWidget": {
            "text-color": {
                "primary": "rgb(255,255,255)"
            },
            "bg-color": {
                "primary": "#283347",
            },
            "link-color": {
                "primary": BLUE4
            }
        },
        "RichTextWidgetConfig": {
            "text-color": {
                "primary": "rgb(255,255,255)"
            },
            "text-color-option-1": {
                "primary": "rgb(255,255,255)"
            },
            "text-color-option-2": {
                "primary": "rgb(226, 80, 65)"
            },
            "text-color-option-3": {
                "primary": "rgb(100, 200, 90)"
            },
            "text-color-option-4": {
                "primary": "#BC7FFF"
            },
            "text-color-option-5": {
                "primary": "#999FFF"
            },
            "text-color-option-6" : {
                "primary": "#FFCE66"
            }
        },
        "ToggleSwitchField": {
            "bg-color": { // Unselected colors
                "primary": BLUE5, // Bg
                "secondary": "rgb(136, 136, 136)" // Handle
            },
            "selected-color": { // Selected colors
                "primary": BLUE4, // Bg
                "secondary": "rgb(192, 192, 192)" // Handle
            },
            "accent-color": { // Disabled colors
                "primary": "rgba(70, 70, 70)", // Bg
                "secondary": "rgba(100, 100, 100)" // Handle
            }
        },
        "ListItem": {
            "selected-color": {
                "primary": "rgba(197, 197, 197)"
            }
        }
    }
};

// export default template;
module.exports = template;