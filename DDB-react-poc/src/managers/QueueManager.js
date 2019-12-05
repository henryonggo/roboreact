export class QueueManager {
    constructor() {
        this.groups = {};
    }

    add(i_fnOperation, i_sGroupID = "master") {
        // Get the group
        const oGroup = this._getGroup(i_sGroupID);

        // This promise resolves/rejects once the operation has been run in the queue
        const oRetPromise = this._addOperation(i_fnOperation, oGroup);

        // If the queue execution operation is not running (ie ran out of items to execute)
        // then restart it again
        if (!oGroup.operationRunning) {
            this._executeQueue(oGroup);
        }

        return oRetPromise;
    }

    _getGroup(i_sGroupID) {
        // If the given group does not exist then create it
        if (!this.groups[i_sGroupID]) {
            this.groups[i_sGroupID] = {
                operationRunning: false,
                operationQueue: []
            };
        }

        // Get and return the group
        return this.groups[i_sGroupID];
    }

    _addOperation(i_fnOperation, i_oGroup) {
        // Setup promise to be returned
        let fnResolve, fnReject;
        const oRetPromise = new Promise((resolve, reject) => {
            fnResolve = resolve;
            fnReject = reject;
        });

        // Push operation into the queue
        i_oGroup.operationQueue.push({
            operation: i_fnOperation,
            resolve: fnResolve,
            reject: fnReject
        });

        return oRetPromise;
    }

    async _executeQueue(i_oGroup) {
        i_oGroup.operationRunning = true;
        while (i_oGroup.operationQueue.length > 0) {
            const oCurrOperation = i_oGroup.operationQueue.shift();
            const { operation, resolve, reject } = oCurrOperation;

            try {
                await operation(); // Run operation
                resolve(); // Run its resolve callback once it's done
            } catch(err) {
                reject(err); // Run its reject callback if it errors
            }
        }
        i_oGroup.operationRunning = false;
    }
}

export let queueManager = new QueueManager();

export default { queueManager };