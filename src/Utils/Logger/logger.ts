import Queue from "../Queue/queue";
import { store } from "../..";

var queue: any[] = [];
var typeArr: any[] = [];
var attempt = 1;

export interface AttemptDictionary {
    type: string;
    attempt: number;
}

var attemptArray: AttemptDictionary[] = [];

export interface Actions {
    type: any;
    payload: any;
}

export const logger = (stored: any) => (next: any) => (action: Actions) => {
    next(action);
    // console.log(action);
    // recordAndStore(action);
    // if (queue.length > 0) {
    //     for (var i = 0; i < queue.length; i++) {
    //         popAndDispatch(queue[i], i);
    //     }
    // }
};
export function recordAndStore(action: Actions) {
    if (!(action.type.includes('_SUCCESS') || action.type.includes('_FAILURE'))) {
        var occurenceIndex: number = typeArr.findIndex((el) => { return el === action; });
        if (occurenceIndex > -1) {
            // same action already exists
        } else {
            // new action
            typeArr.push(action);
            attemptArray.push({ type: action.type, attempt: attempt });
        }
    }
    if (action.type.includes('_FAILURE')) {
        var typeIndex = typeArr.reverse().findIndex((el) => { return el.type === action.type.replace('_FAILURE', ''); });
        if (typeIndex > -1) {
            var attemptIndex: number = attemptArray.findIndex((el) => { return el.type === action.type.replace('_FAILURE', ''); });
            Queue.addQueue({ action: typeArr[typeIndex], mod: new Date().toTimeString(), attempt: attemptArray[attemptIndex].attempt }, queue);
        }
    }
}
export function popAndDispatch(queueItem: any, index: number) {
    var attemptIndexNew = -1;
    if (queueItem.attempt > 0) {
        attemptIndexNew = attemptArray.findIndex((newEl) => { return newEl.type === queueItem.action.type });
        if (attemptIndexNew > -1) {
            attemptArray[attemptIndexNew].attempt = attemptArray[attemptIndexNew].attempt - 1;
            queue.splice(index, 1);
            setTimeout(() => {
                store.dispatch({ type: queueItem.action.type, payload: queueItem.action.payload });
            }, 1000);
        }
    }
}