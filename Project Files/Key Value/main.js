window.addEventListener("keydown",(event) => {
    let key = event.key;
    let keyCode = event.keyCode;
    if(key == "Shift" || key == "Alt" || key == "Meta" || key == "Control") {
        toggleKey(key);
        setTimeout(() => {toggleKey(key)},1000);
    }
    if(event.keyCode == 32) key = "Space";

    document.getElementById("key-value").innerHTML =  key;
    document.getElementById("key-code").innerHTML =  keyCode;
})

const toggleKey = (key) => {
    if(document.getElementById(`${key}`).classList.contains('btnactive')) {
        document.getElementById(`${key}`).classList.remove('btnactive') 
    } else {
        document.getElementById(`${key}`).classList.add('btnactive')
    }
}