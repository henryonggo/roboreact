import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Can be used as a HOC that detects if you click outside of it.
 * Can also be used as a standalone component that detects if you click outside of designated nodes.
 */
class OutsideClickMonitor extends Component {
    constructor(props) {
        super(props);

        this.onMouse = this.props.onMouseDown ? "mousedown" : "mouseup";
        this.state = {
            clicksLeft: props.clicks
        };
    }

    componentDidMount() {
        document.addEventListener(this.onMouse, this.onOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener(this.onMouse, this.onOutsideClick);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    onOutsideClick = (event) => {
        if (this.state.clicksLeft !== 0 &&
            ![this.wrapperRef, ...this.props.nodes].some(node => node && node.contains(event.target))) {
            this.setState(prevState => ({ clicksLeft: prevState.clicksLeft - 1 }));
            this.props.onOutsideClick(event);
        }
    }

    render() {
        return this.props.children ? <div ref={this.setWrapperRef}>{this.props.children}</div> : null;
    }
}

OutsideClickMonitor.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    onOutsideClick: PropTypes.func.isRequired,
    nodes: PropTypes.arrayOf(PropTypes.object),
    clicks: PropTypes.number,
    onMouseDown: PropTypes.bool
};

OutsideClickMonitor.defaultProps = {
    nodes: [],
    clicks: Infinity,
};

export default OutsideClickMonitor;