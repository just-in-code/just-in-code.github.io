// Global Variables
let userScore = document.getElementById("userScore"); // Used to update user points on screen
let userPrevious = document.getElementById("userPrevious"); // Used to store previous match result
let userPoints = 0; // Variable to store user points 
let userTotal = 0; // Variable to store user previous match points
let computerScore = document.getElementById("computerScore"); // Used to update computer points on screen
let computerPrevious = document.getElementById("computerPrevious"); // Used to store previous match result
let computerPoints = 0; // Variable To Store Computer Points
let computerTotal = 0; // Variable to store computer previous match points
let alertBox = document.getElementById("alert"); // Retrieve alertbox from document
let restartButton = document.getElementById("restart");
let exitButton = document.getElementById("exit");
let userChoices = document.getElementsByClassName("userChoices"); // Retreive all choice emoji

let start = document.getElementById("startGame"); // Listen for click event on "start" button
start.addEventListener("click",startGame);

let choices = ["Rock", "Paper", "Scissors"]; // Array to store available choices 

let choiceObj = { // Object to store emoji 
    Rock : "&#x1F44A",
    Paper : "&#x1F590",
    Scissors : "&#x270C;&#xFE0F;"
}

function createElement(value){  // Function to create a new element to update player's choice on screen
    return `<p class="choiceSymbol">${choiceObj[value]}</p>`
}

function setAlertBox(){ // Function to setup alertbox
    // Setup alertbox
    alertBox.style.display = "block"; // Show alertbox
    let i = 3; // Store seconds

    let timer = setInterval(function(){ // Interval to update alertbox content
        alertBox.textContent = "Starting in " + i;
        i--;
    },1000)

    setTimeout(function(){ // Remove "timer" interval after 4 seconds 
        clearInterval(timer);
        alertBox.style.display = "none";  // Remove alertbox
    }, 4000);
}

function init(){ 
    let userMove = this.dataset.choice; // Get value of emoji clicked
    document.getElementById("userChoice").innerHTML = createElement(userMove); // Update Screen

    let computerMove = Math.floor(Math.random() * choices.length); // Generate random numbers
 
    let computerMoves = choices[computerMove]; // Retreive value based on random number generated above
    document.getElementById("computerChoice").innerHTML = createElement(computerMoves); // Update Screen
     console.log(userMove, computerMoves );
    // Game Logic

    if(userMove == "Scissors") {
        if(computerMoves == "Scissors") {
            console.log("TIE");
        } else if(computerMoves == "Paper") {
            userPoints++;
            userScore.innerHTML = `User Score = ${userPoints}`;
        } else {
            computerPoints++;
            computerScore.innerHTML = `Computer Score = ${computerPoints}`;
        }
    }

    if(userMove == "Paper") {
         if(computerMoves == "Paper") {
             console.log("TIE");
         } else if(computerMoves == "Rock") {
             userPoints++;
             userScore.innerHTML = `User Score = ${userPoints}`;
         } else {
             computerPoints++;  
             computerScore.innerHTML = `Computer Score = ${computerPoints}`;
         }
     }

     if(userMove == "Rock") {
         if(computerMoves == "Rock") {
             console.log("TIE");
         } else if(computerMoves == "Scissors") {
             userPoints++;
             userScore.innerHTML = `User Score = ${userPoints}`;
         } else {
             computerPoints++;
             computerScore.innerHTML = `Computer Score = ${computerPoints}`;
         }
     }
     checkWinner();
 }

function startGame(){ // Main Function to start game
    setAlertBox(); // Initialize alertbox
    setTimeout(function(){[...userChoices].forEach(e => e.addEventListener("click", init))},4000); // Add eventlistener to every choice emoji
    start.removeEventListener("click",startGame); // Remove eventlistener for "start" button
}

function exitGame(){    
    alertBox.style.display = "none";
    restartButton.style.display = "none";
    exitButton.style.display = "none"
    resetGame();
    start.addEventListener("click",startGame); // Remove eventlistener for "start" button
}

function resetGame(res){ // Function to reset game
    // Reset User
    userScore.textContent = "User Score = 0"; 
    userPoints = 0;
    // Reset Computer
    computerScore.textContent = "Computer Score = 0"; 
    computerPoints = 0;
    // Reset Screen
    alertBox.textContent = "";
    alertBox.style.display = "none";
    restartButton.style.display = "none";
    exitButton.style.display = "none";
    if(res) startGame();
}

function checkWinner(){
    let winner = "";

    if(userPoints >= 10) {
       winner = "User";
       userTotal++;
       userPrevious.textContent = `Match Won = ${userTotal}`;
    } else if(computerPoints >= 10) {
        winner = "Computer";
        computerTotal++;
        computerPrevious.textContent = `Match Won = ${computerTotal}`;
    }

    if(winner) {
        [...userChoices].forEach(e => e.removeEventListener("click",init));
        alertBox.textContent = ""; 
        alertBox.style.display = "block";
        restartButton.style.display = "block";
        exitButton.style.display = "block"
        let alerts = setTimeout(function(){
            alertBox.textContent = `${winner} is winner`;
        },100);
    }
}