class QueueDisplay {
    constructor() {
        this.callingArray = new Array();
        this.skippedArray= new Array();
        this.counterDoms = Array(...document.getElementsByClassName("counter"));
        this.queueNoDoms = Array(...document.getElementsByClassName("queueNo"));
        this.skippedDoms = Array(...document.getElementsByClassName("skipped"));
        this.bell = new Audio("/Content/bell.mp3");

        const order_by_id = (a, b) => {
            if (a.id < b.id) return -1;
            else if (a.id > b.id) return 1;
            else return 0;
        }

        this.counterDoms = this.counterDoms.sort(order_by_id);
        this.queueNoDoms = this.queueNoDoms.sort(order_by_id);
        this.skippedDoms = this.skippedDoms.sort(order_by_id);

        this.call_next = this.call_next.bind(this);
        this.remove = this.remove.bind(this);
        this.remove_and_prepend = this.remove_and_prepend.bind(this);
        this.render = this.render.bind(this);
    }

    call_next(newQ) {
        newQ = add_domObjs_to_queue(newQ);
        this.skippedArray = this.remove(newQ, this.skippedArray);
        console.log(this.skippedArray);
        this.callingArray = this.remove_and_prepend(newQ, this.callingArray).slice(0, 8);
        this.bell.play();
    }

    skip_number(currentQ) {
        this.callingArray = this.remove(currentQ, this.callingArray);
        currentQ.queueDom = create_queue_domObj(genQueueNo(currentQ));
        this.skippedArray = this.remove_and_prepend(currentQ, this.skippedArray).slice(0,10);
    }

    reenroll(Q) {
        this.skippedArray = this.remove(Q, this.skippedArray);
    }

    remove(newQ, qArray) {
        return qArray.filter(q => q.QueueNo !== newQ.QueueNo);
    }

    remove_and_prepend(newQ, qArray) {
        let newArray = this.remove(newQ, qArray);
        newArray.unshift(newQ);
        return newArray;
    }

    render() {
        this.callingArray.forEach((q, i) => {
            this.counterDoms[i].innerHTML = "";
            this.counterDoms[i].appendChild(q.counterDom);
            this.queueNoDoms[i].innerHTML = "";
            this.queueNoDoms[i].appendChild(q.queueDom);
        });

        this.skippedDoms.forEach((d, i) => {
            d.innerHTML = "";
            try {
                d.appendChild(this.skippedArray[i].queueDom);
            } catch (Exception) {
                d.appendChild(create_filler_div())
            }

        });
    }
}

function add_domObjs_to_queue(q) {
    q.counterDom = create_queue_domObj(q.CounterNo);
    q.queueDom = create_queue_domObj(genQueueNo(q));
    set_flash(q);
    return q;
}

function create_filler_div() {
    let domObj = document.createElement("div");
    domObj.innerText = "00000";
    domObj.classList.add("white");
    return domObj;
}

function create_queue_domObj(innerText) {
    let domObj = document.createElement("div");
    domObj.innerText = innerText;
    return domObj
}

function set_flash(q) {
    q.counterDom.classList.add("flash")
    q.queueDom.classList.add("flash")
    setTimeout(function () {
        q.counterDom.classList.remove("flash");
        q.queueDom.classList.remove("flash");
    }, 5000)

}

function connect() {
    let uri = "ws://" + window.location.host+ "/api/WebSocket";
    websocket = new WebSocket(uri); 

    websocket.onopen = () => console.log("connected");
    websocket.onclose = () => console.log("disconnected");

    websocket.onerror = function (event) {
        console.error(error);
    }

    let queue = new QueueDisplay();

    websocket.onmessage = function (event) {
        let message = JSON.parse(event.data);

        switch (message.Type) {
            case "call_next":
                queue.call_next(message.Queue);
                break;
            case "call_again":
                queue.call_next(message.Queue);
                break;
            case "skip_number":
                queue.skip_number(message.Queue);
                break;
            case "reenroll":
                queue.reenroll(message.Queue);
                break;
        }
        queue.render();
    }
}

connect();