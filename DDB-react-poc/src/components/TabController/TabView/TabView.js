import React, { Component } from "react";
import update from "immutability-helper";
import Utilities from "utilities";
import PropTypes from "prop-types";
import "./TabView.scss";
import { BREAKPOINT_PREFIX, INIT_EDIT_MODE} from "constants/app";
import { connect } from "react-redux";
import * as actionTypes from "store/actions/actionTypes";
import { Responsive, WidthProvider } from "react-grid-layout";

import WidgetWrapper from "components/widgets/WidgetWrapper";

const ResponsiveGridLayout = WidthProvider(Responsive);

class TabView extends Component {
    constructor(props) {
        super(props);

        const oCurrTab = props.tabs[props.currTabID];

        const oTabState = (oCurrTab) ? this._fnComputeTabState(oCurrTab.numCols) : {};

        this.state = {
            ...oTabState,
            editMode: INIT_EDIT_MODE,
            shouldBlock: false,
        };

        this.blockLayoutChange = false;
    }

    // -----------------------
    // --- Lifecycle hooks ---
    // -----------------------

    shouldComponentUpdate(nextProps) {
        const oCurrTab = this.props.tabs[this.props.currTabID];
        const oNextTab = nextProps.tabs[nextProps.currTabID];

        // Force update if one of the curr tab states in undefined
        if (!oNextTab || !oCurrTab) {
            return true;
        }

        const bTabChange = oNextTab.id !== oCurrTab.id;

        const nNextColNum = oNextTab.numCols;
        const nPrevColNum = oCurrTab.numCols;
        const bColNumChange = nNextColNum !== nPrevColNum && !bTabChange;

        // If the tab or the number of columns changes
        if (bTabChange || bColNumChange) {
            // Handle if the tab changed
            if (bTabChange) {
                // Set the edit mode to the initial edit mode
                this.setState(prevState => (
                    update(prevState, {
                        editMode: { $set: INIT_EDIT_MODE }
                    })
                ));

                this._fnSetShouldBlockHandler(true);
            }

            // Handle if number of columns changed
            if (bColNumChange) {
                const sCurrTabID = oNextTab.id;

                // Get the current widget layouts
                let oUpdatedWidgetLayouts = oNextTab.widgetLayouts;

                // If the column number shrinks then remove the larger columns
                if (nNextColNum < nPrevColNum) {
                    // Get a list of breakpoints that need to be removed
                    const asRemoveBreakpointKeys = Object.keys(oUpdatedWidgetLayouts).filter(sBreakpointKey => {
                        const nColNum = parseInt(sBreakpointKey.substring(sBreakpointKey.length - 1));
                        return nColNum > nNextColNum;
                    });

                    // Remove them from the state
                    oUpdatedWidgetLayouts = update(oUpdatedWidgetLayouts, {
                        $unset: asRemoveBreakpointKeys
                    });
                }
                // If the column number grows then add the new columns, cloning the largest
                // existing breakpoint layout as its base layout
                else { // nNextColNum > nPrevColNum
                    // Get the largest current breakpoint
                    const aLargetBreakpoint = oUpdatedWidgetLayouts[`${BREAKPOINT_PREFIX}${nPrevColNum}`];

                    // Get the index numbers of the breakpoints needed to be added
                    const aBreakpointNumsToAdd = Utilities.arrayFillRange(nPrevColNum + 1, nNextColNum);

                    // Construct the object of all the objects that need to be added
                    const oBreakpointsToAdd = aBreakpointNumsToAdd.reduce((oConstructing, nBreakpointNum) => {
                        return {
                            ...oConstructing,
                            [`${BREAKPOINT_PREFIX}${nBreakpointNum}`]: [...aLargetBreakpoint]
                        };
                    }, {});

                    // Insert in the breakpoints computed above
                    oUpdatedWidgetLayouts = update(oUpdatedWidgetLayouts, {
                        $merge: oBreakpointsToAdd
                    });
                }

                // Update the layout changes
                this.fnUpdateAllWidgetLayoutHandler(oUpdatedWidgetLayouts, sCurrTabID);
            }

            // Compute and apply the new tab state
            const oNewTabState = this._fnComputeTabState(oNextTab.numCols);
            this.setState(prevState => (
                update(prevState, {
                    $merge: oNewTabState,
                })
            ));

            // Prevent the component from updating this time around in order to let the changed
            // state to get applied
            return false;
        }

        return true;
    }

    // ------------------------
    // --- INTERNAL METHODS ---
    // ------------------------

    _fnComputeTabState = (i_nNumCols) => {
        // Computes the breakpoints trigger values
        const _fnComputeBreakpoints = (i_nWidth, i_nNumCols) => {
            const oBreakpoints = {};
            const nSegmentSize = Math.round(i_nWidth / i_nNumCols);

            for (let i = 0; i < i_nNumCols; i++) {
                oBreakpoints[`${BREAKPOINT_PREFIX}${i + 1}`] = nSegmentSize * i;
            }

            return oBreakpoints;
        };

        // Computes the IDs of all the columns
        const _fnComputeColumns = (i_nNumCols) => {
            const oColumns = {};

            for (let i = 1; i <= i_nNumCols; i++) {
                oColumns[`${BREAKPOINT_PREFIX}${i}`] = i;
            }

            return oColumns;
        };

        const oRet = {
            oBreakpoints: _fnComputeBreakpoints(window.outerWidth, i_nNumCols),
            oColumns: _fnComputeColumns(i_nNumCols),

            // For some reason RGL doesn"t call the onBreakpointChange callback on this very specific condition
            nCurrNumColumns: i_nNumCols - 1,
            sCurrBreakpoint: `${BREAKPOINT_PREFIX}${i_nNumCols - 1}`,

            sLargestBreakpoint: `${BREAKPOINT_PREFIX}${i_nNumCols}`,
        };

        return oRet;
    }

    // Toggles the current edit mode
    _fnToggleEditMode = () => {
        this.setState(prevState => (
            update(prevState, {
                editMode: { $apply: (mode) => !mode }
            })
        ));
    }

    _fnSetGridEditable = (i_oLayouts, i_bEditable) => {
        const oRetLayouts = {};

        // Apply the wanted value of 'static' for each of the current layout breakpoints
        const aLayoutIDs = Object.keys(i_oLayouts);
        for (const sLayoutID of aLayoutIDs) {
            oRetLayouts[sLayoutID] = i_oLayouts[sLayoutID].map((oItemData) => {
                const oNewItemData = { ...oItemData };
                oNewItemData["static"] = !i_bEditable;
                return oNewItemData;
            });
        }

        return oRetLayouts;
    }


    // ----------------
    // --- HANDLERS ---
    // ----------------

    _fnOnBreakpointChangeHandler = (newBreakpoint, newCols) => {
        this.setState((prevState) => ({
            ...prevState,
            nCurrNumColumns: newCols,
            sCurrBreakpoint: newBreakpoint
        }));
    }

    fnUpdateAllWidgetLayoutHandler = (i_oLayouts, i_sTabID = null, i_oConfig = {}) => {
        const oCurrTab = this.props.tabs[this.props.currTabID];

        const sTabID = (i_sTabID) ? i_sTabID : oCurrTab.id;

        if (this.state.shouldBlock) {
            this._fnSetShouldBlockHandler(false);
            return;
        }

        this.props.updateAllWidgetLayouts(sTabID, i_oLayouts, i_oConfig);
    }

    _fnOnLayoutChangeHandler = (currentLayout, allLayouts) => {
        this.fnUpdateAllWidgetLayoutHandler(allLayouts);
    }

    _fnSetShouldBlockHandler = (i_bShouldBlock) => {
        this.setState((prevState) => update(prevState, {
            shouldBlock: { $set: i_bShouldBlock }
        }));
    };

    render() {
        const { tabs, currTabID, widgetPresets } = this.props;

        const oCurrTab = tabs[currTabID];

        // Render nothing if there is no current tab
        if (!oCurrTab) {
            return <div className="TabView"></div>;
        }

        const oCurrLayouts = this._fnSetGridEditable(oCurrTab.widgetLayouts, this.state.editMode);
        const oWidgets = oCurrTab.widgets;

        const sWidgetHandleClassName = "handle";

        return (
            <div className="TabView">
                {
                    // Render grid
                    <ResponsiveGridLayout className="layout TabView__widget-layout"
                        layouts={oCurrLayouts}
                        breakpoints={this.state.oBreakpoints}
                        cols={this.state.oColumns}

                        draggableHandle={`.${sWidgetHandleClassName}`}
                        compactType="vertical"

                        onBreakpointChange={this._fnOnBreakpointChangeHandler}
                        onLayoutChange={this._fnOnLayoutChangeHandler}
                    >
                        {
                            // Render widgets
                            Object.values(oWidgets).map((oWidget) => {
                                const { id, presetID, presetType } = oWidget;
                                const oCurrWidgetPreset = widgetPresets[presetType][presetID];

                                return (
                                    <WidgetWrapper
                                        key={id}
                                        widgetPresetData={oCurrWidgetPreset}
                                        name={oCurrWidgetPreset.name}
                                        description={oCurrWidgetPreset.metaData.description}
                                        handleClassName={sWidgetHandleClassName}
                                        onRemoveWidget={() => this.props.removeWidget(id)}
                                    >
                                    </WidgetWrapper>
                                );
                            })
                        }
                    </ResponsiveGridLayout>
                }
            </div>
        );
    }
}

TabView.propTypes = {
    // Mapped store state
    tabs: PropTypes.object.isRequired,
    currTabID: PropTypes.string,
    widgetPresets: PropTypes.object.isRequired,

    // Mapped dispatch funcs
    updateAllWidgetLayouts: PropTypes.func.isRequired,
    removeWidget: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        tabs: state.present.tab.tabs,
        currTabID: state.present.tab.currTabID,
        widgetPresets: state.present.widget.presets,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...Utilities.mapDispatchToPropsHelper(dispatch, {
            removeWidget: actionTypes.tab.REMOVE_WIDGET,
            updateAllWidgetLayouts: actionTypes.tab.UPDATE_ALL_WIDGET_LAYOUTS
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabView);