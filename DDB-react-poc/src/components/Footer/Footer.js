import React from "react";
import "./Footer.scss";
import PropTypes from "prop-types";
import { connect as connectRedux } from "react-redux";

import MarginalRenderer from "components/MarginalRenderer/MarginalRenderer";

const Footer = (props) => {
    if (props.footer && !props.footer.enabled) {
        return null;
    }

    return (
        <MarginalRenderer className="Footer" data={props.footer}/>
    );
};

Footer.propTypes = {
    // Mapped store state
    footer: PropTypes.object,
};

const mapStateToProps = (state) => ({
    footer: state.present.general.footer
});

const mapDispatchToProps = () => ({}); // Do nothing

export default connectRedux(mapStateToProps, mapDispatchToProps)(Footer);