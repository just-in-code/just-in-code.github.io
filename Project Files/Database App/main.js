let screen = document.getElementById("queryResults");
let notificationPanel = document.getElementById("notificationPanel");
let logPanel = document.getElementById("logPanel");
let resultArr = [];

class Customer {
    constructor(dbName, dbStoreName, dbVersion) {
        this.dbName = dbName,   
        this.dbStoreName = dbStoreName,
        this.dbVersion = dbVersion

        if(!window.indexedDB) {
            updateScreen(notificationPanel, "Your browser does not support IndexedDB");
        } else {
            updateScreen(notificationPanel, "IndexedDB loaded successfully... Please wait...")
        }
    }

    initialLoad = (customerData) => {
        const request = indexedDB.open(this.dbName, this.dbVersion);
        updateScreen(logPanel, "Request now proceeding...")

        request.onerror = (event) => {updateScreen(logPanel,"Error : " + event.target.error)};

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            updateScreen(logPanel, "db upgrade required.");
            updateScreen(logPanel, "upgrade is proceeding.");
            updateScreen(logPanel, "upgrade is completed.");

            const store = db.createObjectStore(this.dbStoreName, { keyPath : 'userid' });
            updateScreen(logPanel, "Object store " + this.dbStoreName + "is created.");

            store.onerror = (event) => { updateScreen(logPanel, "Error : " + event.target.error)};

            store.createIndex('name', 'name', { unique: false });
            store.createIndex('email', 'email', { unique: true });

            customerData.forEach(customer => store.add(customer));
            // db.close();  
            updateScreen(logPanel, "db closed");
        };
        request.onsuccess = (event) => {
            const db = event.target.result;
            updateScreen(logPanel, "db is now loaded.");
            const tx = db.transaction(this.dbStoreName, 'readwrite');
            updateScreen(logPanel, "Accessing db store");;
            const store = tx.objectStore(this.dbStoreName, { keyPath : 'userid' });
            customerData.forEach(customer => store.add(customer));
            updateScreen(logPanel, "Data updated successfully.");
        }
        
        updateScreen(logPanel, "DB operation finished successfully.");
    };

    removeAllRows = () => {
        const request = indexedDB.open(this.dbName, this.dbVersion);
        updateScreen(logPanel, "Request now proceeding...");
        request.onerror = (event) => { updateScreen(logPanel,"Error : " + event.target.error) };

        request.onsuccess = (event) => {
            updateScreen(logPanel, "Request Successful.");
            const db = event.target.result;
            updateScreen(logPanel, "db is now loaded.");
            const tx = db.transaction(this.dbStoreName, 'readwrite');
            updateScreen(logPanel, "Accessing db store");
            tx.onerror = (event) => { updateScreen(logPanel, "Error : " + event.target.error) };
            tx.oncomplete = (event) => { updateScreen(logPanel, "All rows removed.")};
            const store = tx.objectStore(this.dbStoreName);
            const getAllKeysRequest = store.getAllKeys();
            getAllKeysRequest.onsuccess = (event) => {
                getAllKeysRequest.result.forEach((key) => {
                    updateScreen(logPanel, event.target.result);
                    store.delete(key);
                })
            }
        }
    };

    showAllRows = () => {
        const request = indexedDB.open(this.dbName, this.dbVersion);
        updateScreen(logPanel, "Request now proceeding.");

        request.onerror = (event) => {updateScreen(logPanel, "Error : " + event.target.errorCode) };

        request.onsuccess = (event) => {
            updateScreen(logPanel, "Request Successful.");
            const db = event.target.result;
            updateScreen(logPanel, "db is now loaded.");
            const tx = db.transaction(this.dbStoreName, 'readonly');
            tx.onerror = (event) => { updateScreen(logPanel, "Error : " + event.target.error.message) };
            tx.oncomplete = (event) => { updateScreen(logPanel, "Data Loaded.")};
            const store = tx.objectStore(this.dbStoreName);
            updateScreen(logPanel, "store loaded");
            store.getAll().onsuccess = (event) => {
                let resultArr = [];
                updateScreen(logPanel, "Store 'getAll' request successful.");
                event.target.result.forEach((e) => {
                    resultArr.push(e);
                });
                generateTable(resultArr);
            }
        }
    }
}

const DBNAME = 'customerss_db';
const DBSTORENAME = 'customerss';
const DBVERSION = 1;

function updateScreen(element, data) {
    element.innerHTML += "<br>" + data;
}

const clearDB = () => {
    let customer = new Customer(DBNAME, DBSTORENAME, DBVERSION);
    updateScreen(logPanel, "Delete all rows from customers.");
    customer.removeAllRows();
    screen.innerHTML = "";
    updateScreen(notificationPanel, "db cleared successfully.");
}

const loadDB = () => {
    updateScreen(logPanel, "Loading the Customers database.");
    let customer = new Customer(DBNAME, DBSTORENAME, DBVERSION);
    const customerData = [
        { userid: '44w5y4', name: 'Bill', email: 'bill@company.com' },
        { userid: '555g5', name: 'Donna', email: 'donnas@company.com' },
        { userid: '4w6hj4', name: 'John', email: 'john@company.com' },
        { userid: '554w6w6', name: 'Jeremy', email: 'jeremy@company.com' },
        { userid: '4w64∑4', name: 'Tom', email: 'tom@company.com' },
        { userid: '555', name: 'Jack', email: 'jack@company.com' },
        { userid: '44g5w4', name: 'Lisa', email: 'lisa@company.com' },
        { userid: '55235', name: 'Mike', email: 'mike@company.com' },
        { userid: '44awe44', name: 'Mary', email: 'mary@company.com' },
        { userid: '55reg5', name: 'Jenny', email: 'jenny@company.com' }
    ];
    customer.initialLoad(customerData);
    updateScreen(notificationPanel, "db loaded successfully.");
}

const showDB = () => {
    let customer = new Customer(DBNAME, DBSTORENAME, DBVERSION);
    updateScreen(logPanel, "Showing 'Customers' database.");
    customer.showAllRows();
    updateScreen(notificationPanel, "db rendered successfully.");
}

const generateTable = (arr) => {
    screen.innerHTML = ""; 
    if(arr.length == 0) {
        updateScreen(notificationPanel, "No Data Found. Probably deleted?");
        return;
    }; 
    let rawHTML = ` 
    <table>
        <tr id="tableheader">
           <th>Userid</th>
           <th>UserName</th>
           <th>Email</th>
         </tr>
    </table>`;
    updateScreen(notificationPanel, "Table generated successfully.");

    let rawHTMLData = "";

    arr.forEach(e => {
        rawHTMLData += `
         <tr>
                <td>${e.userid}</td>
                <td>${e.name}</td>
               <td>${e.email}</td>
        </tr>
    `;
    })
    screen.insertAdjacentHTML('beforeend',rawHTML);
    document.getElementById("tableheader").insertAdjacentHTML('afterend',rawHTMLData);
    updateScreen(notificationPanel, "Table data inserted.");
    updateScreen(notificationPanel, "Table rendered successfully.")
}

const queryBtn = document.getElementById("queryDB");
const loadBtn = document.getElementById("loadDB");
const clearBtn = document.getElementById("clearDB");

queryBtn.addEventListener("click",showDB);
loadBtn.addEventListener("click",loadDB);
clearBtn.addEventListener("click",clearDB);
