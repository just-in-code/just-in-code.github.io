document.getElementById("userInputForm").addEventListener("submit",function(e) {
    let userInput = document.getElementById("userinput"); // Get input value
    handleInput(userInput.value); // Verify Input
    userInput.value = "";
    e.preventDefault(); // Prevent form from resetting
})

function binToDec(num) {  // Function to convert binary to decimal
    return parseInt(num,2);
}

function handleInput(input) { // Function to verify input
    if(isFinite(input) && !isNaN(input) && input.match(/^[01]+$/g)) { // Check whether input is a binary number
        document.getElementById("result").textContent = (input + " (Binary value) = " + binToDec(input) + " (Decimal value)");
    } else {
        alert("Only Binary Numbers Allowed!")
        document.getElementById("result").textContent = "";
    }
}

