import React, { Component } from "react";
import "./ModalWrapper.scss";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import Utilities from "utilities";
import update from "immutability-helper";

import ModalBase from "components/modals/ModalBase";

import CloseButton from "components/ui/button/CloseButton/CloseButton";

// TODO: this component can probably get some massive script optimizations (especially with the resize event stuff)
// We also need to clean the code up... big time
// Note: Optimizations made so far
// - added a debounce method to the _fnUpdateWindowDimensions function
// - added will-change: width, height to the .ModalWrapper in the stylesheet

const DEBOUNCE_DELAY = 10; // ms

class ModalWrapper extends Component {
    constructor(props) {
        super(props);

        const { minConstraints, maxConstraints } = props;

        this.state = {
            width: -1,
            height: -1,
            wantedWidth: -1,
            wantedHeight: -1,
            x: -1,
            y: -1,
            minConstraints: [...minConstraints],
            maxConstraints: [...maxConstraints],
            initMinConstraints: [...minConstraints],
            initMaxConstraints: [...maxConstraints],

            // Screen size
            size: {
                width: 0,
                height: 0
            },
        };

        this.wrapperEl = null;
    }

    // ----------------------
    // --- Lifecyle Hooks ---
    // ----------------------

    componentDidMount() {
        this._fnUpdateWindowDimensionsDebounced();

        window.addEventListener("resize", this._fnUpdateWindowDimensionsDebounced);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._fnUpdateWindowDimensionsDebounced);
    }

    // ------------------------
    // --- Internal Methods ---
    // ------------------------


    _fnResetWrapperState = () => {
        const { initDimensions, initPosition, minConstraints, maxConstraints, resizable, initToMinDimensions } = this.props;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const initDefaultDimensions = (initToMinDimensions) ? [...minConstraints] : [...maxConstraints];

        // If no init dimensions are given then use the min constraints
        let initWidth = (initDimensions.width < 0) ? initDefaultDimensions[0] : initDimensions.width;
        let initHeight = (initDimensions.height < 0) ? initDefaultDimensions[1] : initDimensions.height;

        // If the modal is resizable then use the given init dimensions, if not then grab the dimensions from the wrapper element itself
        initWidth = (resizable) ? Utilities.constrain(initWidth, minConstraints[0], maxConstraints[0]) : this.wrapperEl.offsetWidth;
        initHeight = (resizable) ? Utilities.constrain(initHeight, minConstraints[1], maxConstraints[1]) : this.wrapperEl.offsetHeight;

        // Compute the init position to be in the center of the screen
        const initX = (initPosition.x < 0) ? (screenWidth / 2 - initWidth / 2) : initPosition.x;
        const initY = (initPosition.y < 0) ? (screenHeight / 2 - initHeight / 2) : initPosition.y;

        this.setState({
            width: initWidth,
            height: initHeight,
            wantedWidth: initWidth,
            wantedHeight: initHeight,
            x: initX,
            y: initY
        });

        // Make sure the modal is still constrained on the screen properly
        this._fnCheckAndUpdateDimensions(initWidth, initHeight);
        this._fnCheckAndUpdatePos(initX, initY);
    };

    _fnUpdateWindowDimensions = () => {
        const newScreenWidth = window.innerWidth;
        const newScreenHeight = window.innerHeight;

        // Check if the modal is off the screen
        const { width, height, x, y } = this.state;

        // Update the position and dimensions of the modal
        this._fnCheckAndUpdatePos(x, y);
        this._fnCheckAndUpdateDimensions(width, height);

        this.setState({ size: { width: newScreenWidth, height: newScreenHeight } });
    }

    _fnUpdateWindowDimensionsDebounced = Utilities.debounce(this._fnUpdateWindowDimensions, DEBOUNCE_DELAY);

    _fnUpdatePos = (i_nX, i_nY) => {
        this.setState({ x: i_nX, y: i_nY });
    };

    // TODO: _fnCheckAndUpdatePos and _fnCheckAndUpdateDimensions could use a code refactoring
    // since they both use very similar code

    _fnCheckAndUpdatePos = (i_nNewX, i_nNewY) => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const { width, height } = this.state;

        let nSetX = i_nNewX;
        let nSetY = i_nNewY;

        // Constrain x to the viewport
        if (i_nNewX + width > screenWidth) {
            nSetX = screenWidth - width;
        }
        nSetX = Math.max(0, nSetX);

        // Constrain y to the viewport
        if (i_nNewY + height > screenHeight) {
            nSetY = screenHeight - height;
        }
        nSetY = Math.max(0, nSetY);

        // Update the state
        this.setState({ x: nSetX, y: nSetY });
    };

    _fnCheckAndUpdateDimensions = (i_nNewWidth, i_nNewHeight) => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const { x, y } = this.state;

        let nSetWidth = i_nNewWidth;
        let nSetHeight = i_nNewHeight;

        // Note: just limiting the width and height does not work fully, 
        // dynamically setting the maxConstraints property is needed in order to make
        // react-resizable work properly (without it there are some jumping issues that occur)
        let aSetMaxConstraints = [...this.state.maxConstraints];
        let aSetMinConstraints = [...this.state.minConstraints];

        // Constrain the width to the screen
        if (x + i_nNewWidth > screenWidth) {
            // Constrain within the minimum width
            nSetWidth = Math.min(this.state.minConstraints[0], screenWidth - x);
            // Keep max width and the width the same
            aSetMaxConstraints[0] = nSetWidth;

            // Temporarily update the min constraints if the width becomes smaller
            if (this.state.initMinConstraints[0] < nSetWidth) {
                aSetMinConstraints[0] = nSetWidth;
            }
        } else {
            // Constrain within the minimum width if the screen is smaller than the wanted min width
            if (nSetWidth < this.state.initMinConstraints[0]) {
                nSetWidth = Math.min(this.state.minConstraints[0], screenWidth - x);
            }

            // Reset width constraints
            aSetMinConstraints[0] = this.state.initMinConstraints[0];
            aSetMaxConstraints[0] = this.state.initMaxConstraints[0];
        }

        // Constrian the height to the screen
        if (y + i_nNewHeight > screenHeight) {
            // Constrain within the minimum height
            nSetHeight = Math.min(this.state.minConstraints[1], screenHeight - y);
            // Keep max height and the height the same
            aSetMaxConstraints[1] = nSetHeight;

            // Temporarily update the min constraints if the height becomes smaller
            if (this.state.initMinConstraints[1] < nSetHeight) {
                aSetMinConstraints[1] = nSetHeight;
            }
        } else {
            // Constrain within the minimum height if the screen is smaller than the wanted min height
            if (nSetHeight < this.state.initMinConstraints[1]) {
                nSetHeight = Math.min(this.state.minConstraints[1], screenHeight - y);
            }

            // Reset height constraint
            aSetMinConstraints[1] = this.state.initMinConstraints[1];
            aSetMaxConstraints[1] = this.state.initMaxConstraints[1];
        }

        // Update the state
        this.setState((prevState) => {
            return update(prevState, {
                width: { $set: nSetWidth },
                height: { $set: nSetHeight },
                minConstraints: { $set: aSetMinConstraints },
                maxConstraints: { $set: aSetMaxConstraints },
            });
        });
    };

    // ----------------
    // --- Handlers ---
    // ----------------

    _fnOnResizeHandler = (event, { size }) => {
        this._fnCheckAndUpdateDimensions(size.width, size.height);
    };

    _fnOnDragHandler = (event, data) => {
        this._fnUpdatePos(data.x, data.y);
    };

    _fnOnCloseHandler = (e) => {
        if (this.props.closable) {
            Utilities.runFunctionsWithParams([e], this.props.onCancel, this.props.onRequestClose);
        }
    }

    _fnRenderWrapperComponent = (i_sModalClasses, i_oStyles, i_sTitle, i_oChildren) => {
        const childrenWithProps = React.cloneElement(i_oChildren, { scrollable: this.props.scrollable });

        return (
            <div className={i_sModalClasses} style={i_oStyles} ref={el => this.wrapperEl = el}>
                <div className="ModalWrapper__handle">
                    <div className="ModalWrapper__title">{i_sTitle}</div>
                    <CloseButton
                        className="ModalWrapper__close-btn"
                        disabled={!this.props.closable}
                        onClick={this._fnOnCloseHandler}
                    />
                </div>
                <div className="ModalWrapper__container">
                    {childrenWithProps}
                </div>
            </div>
        );
    };

    _fnAfterModalOpenHandler = () => {
        this._fnResetWrapperState();
    }

    render() {
        const { className, draggable, resizable, title, onAfterOpen, onDrag, onStart, onStop, styleProps, ...rest } = this.props;

        // Setup the list of classes to be attached to the main modal wrapper div
        let sModalClasses = Utilities.injectClassNames(className, "ModalWrapper", draggable && "draggable", resizable && "resizable");

        const { width, height } = this.state;
        const oPos = { x: this.state.x, y: this.state.y };

        const oDimensionStyles = {
            width: width + "px",
            height: height + "px",
        };

        const sModalTransOrigin = `${this.state.x + this.state.width / 2}px ${this.state.y + this.state.height / 2}px`;
        
        return (
            <ModalBase
                {...rest}
                styleProps={{ ...styleProps, transformOrigin: sModalTransOrigin }}
                // Pass through the onAfterOpen func passed in through the props after our own handler is called
                onAfterOpen={() => { Utilities.runFunctions(this._fnAfterModalOpenHandler, onAfterOpen); }}
            >
                <Draggable
                    {...rest}

                    disabled={!draggable}
                    position={oPos}
                    bounds=".ModalBase__overlay"
                    handle=".ModalWrapper__handle"
                    
                    onStart={(event, data) => Utilities.runFunctionsWithParams([event, data], this._fnOnDragHandler, onStart)}
                    onDrag={(event, data) => Utilities.runFunctionsWithParams([event, data], this._fnOnDragHandler, onDrag)}
                    onStop={(event, data) => Utilities.runFunctionsWithParams([event, data], this._fnOnDragHandler, onStop)}
                >
                    {
                        // Apply the resizable component depending on if its enabled or not
                        (resizable) ?
                            <Resizable
                                height={this.state.height}
                                width={this.state.width}
                                minConstraints={this.state.minConstraints}
                                maxConstraints={this.state.maxConstraints}
                                disabled={!resizable}

                                onResizeStart={this._fnOnResizeHandler}
                                onResize={this._fnOnResizeHandler}
                                onResizeStop={this._fnOnResizeHandler}
                            >
                                {this._fnRenderWrapperComponent(sModalClasses, oDimensionStyles, title, this.props.children)}
                            </Resizable>
                            :
                            this._fnRenderWrapperComponent(sModalClasses, {}, title, this.props.children)
                    }
                </Draggable>
            </ModalBase>
        );
    }
}

ModalWrapper.propTypes = {
    className: PropTypes.string,
    title: PropTypes.node,
    draggable: PropTypes.bool,
    resizable: PropTypes.bool,
    scrollable: PropTypes.bool,
    initToMinDimensions: PropTypes.bool,
    closable: PropTypes.bool,
    onCancel: PropTypes.func,

    initDimensions: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),
    initPosition: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),

    minConstraints: PropTypes.arrayOf(PropTypes.number),
    maxConstraints: PropTypes.arrayOf(PropTypes.number),
};

ModalWrapper.defaultProps = {
    title: null,
    draggable: false,
    resizable: false,
    scrollable: false,
    initToMinDimensions: true,
    closable: true,

    initDimensions: {
        width: -1,
        height: -1
    },
    initPosition: {
        x: -1,
        y: -1
    },

    minConstraints: [500, 70],
    maxConstraints: [700, 300]
};

export default ModalWrapper;