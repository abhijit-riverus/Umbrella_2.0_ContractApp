export default class Queue {
    public static createQueue() {
        var queue: any[] = [];
        return queue;
    }
    public static addQueue(item: any, queue: any) {
        var itemIndex = queue.findIndex((el: any) => { return el.action.type === item.type; });
        if (itemIndex > -1) { // the same action exists
            if (queue[itemIndex].mod > item.mod) { // same action exists and the new action is not latest
                // do nothing
            } else {
                queue[itemIndex] = item; // item exists and the new action is latest, so replace with old action
            }
        } else {
            queue.push(item); // tem does not exists at all. so, keep pushing it
        }
        return queue;
    }
    public static popQueue(queue: any) {
        if (queue.length === 0) {
            // do nothing
        } else {
            queue.splice(0, 1);
        }
        return queue;
    }
}