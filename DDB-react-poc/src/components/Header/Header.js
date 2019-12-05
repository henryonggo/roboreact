import React from "react";
import PropTypes from "prop-types";
import { connect as connectRedux } from "react-redux";

import MarginalRenderer from "components/MarginalRenderer/MarginalRenderer";

const Header = (props) => {
    if (props.header && !props.header.enabled) {
        return null;
    }

    return (
        <MarginalRenderer className="Header" data={props.header}/>
    );
};

Header.propTypes = {
    // Mapped store state
    header: PropTypes.object,
};

const mapStateToProps = (state) => ({
    header: state.present.general.header
});

const mapDispatchToProps = () => ({}); // Do nothing

export default connectRedux(mapStateToProps, mapDispatchToProps)(Header);