import { Fragment, useReducer, useState, useEffect } from "react"; 
import QueueList from "../queue-list/queue-list.component";

export default function QueueTab() {
    const [queue, setQueue] = useState({
        queueSize: 0,
        list: null
    });

    const [error, setError] = useState(false);

    const getQueue = () => {
        fetch("/api/queue", {
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                const count = data.count;
                const queueAsArray = new Array();
                if(data){
                    while(data.head != null){
                        queueAsArray.push(data.head.data);
                        data.head = data.head.next;
                    }
                }
                setQueue({
                    queueSize: count,
                    list: queueAsArray
                });
            })
            .catch(() => setError(true))
    };

    const onDequeueHandler = () => {
        fetch("/api/queue/dequeue", {
            method: "DELETE",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            getQueue();
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getQueue()
    }, []);

    return (
        <Fragment>
            <QueueList onDequeue={onDequeueHandler} queueList={queue.list} error={error}/>
        </Fragment>
    );
}