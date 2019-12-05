import React, { Component } from "react";
import "./ContextMenuContainer.scss";

import update from "immutability-helper";
import { Transition } from "react-spring/renderprops";

import EventManager from "managers/EventManager";
import { contextMenuManager } from "managers";
import { contextMenuEvents } from "managers/eventTypes";

import Dropdown from "components/ui/Dropdown/Dropdown";
import OutsideClickMonitor from "components/enhancers/OutsideClickMonitor/OutsideClickMonitor";

class ContextMenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contextMenus: [],
            contextMenuCollection: {}
        };
    }

    componentDidMount() {
        EventManager
            .on(contextMenuEvents.SHOW_CONTEXT_MENU, (i_oConfig) => this.fnOnOpenContextMenu(i_oConfig))
            .on(contextMenuEvents.HIDE_CONTEXT_MENU, (i_sModalId) => this.fnOnCloseContextMenu(i_sModalId))
            .emit(contextMenuEvents.DID_CONTAINER_MOUNT);
    }

    componentWillUnmount() {
        EventManager
            .off(contextMenuEvents.SHOW_CONTEXT_MENU)
            .off(contextMenuEvents.HIDE_CONTEXT_MENU)
            .emit(contextMenuEvents.WILL_CONTAINER_UNMOUNT);
    }

    fnOnOpenContextMenu(i_oConfig) {
        this.setState((prevState) => {
            return update(prevState, {
                contextMenus: { $push: [i_oConfig.contextMenuID] },
                contextMenuCollection: { $merge: { [i_oConfig.contextMenuID]: i_oConfig } }
            });
        });
    }

    fnOnCloseContextMenu(i_sContextMenuID) {
        const oContextMenuConfig = this.fnGetContextMenuConfig(i_sContextMenuID);
        oContextMenuConfig.onClose();

        this.setState((prevState) => {
            const nContextMenuIndex = prevState.contextMenus.indexOf(i_sContextMenuID);
            if (nContextMenuIndex === -1) {
                return prevState;
            }

            return update(prevState, {
                contextMenus: { $splice: [[nContextMenuIndex, 1]] }
            });
        });

        // Wait for animation to complete to delete menu config.
        setTimeout(() => {
            this.setState((prevState) => {
                return update(prevState, {
                    contextMenuCollection: { $unset: [i_sContextMenuID] }
                });
            });
        }, 10000);
    }

    fnGetContextMenuConfig(i_sContextMenuID) {
        return this.state.contextMenuCollection[i_sContextMenuID];
    }

    fnRenderContextMenu(i_oContextMenuConfig, i_oStyleProps) {
        const { className, items, position } = i_oContextMenuConfig;

        return (
            <Dropdown
                dropdownClass={className}
                dropdownItems={items}
                styleProps={{
                    ...i_oStyleProps,
                    top: position.y,
                    left: position.x
                }}
            />
        );
    }

    render() {
        return (
            <div className="ContextMenuContainer">
                <Transition
                    items={this.state.contextMenus}
                    from={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                    enter={{ opacity: 1, transform: "scaleY(1) translateY(0)" }}
                    leave={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                    config={{ tension: 500, friction: 30, clamp: true }}
                >
                    {contextMenuID => contextMenuID && (styleProps => {
                        const oContextMenuConfig = this.fnGetContextMenuConfig(contextMenuID);
                        return (
                            <OutsideClickMonitor
                                onOutsideClick={() => contextMenuManager.closeContextMenu(contextMenuID)}
                                clicks={1}
                            >
                                {
                                    this.fnRenderContextMenu(
                                        oContextMenuConfig,
                                        styleProps
                                    )
                                }
                            </OutsideClickMonitor>
                        );
                    }
                    )}
                </Transition>
            </div>
        );
    }
}

export default ContextMenuContainer;

