// Restrict input to digits and '.' by using a regular expression filter.
setInputFilter(document.getElementById("num_only"), function (value) {
    return /^\d*$/.test(value);
});
function genQueueNo(queueObj) {
    return queueNo = queueObj.QueueType + queueObj.QueueNo.toString().padStart('4', 0);
}
let currentNo;

async function callNext(requestUrl) {
    let counterNo = document.getElementById("num_only").value;
    if (counterNo === "") {
        showAlert("counterWarning", "Please enter your counter number");
        return;
    } 

    let result = await fetch(requestUrl + "/" + counterNo);
    let data = await result.json();
    if (data.QueueNo !== 0) {
        let queueNo = genQueueNo(data);

        currentNo = data.QueueNo;
        showAlert("calling_alert", "Calling Queue No <b>" + queueNo + "</b>");
        document.getElementById("calling_header").innerHTML = "Calling " + queueNo;
        document.getElementById("call_again").disabled = false;
        document.getElementById("skip").disabled = false;
    } else {
        showAlert("no_queue_alert", "There is no one in the queue right now");
        document.getElementById("calling_header").innerHTML = "";
        document.getElementById("call_again").disabled = true;
        document.getElementById("skip").disabled = true;
    }
}

async function callAgain(requestUrl) {
    let result = await fetch(requestUrl + "/" + currentNo);
    let data = await result.json();
    let queueNo = genQueueNo(data);

    currentNo = data.QueueNo;
    showAlert("calling_again_alert", "Calling Queue No <b>" + queueNo + "</b> again");
}

async function skip(skipUrl, callNextUrl) {
    let result = await fetch(skipUrl+ "/" + currentNo);
    let data = await result.json();
    let queueNo = genQueueNo(data);
    await callNext(callNextUrl);
    showAlert("skip_alert", "Queue No <b>" + queueNo + "</b> had been skipped. Click on 'Call Next' to call the next person");

    document.getElementById("calling_header").innerHTML = "";
}

