
function deleteTableRow(o) {
    //no clue what to put here?
    var p=o.parentNode.parentNode;
        p.parentNode.removeChild(p);
   }

var allTableRowsHTML = "";

function formatTableCellFromObj(scheduleObj, index, arr) {
    
    var selectStatusOptionHTML = ""

    if (scheduleObj.status == "NEEDS-SCHEDULING") {
        selectStatusOptionHTML += "<option selected='true'>NEEDS-SCHEDULING</option>";
    }
    else {
        selectStatusOptionHTML += "<option>NEEDS-SCHEDULING</option>"; 
    }
    if (scheduleObj.status == "SCHEDULED") {
        selectStatusOptionHTML += "<option selected='true'>SCHEDULED</option>";
    }
    else {
        selectStatusOptionHTML += "<option>SCHEDULED</option>"; 
    }
    if (scheduleObj.status == "IN-PROGRESS") {
        selectStatusOptionHTML += "<option selected='true'>IN-PROGRESS</option>";
    }
    else {
        selectStatusOptionHTML += "<option>IN-PROGRESS</option>"; 
    }
    if (scheduleObj.status == "BEFORE") {
        selectStatusOptionHTML += "<option selected='true'>BEFORE</option>";
    }
    else {
        selectStatusOptionHTML += "<option>BEFORE</option>"; 
    }
    if (scheduleObj.status == "ONSET") {
        selectStatusOptionHTML += "<option selected='true'>ONSET</option>";
    }
    else {
        selectStatusOptionHTML += "<option>ONSET</option>"; 
    }
    if (scheduleObj.status == "MAX-EFFECT") {
        selectStatusOptionHTML += "<option selected='true'>MAX-EFFECT</option>";
    }
    else {
        selectStatusOptionHTML += "<option>MAX-EFFECT</option>"; 
    }
    if (scheduleObj.status == "TBD") {
        selectStatusOptionHTML += "<option selected='true'>TBD</option>";
    }
    else {
        selectStatusOptionHTML += "<option>TBD</option>"; 
    }
    if (scheduleObj.status == "VARIABLE") {
        selectStatusOptionHTML += "<option selected='true'>VARIABLE</option>";
    }
    else {
        selectStatusOptionHTML += "<option>VARIABLE</option>"; 
    }
    if (scheduleObj.status == "DONE") {
        selectStatusOptionHTML += "<option selected='true'>DONE</option>";
    }
    else {
        selectStatusOptionHTML += "<option>DONE</option>"; 
    }


    var tableRow = "<tr>" + 
    "<td><input type='date' id='start-" + index + "' value='" + new Date(scheduleObj.startDate).toISOString().split('T')[0] + "'></input></td>" + 
    "<td><input type='date' id='end-" + index + "' value='" + new Date(scheduleObj.endDate).toISOString().split('T')[0] + "'></input></td>" +
    "<td><input type='text' id='name-" + index + "' value='" + scheduleObj.taskName + "'></input></td>" +
    "<td><select name='status-" + index + "' id='status-select-" + index + "'>" + selectStatusOptionHTML + "</select></td>" +
    "<td><input type='button' value='Delete' onclick='deleteTableRow(this)'></tr>"

    allTableRowsHTML += tableRow;

}

function formatJSONToEditableTable () {
    var div = document.getElementById('planEditTable');
    data = ganttChartJSON.tasks;
    allTableRowsHTML = '<table id="editPlanTable" class="table table-striped">' +
    '<tr><th class="th-bold">Start Date</th><th class="th-bold">End Date</th><th class="th-bold">Name</th><th class="th-bold">Status</th><th class="th-bold">Remove</th></tr>'
    data.forEach(formatTableCellFromObj)
    allTableRowsHTML += "</table>"

    div.innerHTML = allTableRowsHTML;
}