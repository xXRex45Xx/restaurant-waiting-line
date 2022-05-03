class QueueNode {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class EmptyQueueError extends Error {
    constructor() {
        super("Cannot deque an empty queue.");
        this.name = "EmptyQueueError";
    }
}

export default class Queue {
    constructor(initialData = null) {
        if (initialData == null) {
            this.head = null;
            this.tail = null;
            this.count = 0;
            return;
        }

        if (initialData && Array.isArray(initialData)) {
            this.count = 0;
            initialData.sort((firstElement, secondElement) => firstElement.queueId - secondElement.queueId);
            for (const queueData of initialData) {
                console.log(queueData)
                this.enQueue(queueData.data);
            }
            return;
        }

        const newNode = new QueueNode(initialData);
        this.head = this.tail = newNode;
        this.count = 1;
    }

    isEmpty = () => this.count == 0;

    getCount = () => this.count;

    peepBack = () => this.tail.data;

    peepFront = () => this.head.data;

    enQueue = data => {
        const newNode = new QueueNode(data);

        if (this.isEmpty()) {
            this.head = this.tail = newNode;
            this.count++;
            return;
        }
        this.tail.next = newNode;
        this.tail = newNode;
        this.count++;
    }

    deQueue = () => {
        if (this.isEmpty())
            throw new EmptyQueueError();

        const data = this.head.data;
        if (this.count == 1)
            this.head = this.tail = null;
        else
            this.head = this.head.next;
        this.count--;

        return data;
    }

    empty = () => {
        while (!this.isEmpty())
            this.deQueue()
    }

    getAllAsArray = () => {
        const arr = new Array();
        let tempNode = this.head;
        let queueCount = 0;
        while (tempNode != null) {
            arr.push({
                queueId: queueCount++,
                data: tempNode.data
            });
            tempNode = tempNode.next;
        }

        return arr;
    }
}