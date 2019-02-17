// Restrict input to digits and '.' by using a regular expression filter.
setInputFilter(document.getElementById("num_only"), function (value) {
    return /^\d*$/.test(value);
});

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
