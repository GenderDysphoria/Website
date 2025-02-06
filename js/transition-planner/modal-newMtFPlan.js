




var allQuestionHTMLMtF = "";

var roundOneResponsesMtF = [];
var roundTwoResponsesMtF = [];
var roundThreeResponsesMtF = [];
var roundFourResponsesMtF = [];

var answersRoundOneMtF = [];
var answersRoundTwoMtF = [];
var answersRoundThreeMtF = [];
var answersRoundFourMtF = [];

function initMtFModal() {
   answersRoundOneMtF = getAnswersRoundOneMtF();
   answersRoundTwoMtF = getAnswersRoundTwoMtF();
   answersRoundThreeMtF = getAnswersRoundThreeMtF();
   answersRoundFourMtF = getAnswersRoundFourMtF();
}


function parseMtFQuestionTableToJSON(iterator) {

  var tableLength = document.getElementById("mtfQuestionTable").rows.length;
  for(var taskIterator = 0; taskIterator < tableLength - 1; taskIterator++) {
      if (iterator == 0) {
        var statusSelect = document.getElementById("question-round-one-status-select-" + taskIterator)
        roundOneResponsesMtF.push(statusSelect.options[statusSelect.selectedIndex].value);
      }
      else if (iterator == 1) {
        var newDate = new Date(document.getElementById("mtf-plan-start-date-" + taskIterator).value);
        roundTwoResponsesMtF.push(newDate);
      }
      else if (iterator == 2) {
        var number = document.getElementById("mtf-plan-number-" + taskIterator).value;
        roundThreeResponsesMtF.push(number)
      }
      else if (iterator == 3) {
        var number = document.getElementById("mtf-plan-freq-" + taskIterator).value;
        roundFourResponsesMtF.push(number)
      }

  }
}


function formatTableCellFromObjRoundOneMtF(question, index, arr) {


  var answer = answersRoundOneMtF[index];

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
  allQuestionHTMLMtF += tableRow;
}

function formatTableCellFromObjRoundTwoMtF(question,index,arr) {
  var answer = answersRoundTwoMtF[index];
  var disabledText = "";
  if (roundOneResponsesMtF[index] === "WILL-NOT-DO") {
    disabledText = " disabled";
  }
  var tableRow = "<tr>" + 
  "<td>" + question + "</td>" +
  "<td><input type='date' id='mtf-plan-start-date-" + index + "' value='" + answer.toISOString().split('T')[0] + "'" + disabledText + "></input></td>"
  allQuestionHTMLMtF += tableRow;
}

function formatTableCellFromObjRoundThreeMtF(question,index,arr) {
  var answer = answersRoundThreeMtF[index];
  var disabledText = "";

  //Mapping from earlier questions
  var roundOneQuestionIndex = [9, 10, 11, 12, 13]

  if (roundOneResponsesMtF[roundOneQuestionIndex[index]] === "WILL-NOT-DO") {
    disabledText = " disabled";
  }
  var tableRow = "<tr>" + 
  "<td>" + question + "</td>" +
  "<td><input type='number' id='mtf-plan-number-" + index + "' value='" + answer + "'" + disabledText + "></input></td>"
  allQuestionHTMLMtF += tableRow;
}

function formatTableCellFromObjRoundFourMtF(question,index,arr) {
  var answer = answersRoundFourMtF[index];
  var disabledText = "";

  //Mapping from earlier questions
  var roundOneQuestionIndex = [10, 11]

  if (roundOneResponsesMtF[roundOneQuestionIndex[index]] === "WILL-NOT-DO") {
    disabledText = " disabled";
  }
  var tableRow = "<tr>" + 
  "<td>" + question + "</td>" +
  "<td><input type='number' id='mtf-plan-freq-" + index + "' value='" + answer + "'" + disabledText + "></input></td>"
  allQuestionHTMLMtF += tableRow;
}

function nextMtFButton(iterator) {
  parseMtFQuestionTableToJSON(iterator);
  iterator += 1;

  if (iterator == 4) {
    //Use all the responses, there will be a lot of them
    thisMtFPlan = new MtFPlanObject(
      roundTwoResponsesMtF[0], roundOneResponsesMtF[0],
      roundTwoResponsesMtF[1], roundOneResponsesMtF[1],
      roundTwoResponsesMtF[2], roundOneResponsesMtF[2],
      roundTwoResponsesMtF[3], roundOneResponsesMtF[3],
      roundTwoResponsesMtF[4], roundOneResponsesMtF[4],
      roundTwoResponsesMtF[5], roundOneResponsesMtF[5],
      roundTwoResponsesMtF[6], roundOneResponsesMtF[6],
      roundTwoResponsesMtF[7], roundOneResponsesMtF[7],
      roundTwoResponsesMtF[8], roundOneResponsesMtF[8],
      roundTwoResponsesMtF[9], 
      roundThreeResponsesMtF[0], roundOneResponsesMtF[9],
    roundTwoResponsesMtF[10],
    roundFourResponsesMtF[0],
    roundThreeResponsesMtF[1], roundOneResponsesMtF[10],
    roundTwoResponsesMtF[11],
    roundThreeResponsesMtF[2],
    roundFourResponsesMtF[1], roundOneResponsesMtF[11],
      roundTwoResponsesMtF[12], roundOneResponsesMtF[12],
      roundTwoResponsesMtF[13], roundOneResponsesMtF[13],
      roundTwoResponsesMtF[14], roundOneResponsesMtF[14],
      );

      generateAndRenderMtFPlan(thisMtFPlan);
    mtfModal.style.display = "none";
    ftmDiv.style.display= "none"; //Hide the other div
    hideTopButtonsAndScrollDown();
  }

  formatTableQuestionsMtF(iterator);
}

function formatTableQuestionsMtF(iterator) {
  var div = document.getElementById('mtfQuestions');
  allQuestionHTMLMtF = '<table id="mtfQuestionTable" class="table table-striped">';
  if (iterator == 0) {
    allQuestionHTMLMtF += '<tr><th class="th-bold">Are you planning to:</th><th class="th-bold">Answer</th></tr>'
    questionsRoundOneMtF.forEach(formatTableCellFromObjRoundOneMtF)
  }
  else if (iterator == 1) {
    allQuestionHTMLMtF += '<tr><th class="th-bold">When will you:</th><th class="th-bold">Date</th></tr>'
    questionsRoundTwoMtF.forEach(formatTableCellFromObjRoundTwoMtF)
  }
  else if (iterator == 2) {
    allQuestionHTMLMtF += '<tr><th class="th-bold">How Many:</th><th class="th-bold">Date</th></tr>'
    questionsRoundThreeMtF.forEach(formatTableCellFromObjRoundThreeMtF)
  }
  else if (iterator == 3) {
    allQuestionHTMLMtF += '<tr><th class="th-bold">How Many Days Between:</th><th class="th-bold">Date</th></tr>'
    questionsRoundFourMtF.forEach(formatTableCellFromObjRoundFourMtF)
  }


  allQuestionHTMLMtF += "</table>"

    allQuestionHTMLMtF += "<button class='trans-planner-label transfem-color' id='nextMtFQuestion' onClick=nextMtFButton(" + iterator + ")>Next</button>"
    allQuestionHTMLMtF += "<button class='trans-planner-label transfem-color' id='closeMtF' onClick='mtfModal.style.display = \"none\";'>Close</button>"

  // else if (iterator == 3) {
  //   <button id="generateMtF">Generate New MtF Plan</button>
  // }


  div.innerHTML = allQuestionHTMLMtF;

  

}


// Get the modal
var mtfModal = document.getElementById("mtfModal");
var ftmDiv = document.getElementById("ftmDiv");


// Get the button that opens the modal
var mtfbtn = document.getElementById("newMtFModalButton");

// When the user clicks on the button, open the modal
mtfbtn.onclick = function() {
  initMtFModal();
  formatTableQuestionsMtF(0);
  mtfModal.style.display = "block";
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == mtfModal) {
    mtfModal.style.display = "none";
  }
}