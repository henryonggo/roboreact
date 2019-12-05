const BLACK1 = "#24272B";
const BLACK2 = "#282B30";
const BLACK3 = "#31353B";
const BLACK4 = "#373B42";
const BLACK5 = "#3F444C";
const BLACK6 = "#4C525C";
const BLACK7 = "#A0A8B5";
const BLACK8 = "#464747";

const WHITE = "rgba(255, 255, 255)"

const template = {
    id: "Dark",
    "display-color": "#555C66",
    BASE: {
        "text-color": {
            "primary": WHITE,
            "secondary": "rgb(192, 192, 192)"
        },
        "bg-color": {
            "primary": BLACK1,
            "secondary": BLACK2
        },
        "accent-color": {
            "primary": BLACK5,
            "secondary": BLACK4
        },
        "selected-color": {
            "primary": BLACK7,
            "secondary": BLACK6
        },
        "icon-color": {
            "primary": WHITE,
            "secondary": "rgb(240, 240, 240)"
        },
        "scrollbar-color": {
            "primary": "rgb(85, 85, 85)",
            "secondary": "rgb(68, 68, 68)"
        },
        "button-color": {
            "primary": BLACK5,
            "secondary": BLACK6
        },
        "info-color": {
            "primary": WHITE,
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
                "primary": BLACK3,
                "secondary": BLACK2
            }
        },
        widget: {
            "text-color": {
                "secondary": "#FFFFFF"
            },
            "bg-color": {
                "primary": BLACK3,
                "secondary": BLACK3
            }
        },
        icon: {
            "text-color": {
                "primary": "rgb(180, 180, 180)"
            },
            "accent-color": {
                "primary": WHITE,
                "secondary": "rgb(240, 240, 240)"
            }
        },
        notification: {
            "bg-color": {
                "primary": BLACK5
            },
            "accent-color": {
                "primary": BLACK7
            }
        },
        TabView: {
            "bg-color": {
                primary: BLACK1
            }
        },
        "TabBar__hamburger": {
            "bg-color": {
                "primary": BLACK6,
                "secondary": BLACK5
            }
        },
        "TabView__placeholder": {
            "bg-color": {
                "primary": "rgb(136, 136, 136)"
            }
        },
        TabItem: {
            "selected-color": {
                "primary": BLACK7,
                "secondary": BLACK6
            },
            "accent-color": {
                "secondary": BLACK7
            }
        },
        spinner: {
            "accent-color": {
                "primary": "rgb(255, 255, 255)"
            }
        },
        "FormSection": {
            "bg-color": {
                "primary": BLACK5
            }
        },
        "checkbox": {
            "accent-color": {
                "secondary": BLACK8
            }
        },
        "InputField": {
            "text-color": {
                "primary": "rgb(0, 0, 0)",
                "secondary": "rgb(70, 70, 70)"
            },
            "bg-color": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(136, 136, 136)"
            }
        },
        "CheckboxField": {
            "text-color": {
                "secondary": "rgb(70, 70, 70)"
            }
        },
        "ListItem": {
            "selected-color": {
                "primary": "rgb(197, 197, 197)"
            }
        },
        "FileField": {
            "bg-color": {
                "secondary": "rgb(150, 150, 150)",
            },
            "text-color": {
                "primary": "rgb(0, 0, 0)"
            }
        }
    }
};

// export default template;
module.exports = template;
