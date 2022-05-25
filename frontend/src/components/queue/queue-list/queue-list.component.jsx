import "./queue-list.styles.css";

import ContainerShade from "../../container-shade/container-shade.component";
import QueueItem from "../queue-item/queue-item.component";

export default function QueueList({onDequeue, queueList, error}){
    let count = 0;
    return(
        <ContainerShade className="queueList">
            {queueList && queueList.length > 0 && <button onClick={onDequeue}>Dequeue</button>}
            {error && <p>An Error Occured!</p>}
            {!error && (!queueList || (queueList && queueList.length === 0)) && <p>Queue is Empty</p>}
            {!error && queueList &&
                queueList.map(queue => (
                    <QueueItem
                        key={count++}
                        name={queue.name}
                        foodList={queue.foodList}
                        totalPrice={queue.totalPrice}
                    />
                ))
            }
        </ContainerShade>
    )
}