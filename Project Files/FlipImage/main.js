let image = document.getElementById("imageContainer-inner");
let buttons = document.getElementsByTagName("button");
let x = 0;
let y = 0;

[...buttons].forEach(button => {
    button.addEventListener("click",function() {
        if(button.id == "up") {
            image.style.transform = `rotateX(${checkDegree("X", "up")}deg)`;
        } else if(button.id == "down") {
            image.style.transform = `rotateX(${checkDegree("X", "down")}deg)`;
        } else if(button.id == "left") {
            image.style.transform = `rotateY(${checkDegree("Y", "left")}deg)`;
        } else if(button.id == "right") {
            image.style.transform = `rotateY(${checkDegree("Y", "right")}deg)`;
        }
    })
})

function checkDegree(coor,dir) {
    if(coor == "X") {
        if(dir == "up") {
            if(x == 0) {
                x = 180;
            } else if(x == -180) {
                x = 0;
            }
        } 
        if(dir == "down") {
            if(x == 0) {    
                x = -180;
            } else if(x == 180) {
                x = 0;
            }
        }
        console.log(x,y);
        return x;
    }

    if(coor == "Y") {
        if(dir == "left") {
            if(y == 0) {
                y = -180;
            } else if(y == 180) {
                y = 0;
            }
        } 
        if(dir == "right") {
            if(y == 0) {    
                y = 180;
            } else if(y == -180) {
                y = 0;
            }
        }
        console.log(x,y);
        return y;
    }
}