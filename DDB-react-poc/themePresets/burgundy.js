const BURG1 = "rgb(46, 18, 23)";
const BURG2 = "rgb(56, 28, 35)";
const BURG3 = "rgb(90, 50, 63)";
const BURG4 = "rgb(255, 121, 160)";
const BURG5 = "rgb(161, 75, 100)";
const BURG6 = "rgb(185, 122, 137)";

const template = {
    id: "Burgundy",
    "display-color": "#C44E6D",
    BASE: {
        "text-color": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(192, 192, 192)",
        },
        "bg-color": {
            "primary": BURG1,
            "secondary": BURG2,
        },
        "accent-color": {
            "primary": BURG3,
            "secondary": BURG4,
        },
        "selected-color": {
            "primary": BURG5,
            "secondary": BURG6
        },
        "icon-color": {
            "primary": "rgb(240, 172, 211)",
            "secondary": "rgb(240, 240, 240)"
        },
        "scrollbar-color": {
            "primary": "rgb(85, 85, 85)",
            "secondary": "rgb(68, 68, 68)"
        },
        "button-color": {
            "primary": BURG5,
            "secondary": BURG4
        },
        "info-color": {
            "primary": "rgb(255, 255, 255)",
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
                "primary": BURG2,
                "secondary": BURG1
            }
        },
        widget: {
            "text-color": {
                "secondary": "#FFFFFF"
            },
            "bg-color": {
                "primary": BURG2,
                "secondary": BURG1
            }
        },
        icon: {
            "text-color": {
                "primary": "rgb(180, 180, 180)"
            },
            "accent-color": {
                "primary": "rgb(240, 172, 211)",
                "secondary": "rgb(240, 240, 240)"
            }
        },
        TabView: {
            "bg-color": {
                primary: BURG1
            }
        },
        notification: {
            "bg-color": {
                "primary": BURG3
            },
            "accent-color": {
                "primary": "rgb(129, 129, 129)"
            }
        },
        "TabBar__hamburger": {
            "bg-color": {
                "primary": BURG3,
                "secondary": BURG4
            }
        },
        "TabView__placeholder": {
            "bg-color": {
                "primary": "rgb(136, 136, 136)"
            }
        },
        TabItem: {
            "selected-color": {
                "primary": BURG6,
                "secondary": BURG5
            }
        },
        spinner: {
            "accent-color": {
                "primary": BURG4
            }
        },
        "FormSection": {
            "bg-color": {
                "primary": BURG3
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
                "primary": "rgba(197, 197, 197)"
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