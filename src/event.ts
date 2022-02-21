
export module Event {

    export class Event {
        canExecute: boolean;
        execute: Function;
        constructor (canExecuteFunc: boolean, executeFunc: Function) {
            this.canExecute = canExecuteFunc;
            this.execute = executeFunc;
        }
    }

    const rainEvent = new Event(true, function() {
        return true;
    });

    const snowEvent = new Event(true, function() {
        return true;
    });

}
