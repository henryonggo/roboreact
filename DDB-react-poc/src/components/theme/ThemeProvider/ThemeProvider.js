import React, { Component } from "react";
import { connect } from "react-redux";
import CustomProperties from "react-custom-properties";
import PropTypes from "prop-types";

class ThemeProvider extends Component {
    shouldComponentUpdate(nextProps) {
        const { currNamespaceID, namespaces, themes } = this.props;
        const sCurrThemeID = namespaces[currNamespaceID];
        const oCurrTheme = themes[sCurrThemeID];

        // Only update the component if:
        // 1. The current namespace changes
        if (currNamespaceID !== nextProps.currNamespaceID) {
            return true;
        }
        // 2. The current theme ID changes
        if (sCurrThemeID !== nextProps.namespaces[sCurrThemeID]) {
            return true;
        }
        // 3. The theme changes
        if (oCurrTheme !== nextProps.themes[oCurrTheme]) {
            return true;
        }

        return false;
    }

    render() {
        const { defaultNamespace, currNamespaceID, namespaces, themes } = this.props;

        let sUsedNamespace = currNamespaceID;

        // If no namespace is given then the default is used
        if (!currNamespaceID) {
            sUsedNamespace = defaultNamespace;
        }

        const sThemeID = namespaces[currNamespaceID];
        const oTheme = themes[sThemeID];

        // Do not apply theme if the used namespace, theme ID or theme objects are missing
        if (!sUsedNamespace || !sThemeID || !oTheme) {
            return this.props.children;
        }

        const oThemeProperties = oTheme.properties;
  
        return (
            <CustomProperties properties={oThemeProperties}>
                {this.props.children}
            </CustomProperties>
        );
    }
}

ThemeProvider.propTypes = {
    currNamespaceID: PropTypes.string,

    // Mapped props
    defaultNamespace: PropTypes.string,
    namespaces: PropTypes.object.isRequired,
    themes: PropTypes.object.isRequired,

    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

ThemeProvider.defaultProps = {
    currNamespaceID: null
};

const mapStateToProps = (state) => {
    return {
        defaultNamespace: state.present.theme.defaultNamespace,
        namespaces: state.present.theme.namespaces,
        themes: state.present.theme.themes
    };
};

const mapDispatchToProps = () => ({}); // Do nothing

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider);