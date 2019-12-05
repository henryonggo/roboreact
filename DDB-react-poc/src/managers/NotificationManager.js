import { toast, cssTransition } from "react-toastify";

const DEFAULT_DURATION = 3000;

const Anim = cssTransition({
    enter: "bounceInRight",
    exit: "bounceOutRight",
    duration: [600, 1000]
});

// Singleton class
export class NotificationManager {
    showCustomNotification(i_sMessage, i_oConfig) {
        return toast(i_sMessage, i_oConfig);
    }

    showBaseNotification(i_sMessage, i_sType, i_nDuration = DEFAULT_DURATION) {
        return this.showCustomNotification(i_sMessage, {
            type: i_sType,
            hideProgressBar: false,
            autoClose: i_nDuration,
            transition: Anim,
            closeOnClick: false
        });
    }

    showDefault(i_sMessage, i_nDuration = DEFAULT_DURATION) {
        return this.showBaseNotification(i_sMessage, "default", i_nDuration);
    }

    showInfo(i_sMessage, i_nDuration = DEFAULT_DURATION) {
        return this.showBaseNotification(i_sMessage, "info", i_nDuration);
    }

    showSuccess(i_sMessage, i_nDuration = DEFAULT_DURATION) {
        return this.showBaseNotification(i_sMessage, "success", i_nDuration);
    }

    showWarning(i_sMessage, i_nDuration = DEFAULT_DURATION) {
        return this.showBaseNotification(i_sMessage, "warning", i_nDuration);
    }

    showError(i_sMessage, i_nDuration = DEFAULT_DURATION) {
        return this.showBaseNotification(i_sMessage, "error", i_nDuration);
    }
}

// With ES6 modules let ensures that notificationManager is a singleton
export let notificationManager = new NotificationManager();

export default {
    notificationManager
};