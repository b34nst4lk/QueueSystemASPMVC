function genQueueNo(queueObj) {
    return queueNo = queueObj.QueueType + queueObj.QueueNo.toString().padStart('4', 0);
}
