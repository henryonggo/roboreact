import React, { Component } from "react";
import "./LoadingScreenContainer.scss";
import Utilities from "utilities";
import update from "immutability-helper";

import EventManager from "managers/EventManager";
import { loadingScreenEvents } from "managers/eventTypes";

import SpinnerLoader from "components/ui/loaders/SpinnerLoader/SpinnerLoader";

class LoadingScreenContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            status: ""
        };
    }

    componentDidMount() {
        EventManager
            .on(loadingScreenEvents.SHOW_LOADING, () => this.onShow())
            .on(loadingScreenEvents.HIDE_LOADING, () => this.onHide())
            .on(loadingScreenEvents.SET_STATUS, (i_sStatusText) => this.setStatus(i_sStatusText))
            .emit(loadingScreenEvents.DID_CONTAINER_MOUNT);
    }

    componentWillUnmount() {
        EventManager
            .off(loadingScreenEvents.SHOW_LOADING)
            .off(loadingScreenEvents.HIDE_LOADING)
            .off(loadingScreenEvents.SET_STATUS)
            .emit(loadingScreenEvents.WILL_CONTAINER_UNMOUNT);
    }

    onShow() {
        this.setOpen(true);
    }

    onHide() {
        this.setOpen(false);
        this.setStatus(""); // Reset status
    }

    setOpen(i_bOpen) {
        this.setState(prevState => (
            update(prevState, {
                open: { $set: i_bOpen }
            })
        ));
    }

    setStatus(i_sStatusText) {
        this.setState(prevState => (
            update(prevState, {
                status: { $set: i_sStatusText }
            })
        ));
    }

    render() {
        const { open, status } = this.state;
        const sModifierClasses = (open) ? "open" : null;
        const sClasses = Utilities.injectClassNames("LoadingScreenContainer", sModifierClasses);

        return (
            <div
                className={sClasses}
            >
                <div className="LoadingScreenContainer__container">
                    <SpinnerLoader 
                        className="LoadingScreenContainer__loader"
                        size="4rem"
                        thickness="0.3rem"
                    />

                    <div className="LoadingScreenContainer__status">
                        { status }
                    </div>
                </div>
            </div>
        );
    }
}

export default LoadingScreenContainer;