class QueueDisplay {
    constructor() {
        this.callingArray = new Array();
        this.missedArray = new Array();
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
        this.remove_and_prepend = this.remove_and_prepend.bind(this);
        this.render = this.render.bind(this);
    }

    call_next(newQ) {
        newQ = add_domObjs_to_queue(newQ);
        this.callingArray = this.remove_and_prepend(newQ).slice(0, 8);
        this.bell.play();
    }

    remove_and_prepend(newQ) {
        let newArray = this.callingArray.filter(q => q.QueueNo !== newQ.QueueNo);
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
        document.dispatchEvent(new Event("flash"));
    }
}

function add_domObjs_to_queue(q) {
    q.counterDom = create_queue_domObj(q.CounterNo);
    q.queueDom = create_queue_domObj(q.QueueType + q.QueueNo);
    return q;
}

function create_queue_domObj(innerText) {
    let domObj = document.createElement("div");
    domObj.innerText = innerText;
    domObj.classList.add("flash")
    setTimeout(function () {
        console.log("flashed");
        domObj.classList.remove("flash");
    }, 5000)

    return domObj
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
        }
        queue.render();
    }
}

connect();