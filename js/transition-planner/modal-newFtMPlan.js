




var allQuestionHTMLFtm = "";

var roundOneResponsesFtM = [];
var roundTwoResponsesFtM = [];
var roundThreeResponsesFtM = [];
var roundFourResponsesFtM = [];

var answersRoundOneFtM = [];
var answersRoundTwoFtM = [];
var answersRoundThreeFtM = [];
var answersRoundFourFtM = [];

function initFtMModal() {
   answersRoundOneFtM = getAnswersRoundOneFtM();
   answersRoundTwoFtM = getAnswersRoundTwoFtM();
   answersRoundThreeFtM = getAnswersRoundThreeFtM();
   answersRoundFourFtM = getAnswersRoundFourFtM();
}


function parseFtMQuestionTableToJSON(iterator) {

  var tableLength = document.getElementById("ftmQuestionTable").rows.length;
  for(var taskIterator = 0; taskIterator < tableLength - 1; taskIterator++) {
      if (iterator == 0) {
        var statusSelect = document.getElementById("question-round-one-status-select-" + taskIterator)
        roundOneResponsesFtM.push(statusSelect.options[statusSelect.selectedIndex].value);
      }
      else if (iterator == 1) {
        var newDate = new Date(document.getElementById("ftm-plan-start-date-" + taskIterator).value);
        roundTwoResponsesFtM.push(newDate);
      }
      else if (iterator == 2) {
        var number = document.getElementById("ftm-plan-number-" + taskIterator).value;
        roundThreeResponsesFtM.push(number)
      }
      else if (iterator == 3) {
        var number = document.getElementById("ftm-plan-freq-" + taskIterator).value;
        roundFourResponsesFtM.push(number)
      }

  }
}


function formatTableCellFromObjRoundOneFtM(question, index, arr) {


  var answer = answersRoundOneFtM[index];

  var selectStatusOptionHTML = ""

      if(answer === "NEEDS-SCHEDULING")
        selectStatusOptionHTML += "<option selected='true' value='NEEDS-SCHEDULING'>Yes, I haven't scheduled it</option>"; 
      else
        selectStatusOptionHTML += "<option value='NEEDS-SCHEDULING'>Yes, I haven't scheduled it</option>"; 

      if(answer === "SCHEDULED")
      selectStatusOptionHTML += "<option selected='true' value='SCHEDULED'>Yes, I have scheduled this.</option>"; 
      else
      selectStatusOptionHTML += "<option value='SCHEDULED'>Yes, I have scheduled this.</option>"; 

      if (answer == "IN-PROGRESS" )
        selectStatusOptionHTML += "<option selected='true' value='IN-PROGRESS'>Yes, this is in progress.</option>"; 
      else 
        selectStatusOptionHTML += "<option value='IN-PROGRESS'>Yes, this is in progress.</option>"; 

      if (answer == "TBD" )
      selectStatusOptionHTML += "<option selected='true' value='TBD'>I haven't decided</option>"; 
      else 
      selectStatusOptionHTML += "<option value='TBD'>I haven't decided</option>"; 

      if (answer == "DONE" )
      selectStatusOptionHTML += "<option selected='true' value='DONE'>Yes, I already did this.</option>";
      else
      selectStatusOptionHTML += "<option value='DONE'>Yes, I already did this.</option>";

      if (answer == "WILL-NOT-DO" )
      selectStatusOptionHTML += "<option selected='true' value='WILL-NOT-DO'>No, I won't do this</option>"; 
      else
      selectStatusOptionHTML += "<option value='WILL-NOT-DO'>No, I won't do this</option>"; 

  var tableRow = "<tr>" + 
  "<td>" + question + "</td>" +
  "<td><select name='question-round-one-status-" + index + "' id='question-round-one-status-select-" + index + "'>" + selectStatusOptionHTML + "</select></td>";
  allQuestionHTMLFtm += tableRow;
}

function formatTableCellFromObjRoundTwoFtM(question,index,arr) {
  var answer = answersRoundTwoFtM[index];
  var disabledText = "";
  if (roundOneResponsesFtM[index] === "WILL-NOT-DO") {
    disabledText = " disabled";
  }
  var tableRow = "<tr>" + 
  "<td>" + question + "</td>" +
  "<td><input type='date' id='ftm-plan-start-date-" + index + "' value='" + answer.toISOString().split('T')[0] + "'" + disabledText + "></input></td>"
  allQuestionHTMLFtm += tableRow;
}

function formatTableCellFromObjRoundThreeFtM(question,index,arr) {
  var answer = answersRoundThreeFtM[index];
  var disabledText = "";

  //Mapping from earlier questions
  var roundOneQuestionIndex = [6,7,8]

  if (roundOneResponsesFtM[roundOneQuestionIndex[index]] === "WILL-NOT-DO") {
    disabledText = " disabled";
  }
  var tableRow = "<tr>" + 
  "<td>" + question + "</td>" +
  "<td><input type='number' id='ftm-plan-number-" + index + "' value='" + answer + "'" + disabledText + "></input></td>"
  allQuestionHTMLFtm += tableRow;
}

function formatTableCellFromObjRoundFourFtM(question,index,arr) {
  var answer = answersRoundFourFtM[index];
  var disabledText = "";

  //Mapping from earlier questions
  var roundOneQuestionIndex = [6]

  if (roundOneResponsesFtM[roundOneQuestionIndex[index]] === "WILL-NOT-DO") {
    disabledText = " disabled";
  }
  var tableRow = "<tr>" + 
  "<td>" + question + "</td>" +
  "<td><input type='number' id='ftm-plan-freq-" + index + "' value='" + answer + "'" + disabledText + "></input></td>"
  allQuestionHTMLFtm += tableRow;
}

function nextFtMButton(iterator) {
  parseFtMQuestionTableToJSON(iterator);
  iterator += 1;

  if (iterator == 4) {
    //Use all the responses, there will be a lot of them
    thisFtMPlan = new FtMPlanObject(
      roundTwoResponsesFtM[0], roundOneResponsesFtM[0],
      roundTwoResponsesFtM[1], roundOneResponsesFtM[1],
      roundTwoResponsesFtM[2], roundOneResponsesFtM[2],
      roundTwoResponsesFtM[3], roundOneResponsesFtM[3],
      roundTwoResponsesFtM[4], roundOneResponsesFtM[4],
      roundTwoResponsesFtM[5], roundOneResponsesFtM[5],
      //Counseling
      roundTwoResponsesFtM[6], roundThreeResponsesFtM[0], roundFourResponsesFtM[0],  roundOneResponsesFtM[6],
      );

      generateAndRenderFtMPlan(thisFtMPlan);
    ftmModal.style.display = "none";
    mtfDiv.style.display= "none"; //Hide the other div
    hideTopButtonsAndScrollDown();
  }

  formatTableQuestionsFtM(iterator);
}

function formatTableQuestionsFtM(iterator) {
  var div = document.getElementById('ftmQuestions');
  allQuestionHTMLFtm = '<table id="ftmQuestionTable" class="table table-striped">';
  if (iterator == 0) {
    allQuestionHTMLFtm += '<tr><th class="th-bold">Are you planning to:</th><th class="th-bold">Answer</th></tr>'
    questionsRoundOneFtM.forEach(formatTableCellFromObjRoundOneFtM)
  }
  else if (iterator == 1) {
    allQuestionHTMLFtm += '<tr><th class="th-bold">When will you:</th><th class="th-bold">Date</th></tr>'
    questionsRoundTwoFtM.forEach(formatTableCellFromObjRoundTwoFtM)
  }
  else if (iterator == 2) {
    allQuestionHTMLFtm += '<tr><th class="th-bold">How Many:</th><th class="th-bold">Date</th></tr>'
    questionsRoundThreeFtM.forEach(formatTableCellFromObjRoundThreeFtM)
  }
  else if (iterator == 3) {
    allQuestionHTMLFtm += '<tr><th class="th-bold">How Many Days Between:</th><th class="th-bold">Date</th></tr>'
    questionsRoundFourFtM.forEach(formatTableCellFromObjRoundFourFtM)
  }


  allQuestionHTMLFtm += "</table>"

    allQuestionHTMLFtm += "<button class='trans-planner-label transmasc-color' id='nextFtMQuestion' onClick=nextFtMButton(" + iterator + ")>Next</button>"
    allQuestionHTMLFtm += "<button class='trans-planner-label transmasc-color' id='closeFtM' onClick='ftmModal.style.display = \"none\";'>Close</button>"
  

  // else if (iterator == 3) {
  //   <button id="generateFtM">Generate New FtM Plan</button>
  // }


  div.innerHTML = allQuestionHTMLFtm;

  

}


// Get the modal
var ftmModal = document.getElementById("ftmModal");
var mtfDiv = document.getElementById("mtfDiv");

// Get the button that opens the modal
var ftmbtn = document.getElementById("newFtMModalButton");

// When the user clicks on the button, open the modal
ftmbtn.onclick = function() {
  initFtMModal();
  formatTableQuestionsFtM(0);
  ftmModal.style.display = "block";
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == ftmModal) {
    ftmModal.style.display = "none";
  }
}