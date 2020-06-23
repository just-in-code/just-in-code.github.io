let sliders = document.getElementsByClassName("rangeInput");
[...sliders].forEach(e => e.addEventListener("change",function() {
    changeObjRadius();
}))

function changeObjRadius() {
    let [upleft, upright, loleft, loright] = sliders;

    let obj = document.getElementById("obj");
    obj.style.borderRadius = `${upleft.value}% ${upright.value}% ${loleft.value}% ${loright.value}%`;
    
    let p = document.getElementsByTagName("p");
    [...p].forEach((e,i) => e.textContent = sliders[i].value + "%");
}