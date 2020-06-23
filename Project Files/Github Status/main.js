// GITHUB STATUS API
const STATUSURL = "https://kctbh9vrtdwd.statuspage.io/api/v2/summary.json";
const INCIDENTURL = "https://kctbh9vrtdwd.statuspage.io/api/v2/incidents.json";

fetch(STATUSURL) 
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        updateData(data);
    });

fetch(INCIDENTURL) 
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        updateIncident(data);
    });

function updateData(data) {
    // show status update time
    document.getElementById("status-update-time").innerHTML = "Status Last Updated : " + formatDate(data.page.updated_at);
    // show whether all systems are operational
    document.getElementById("status").innerHTML = data.status.description;
    
    // remove 'Visit www.githubstatus.com for more information' and 'Others' item
    let filteredArray = [...data.components].filter(item => !(item.name.includes("githubstatus.com")) && !(item.name.includes("Other"))); 
     // loop through elements with "component-name" class and add data according to id dynamically
    filteredArray.forEach((item,index) => {
        document.getElementById(`cn${index + 1}`).innerHTML = item.name; // add component name
        document.getElementById(`sb${index + 1}`).innerHTML = (item.status == "operational") ? "OK" : "OOPS" ; // show component status
        document.getElementById(`cd${index + 1}`).innerHTML = item.description; // add component description
        document.getElementById(`cc${index + 1}`).innerHTML = "Created at : " + formatDate(item.created_at); // add component description
        document.getElementById(`cu${index + 1}`).innerHTML = "Updated at : " + formatDate(item.updated_at); // add component description
    });
}

// function to format date into DD/MM/YY, HH:MM:SS format
function formatDate(date) { 
    return new Date(Date.parse(date)).toLocaleString();
}

function updateIncident(data) {
    // get ul element
    let ul = document.getElementById("incident-list");
    // create list element and fill with data
    [...data.incidents].forEach((incident,index) => {
        let raw = `<li id="li${index}">${incident.name}<br><br>
                    Link : <a href="${incident.shortlink}">${incident.shortlink}</a><br>
                    Status : ${incident.status}<br>
                    Impact : ${incident.impact}<br>
                    Id : ${incident.id}<br>
                    Created At : ${formatDate(incident.created_at)}<br>
                    Resolved At : ${formatDate(incident.resolved_at)}<br>
                    Updated At : ${formatDate(incident.updated_at)}<br>
                    </li>`;
        // append list element to ul
        ul.insertAdjacentHTML("beforeend",raw);
    })   

    // function to toggle 'extend' effect
    let li = document.getElementsByTagName("li");
    [...li].forEach(item => item.addEventListener("click",function() {
        if(item.classList.contains('extended')) {
            item.classList.remove('extended');
        } else {
            item.classList.add('extended');
        }
    }))  
}

