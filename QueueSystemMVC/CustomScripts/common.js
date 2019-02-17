// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    });
}

// Restrict input to digits and '.' by using a regular expression filter.
setInputFilter(document.getElementById("num_only"), function (value) {
    return /^\d*$/.test(value);
});

let delayIds = {}

function showAlert(alertId, msg) {
    if (alertId in delayIds) clearTimeout(delayIds[alertId]);

    let elem = document.getElementById(alertId);
    elem.hidden = false;
    elem.innerHTML = msg;
    delayIds[alertId] = setTimeout(
        () => elem.hidden = true,
        5000
    )
}

function genQueueNo(queueObj) {
    return queueNo = queueObj.QueueType + queueObj.QueueNo.toString().padStart('4', 0);
}

// Register
async function signIn(signInType, requestUrl) {
    let result = await fetch(requestUrl + "/" + signInType);
    let data = await result.json();
    let queueNo = genQueueNo(data);

    showAlert("success_register", "Queue No <b>" + queueNo + "</b> has been created.")
}

async function reenroll(url) {
    let elem = document.getElementById("num_only")
    let result = await fetch(url + "/" + elem.value)
    let data = await result.json();
    let queueNo = genQueueNo(data);

    elem.value = "";
    showAlert("reenroll_success", "Queue No <b>" + queueNo + "</b> has been added back to the queue.")
}

// Counter
let currentQueueNo;

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

async function skip(requestUrl) {
    let result = await fetch(requestUrl + "/" + currentNo);
    let data = await result.json();
    let queueNo = genQueueNo(data);

    currentNo = data.QueueNo;
    showAlert("skip_alert", "Queue No <b>" + queueNo + "</b> had been skipped. Click on 'Call Next' to call the next person");

    document.getElementById("call_again").disabled = true;
    document.getElementById("skip").disabled = true;
    document.getElementById("calling_header").innerHTML = "";
}

