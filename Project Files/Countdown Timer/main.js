let form = document.getElementById("userForm");

form.addEventListener("submit",function(event) {
    event.preventDefault();
    let date = document.getElementById("date").value;
    let title = document.getElementById("eventName").value;
    let hour = document.getElementById("hours").value;
    let minute = document.getElementById("minutes").value;
    let second = document.getElementById("seconds").value;
    if(!verifyDate(date)) return;
    let formattedDate = newDate(date);
    console.log(formattedDate);
    let timer = createNewTimer(title, formattedDate, hour, minute, second);
})

function verifyDate(date, hour = 0, minute = 0, second = 0) {
    let regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    if(!((hour >= 0 && hour <= 24) && (minute >= 0 && minute <= 60) && (second >= 0 && second <= 60) && regex.test(date))) {
        alert("Error");
        return;
    };
    return true;
}

function newDate(dateStr) {
    const [day, month, year] = dateStr.split(/[-/.]/);
    return new Date(year, month - 1, day);
}

function createNewTimer(title, date, hour = 0, minute = 0, second = 0) {
    form.style.display = "none";
    document.getElementById("countdown").style.display = "block";
    let titleDisplay = document.getElementById("eventTitle");
    titleDisplay.textContent = title;
    let countdownDays = document.getElementById("countdownDays");
    let countdownHours = document.getElementById("countdownHours");
    let countdownMinutes = document.getElementById("countdownMins");
    let countdownSeconds = document.getElementById("countdownSecs");
    
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(second);
    let countDownDate = date.getTime();
    console.log(countDownDate);
    let x = setInterval(function() {
        let now = new Date().getTime();
        console.log(now.toString());
        let d = countDownDate - now;
        let days = Math.floor( d/(1000*60*60*24) );
        let hours = Math.floor( (d/(1000*60*60)) % 24 );
        let minutes = Math.floor( (d/1000/60) % 60 );
        let seconds = Math.floor( (d/1000) % 60 );

        countdownDays.innerHTML = `${days} <p class="unit">Days</p>`;
        countdownHours.innerHTML = `${hours} <p class="unit">Hours</p>`;
        countdownMinutes.innerHTML = `${minutes} <p class="unit">Mins</p>`;
        countdownSeconds.innerHTML = `${seconds} <p class="unit">Secs</p>`;
        
        if(d < 0) {
            clearInterval(x);
            alert("Times Up!");
        }
    }, 1000)
}

function resetTimer() {
    form.style.display = "flex";
    document.getElementById("countdown").style.display = "none";
}

document.getElementById("reset").addEventListener("click", resetTimer);