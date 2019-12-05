import EventManager from "managers/EventManager";
import { loadingScreenEvents } from "managers/eventTypes";

export class LoadingScreenManager {
    constructor() {
        this.containerMounted = false;

        // Queued state
        this.showLoadingQueued = false;
        this.hideLoadingQueued = false;
        this.queuedStatusText = null;

        EventManager
            .on(loadingScreenEvents.DID_CONTAINER_MOUNT, () => {
                this.containerMounted = true;

                // Handle any queued values

                if (this.showLoadingQueued) {
                    this.showLoadingScreen();
                    this.showLoadingQueued = false;
                }

                if (this.hideLoadingQueued) {
                    this.hideLoadingScreen();
                    this.hideLoadingQueued = false;
                }

                if (typeof this.queuedStatusText === "string") {
                    this.setLoadingScreenStatus(this.queuedStatusText);
                    this.queuedStatusText = null;
                }
            })
            .on(loadingScreenEvents.WILL_CONTAINER_UNMOUNT, () => {
                this.containerMounted = false;
            });
    }

    showLoadingScreen() {
        if (!this.containerMounted) {
            this.showLoadingQueued = true;
            return;
        }

        EventManager.emit(loadingScreenEvents.SHOW_LOADING);
    }

    hideLoadingScreen() {
        if (!this.containerMounted) {
            this.hideLoadingQueued = true;
            return;
        }

        EventManager.emit(loadingScreenEvents.HIDE_LOADING);
    }

    setLoadingScreenStatus(i_sStatusText) {
        if (!this.containerMounted) {
            this.queuedStatusText = i_sStatusText;
            return;
        }

        EventManager.emit(loadingScreenEvents.SET_STATUS, i_sStatusText);
    }
}

export let loadingScreenManager = new LoadingScreenManager();

export default { loadingScreenManager };