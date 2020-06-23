let startBtn = document.getElementById("startMonitor");
let stopBtn = document.getElementById("stopMonitor");
let resetBtn = document.getElementById("resetMonitor");
let submitBtn = document.getElementById("submit");
let intervalRange = document.getElementById("intervalRange");

class IOTMailbox {
    constructor(signalInterval = 500, signalCallback) {
        this.signalInterval = signalInterval;
        this.signalCallback = signalCallback;
        this.intervalID = null;
        this.lastLightLevel = 0;
    }

    startMonitoring = () => {
        notify("Starting to monitor mailbox...")
        this.intervalID = window.setInterval(this.signalStateChange, this.signalInterval);
    }

    stopMonitoring = () => {
        if(this.intervalID == null) return;
        window.clearInterval(this.intervalID);
        this.intervalID = null;
        notify("Mailbox monitoring stopped...");
    }

    signalStateChange = () => {
        const lightLevel = this.lastLightLevel >= 0 
            ? Math.random().toFixed(2) * -1
            : Math.random().toFixed(2);
            if(this.signalCallback(lightLevel)) {
                this.stopMonitoring();  
                log(`Mailbox state changed - lightLevel: ${lightLevel} <br> ----------(Door is opened)----------`);
                return;
            }
        log(`Mailbox state changed - lightLevel: ${lightLevel} <br> ----------(Door is closed)----------`);
        this.lastLightLevel = lightLevel;
    }
}

const callback = (lightlevel) => {
    if(lightlevel == 1.00) {
        notify("Door Opened");  
        return true;
    } 
}

const notify = (text) => {
    document.getElementById("notification-container").innerHTML += `<br> ${text}`;
}

const log = (text) => {
    document.getElementById("log-container").innerHTML += `<br> ${text}`;
}

const init = () => {
    mail.startMonitoring();
}

const stop = () => {
    mail.stopMonitoring();
}

const reset = () => {
    mail.stopMonitoring();
    document.getElementById("notification-container").innerHTML = "";
    document.getElementById("log-container").innerHTML = "";
}

let mail = new IOTMailbox(1000,callback);

startBtn.addEventListener("click",() => {
    init();
})

stopBtn.addEventListener("click",() => {
    stop();
})

resetBtn.addEventListener("click",() => {
    reset();
})

submitBtn.addEventListener("click",() => {
        if(intervalRange.value < 100 || intervalRange.value >= 10000) { 
            notify("Out Of Range!");
            return;
        }

        if(confirm("Entering will restart")) { 
            reset();
            mail.signalInterval = intervalRange.value;
            notify("Mailbox restarting");
            notify("Please wait...");
            setTimeout(init,3000);
        }
    }
)   