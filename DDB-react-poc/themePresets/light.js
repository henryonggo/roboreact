const BLUE1 = "rgb(23, 32, 45)";
const BLUE2 = "rgb(32, 42, 59)";
const BLUE3 = "rgb(50, 65, 90)";
const BLUE4 = "rgb(121, 156, 255)";
const BLUE5 = "rgb(75, 120, 161)";
const BLUE6 = "rgb(122, 155, 185)";
const BLUE7 = "rgb(173, 198, 221)"

const LIGHT1 = "rgb(250,250,250)";
const LIGHT2 = "rgb(245,245,245)";
const LIGHT3 = "rgb(238,238,238)";
const LIGHT4 = "rgb(219, 219, 219)";
const LIGHT5 = "rgb(189,189,189)";
const LIGHT6 = "rgb(117,117,117)";

const BLACK = "rgb(0, 0, 0)"
const WHITE = "rgb(255, 255, 255)"

const template = {
    id: "Light",
    "display-color": "#C8C8C8",
    BASE: {
        "text-color": {
            "primary": BLACK,
            "secondary": "rgb(72, 72, 72)",
        },
        "bg-color": {
            "primary": LIGHT1,
            "secondary": LIGHT2
        },
        "accent-color": {
            "primary": LIGHT5,
            "secondary": BLUE4
        },
        "selected-color": {
            "primary": LIGHT5,
            "secondary": LIGHT6
        },
        "icon-color": {
            "primary": BLUE7,
            "secondary": LIGHT4
        },
        "scrollbar-color": {
            "primary": LIGHT5,
            "secondary": LIGHT4
        },
        "button-color": {
            "primary": LIGHT5,
            "secondary": BLUE7
        },
        "info-color": {
            "primary": BLACK,
            "secondary": "rgb(192, 192, 192)"
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
        header: {
            "bg-color": {
                "primary": LIGHT1,
                "secondary": "#000000"
            },
            "text-color": {
                "primary": BLUE5
            }
        },
        widget: {
            "text-color": {
                "secondary": LIGHT2
            },
            "bg-color": {
                "primary": LIGHT1
            },
            "accent-color": {
                "primary": BLUE5
            }
        },
        "checkbox": {
            "accent-color": {
                "primary": WHITE,
                "secondary": "rgb(136, 136, 136)"
            },
            "selected-color": {
                "primary": BLUE7,
                "secondary": LIGHT4
            }
        },
        "CheckboxField": {
            "accent-color": {
                "primary": LIGHT4,
                "secondary": "rgb(136, 136, 136)"
            },
            "selected-color": {
                "primary": BLUE7,
                "secondary": LIGHT4
            }
        },
        modal: {
            "text-color": {
                "primary": LIGHT2,
                "secondary": BLACK
            },
            "accent-color": {
                "primary": BLUE5
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
                "primary": LIGHT3
            },
            "accent-color": {
                "primary": "rgb(129, 129, 129)"
            }
        },
        TabView: {
            "bg-color": {
                primary: LIGHT3
            }
        },
        "TabBar__hamburger": {
            "bg-color": {
                "primary": LIGHT3,
                "secondary": LIGHT5
            },
            "text-color": {
                "primary": BLUE5
            }
        },
        "TabView__placeholder": {
            "bg-color": {
                "primary": "rgb(136, 136, 136)"
            }
        },
        TabItem: {
            "selected-color": {
                "primary": BLUE5,
                "secondary": BLUE6
            }
        },
        spinner: {
            "accent-color": {
                "primary": BLUE4
            }
        },
        "FormSection": {
            "bg-color": {
                "primary": LIGHT4
            }
        },
        "InputField": {
            "text-color": {
                "primary": BLACK,
                "secondary": "rgba(70, 70, 70)"
            },
            "bg-color": {
                "primary": "rgba(255, 255, 255)"
            }
        },
        "ListItem": {
            "selected-color": {
                "primary": "rgba(197, 197, 197)"
            }
        },
        "widget__icon": {
            "text-color": {
                "primary": LIGHT4,
            },
            "icon-color": {
                "primary": BLUE7,
                "secondary": BLUE6
            }
        },
        "modal__icon": {
            "text-color": {
                "primary": LIGHT4,
                "secondary": BLUE7
            }
        },
        "tag": {
            "text-color": {
                "primary": BLACK,
            },
            "icon-color": {
                "primary": BLUE5,
                "secondary": BLUE6
            }
        },
        "CheckboxList__icon": {
            "text-color": {
                "primary": BLACK
            },
            "icon-color": {
                "primary": BLUE5,
                "secondary": BLUE6
            }
        }
    }
};

// export default template;
module.exports = template;