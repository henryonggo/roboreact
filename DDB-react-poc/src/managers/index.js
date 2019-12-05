import modalManagerImport from "managers/ModalManager";
import notificationManagerImport from "managers/NotificationManager";
import requestManagerImport from "managers/RequestManager";
import widgetManagerImport from "managers/WidgetManager";
import loadingScreenManagerImport from "managers/LoadingScreenManager";
import dataManagerImport from "managers/DataManager";
import queueManagerImport from "managers/QueueManager";
import contextMenuManagerImport from "managers/ContextMenuManager";

export const { modalManager } = modalManagerImport;
export const { notificationManager } = notificationManagerImport;
export const { requestManager } = requestManagerImport;
export const { widgetManager } = widgetManagerImport;
export const { loadingScreenManager } = loadingScreenManagerImport;
export const { dataManager } = dataManagerImport;
export const { queueManager } = queueManagerImport;
export const { contextMenuManager } = contextMenuManagerImport;

export default {
    modalManager,
    notificationManager,
    requestManager,
    widgetManager,
    loadingScreenManager,
    dataManager,
    queueManager,
    contextMenuManager
};