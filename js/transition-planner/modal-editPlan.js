// Get the modal
var editModal = document.getElementById("editPlanModal");

// Get the button that opens the modal
var btn = document.getElementById("editPlanModalButton");


var finalizeEdits =  document.getElementById("finalizePlanEdits");
var closeWithoutSave = document.getElementById("closeEditsNoSave");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  formatJSONToEditableTable();
  editModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
finalizeEdits.onclick = function() {

  var isMtF = false;
  if (ganttChartJSON.MtFPlanObject == null )
      isMtF = false;
  else
      isMtF = true;

  parseTableToJSON(isMtF);
    renderGanttChart( );
    editModal.style.display = "none";
}

closeWithoutSave.onclick = function() {
  editModal.style.display = "none";
}
