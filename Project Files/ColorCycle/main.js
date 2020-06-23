let timer;
let input = document.getElementsByTagName("input");

function verifyInput() {
    let inputs = document.getElementsByClassName("userInput");
    if (!([...inputs].every(e => e.value >= 0 && e.value <= 255))) {
        alert("Error");
        document.getElementById("inputSection").reset();
        return;
    };
    return [...inputs].map(e => +e.value);
}

function colorChange([r,g,b],callback) {
    let container = document.getElementById("container");
    let displayred = document.getElementById("dred");
    let displaygreen = document.getElementById("dgreen");
    let displayblue = document.getElementById("dblue");
    let incRed = document.getElementById("incred").value;
    let incGreen = document.getElementById("incgreen").value;
    let incBlue = document.getElementById("incblue").value;
    let i = 1;
    [...input].forEach(e => e.disabled = true);
    timer = setInterval(function() {
        if(r < 255) r += +incRed || 1;
        if(g < 255) g += +incGreen || 1;
        if(b < 255) b += +incBlue || 1;
        displayred.innerHTML = "RED : " + r;
        displaygreen.innerHTML = "GREEN : " + g;
        displayblue.innerHTML = "BLUE : " + b;
        container.style.background = `rgb(${r}, ${g}, ${b})`;
        if(r >= 255 && g >= 255 && b >= 255) {
            displayred.innerHTML = "RED : 255";
            displaygreen.innerHTML = "GREEN : 255";
            displayblue.innerHTML = "BLUE : 255";
            clearInterval(timer);
            callback();
        }
    }, 250);
}

let button = document.getElementById("submit");
button.addEventListener("click",function() {
    if(this.textContent == "START") {
        this.textContent = "STOP";
        let that = this;
        colorChange(verifyInput(),function() {
            that.textContent = "START";
            [...input].forEach(e => e.disabled = false);
        });
    } else {
        this.textContent = "START";
        clearInterval(timer);
        [...input].forEach(e => e.disabled = false);
    }
}) ;
