let output = document.getElementById("CSV");
let button = document.getElementById("convert").addEventListener("click",function() {
    let input = document.getElementById("JSON").textContent; 
    let jsonObj = JSON.parse(input);
    output.textContent = ConvertToCSV(jsonObj);
})

function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var line = '';
    var head = array[0];
        
    for (var index in array[0]) {
        var value = index + "";
        line += '"' + value.replace(/"/g, '""') + '",';
    }
        

    line = line.slice(0, -1);
    str += line + '\r\n';
    

    for (var i = 0; i < array.length; i++) {
        var line = '';

            for (var index in array[i]) {
                var value = array[i][index] + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }

    return(str);
    
}
        
