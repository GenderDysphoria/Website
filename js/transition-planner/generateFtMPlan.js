


    var hormonesLabel = "Start Hormone Therapy";
    var topSurgery = "Top Surgery";
    var bottomSurgery = "Bottom Surgery";
    var counseling = "Counseling Sessions";
    var comeOut = "Come Out Publicly";
    var legalNameChange = "Legal Name Change";
    var socialTransition = "Social Transition";

    //Medical effects

    var bodyFat = "Body Fat Redistribution";
    var muscleMass = "Increased Muscle Mass";
    var skinOiliness = "Skin Oiliness/Acne";
    var clitoralEnlargement = "Clitoral Enlargement";
    var mensesStop = "Cessation of Menses";
    var deepenedVoice = "Deepened Voice";
    var baldness = "Scalp Hair Loss";
    var bodyHair = "Facial/Body Hair";
    var vaginalAtrophy = "Vaginal Atrophy";

var taskNamesInOriginalOrderFtM = [ comeOut, 
    hormonesLabel, 
    counseling, 
    socialTransition, 
    legalNameChange,  
    topSurgery, 
    bottomSurgery, 
    bodyFat, muscleMass, skinOiliness, clitoralEnlargement, mensesStop, 
    deepenedVoice, baldness, bodyHair, vaginalAtrophy
];

function generateAndRenderFtMPlan(
    FtMPlanObject
    ) {
ganttChartJSON = GenerateFtMTransitionPlannerJSON(
    FtMPlanObject
    );
renderGanttChart( );
document.getElementById('editAndDownload').style.display = "block";
document.getElementById('zoomControl').style.display = "block";
}




function GenerateFtMTransitionPlannerJSON(
    FtMPlanObject
    ) {


    //Month is 0-indexed

    var hrtStart = FtMPlanObject.hormoneStartDate;
    
    var comeOutStart = FtMPlanObject.comeOutDate;
    var comeOutEnd = new Date(FtMPlanObject.comeOutDate.getTime()+(2 * msInDay));

    var socialTransitionStart = FtMPlanObject.socialTransitionStartDate
    var socialTransitionEnd = new Date(FtMPlanObject.socialTransitionStartDate.getTime()+(720 * msInDay));


    var hrtEnd = new Date(hrtStart.getTime()+(1 * msInDay));

    var topStart = FtMPlanObject.topSurgeryStartDate;
    var topEnd = new Date(FtMPlanObject.topSurgeryStartDate.getTime()+(1 * msInDay));

    var bottomStart = FtMPlanObject.bottomSurgeryStartDate;
    var bottomEnd = new Date(bottomStart.getTime()+(1 * msInDay));

    var nameChangeStart = FtMPlanObject.nameChangeDate
    var nameChangeEnd = new Date(FtMPlanObject.nameChangeDate.getTime()+(90 * msInDay));


    var chartEnd = new Date(hrtStart.getTime()+(1200 * msInDay));

    var bodyFatStart = new Date(hrtStart.getTime()+(90 * msInDay));
    var bodyFatMaxEffect = new Date(hrtStart.getTime()+(720 * msInDay));

    var muscleMassStart  = new Date(hrtStart.getTime()+(180 * msInDay));
    var muscleMassMaxEffect = new Date(hrtStart.getTime()+(720 * msInDay));

    var skinOilinessStart  = new Date(hrtStart.getTime()+(30 * msInDay));
    var skinOilinessMaxEffect  = new Date(hrtStart.getTime()+(360 * msInDay));

    var clitoralEnlargementStart  = new Date(hrtStart.getTime()+(90 * msInDay));
    var clitoralEnlargementMaxEffect = new Date(hrtStart.getTime()+(360 * msInDay));

    var mensesStopDate  = new Date(hrtStart.getTime()+(60 * msInDay));

    var bodyHairStart = new Date(hrtStart.getTime()+(90 * msInDay));
    var bodyHairMaxEffect = new Date(hrtStart.getTime()+(1080 * msInDay));

    var deepenedVoiceStart = new Date(hrtStart.getTime()+(90 * msInDay));
    var deepenedVoiceMaxEffect = new Date(hrtStart.getTime()+(360 * msInDay));

    var baldnessStart = new Date(hrtStart.getTime()+(361 * msInDay));
    var baldnessEnd = new Date(hrtStart.getTime()+(362 * msInDay));

    var vaginalAtrophyStart = new Date(hrtStart.getTime()+(90 * msInDay));
    var vaginalAtrophyMaxEffect = new Date(hrtStart.getTime()+(360 * msInDay));

    var tasks = [];

    //Remove any tasks that have the status of "won't do"


    var taskNamesToUse = [];

    if (FtMPlanObject.comeOutStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(comeOut);
        tasks.push(
            {"startDate": comeOutStart,"endDate":comeOutEnd,"taskName":comeOut,"status":FtMPlanObject.comeOutStatus},
        
        );
    }
    if (FtMPlanObject.hormoneStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(hormonesLabel);
        tasks.push(
            {"startDate": hrtStart,"endDate":hrtEnd,"taskName":hormonesLabel,"status":FtMPlanObject.hormoneStatus},
       
        );
    }
    
    if (FtMPlanObject.counselingStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(counseling);
        var counselingStarts = FtMPlanObject.counselingStartDate;
        var counselingAptsStart = [];
        var counselingAptsEnd = [];
        for(var i = 0; i < FtMPlanObject.counselingNumberSessions; i++) {
            
            var daysBetweenApts = FtMPlanObject.counselingDaysBetween;

            counselingAptsStart[i] = new Date(counselingStarts.getTime()+(daysBetweenApts * i * msInDay));
            counselingAptsEnd[i] = new Date(counselingAptsStart[i].getTime()+(1 * msInDay));
            tasks.push({"startDate": counselingAptsStart[i],"endDate":  counselingAptsEnd[i],"taskName": counseling,"status":FtMPlanObject.counselingStatus},)
        }
    }
    
    if (FtMPlanObject.socialTransitionStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(socialTransition);
        tasks.push(
            {"startDate": socialTransitionStart,"endDate":socialTransitionEnd,"taskName":socialTransition,"status":FtMPlanObject.socialTransitionStatus},
       
        );
    }
    if (FtMPlanObject.nameChangeStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(legalNameChange);
        tasks.push(
            {"startDate": nameChangeStart,"endDate":nameChangeEnd,"taskName":legalNameChange,"status":FtMPlanObject.nameChangeStatus},
       
        );
    }
    if (FtMPlanObject.topStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(topSurgery);
        tasks.push(
            {"startDate": topStart,"endDate": topEnd,"taskName": topSurgery,"status":FtMPlanObject.topStatus},
       
        );
    }
    if (FtMPlanObject.bottomStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(bottomSurgery);
        tasks.push(
            {"startDate": bottomStart,"endDate": bottomEnd,"taskName": bottomSurgery,"status":FtMPlanObject.bottomStatus},
      
        );
    }
    
        //Remove all the onset/BEFORE/MAX effect tasks if hormones aren't selected

    if (FtMPlanObject.hormoneStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(bodyFat);
        taskNamesToUse.push(muscleMass);
        taskNamesToUse.push(skinOiliness);
        taskNamesToUse.push(clitoralEnlargement);
        taskNamesToUse.push(mensesStop);
        taskNamesToUse.push(deepenedVoice);
        taskNamesToUse.push(baldness);
        taskNamesToUse.push(bodyHair);
        taskNamesToUse.push(vaginalAtrophy);
        tasks.push(
            {"startDate": hrtStart,"endDate": bodyFatStart,"taskName": bodyFat,"status":"BEFORE"},
            {"startDate": bodyFatStart,"endDate": bodyFatMaxEffect,"taskName": bodyFat,"status":"ONSET"},
            {"startDate": bodyFatMaxEffect,"endDate": chartEnd,"taskName": bodyFat,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": muscleMassStart,"taskName": muscleMass,"status":"BEFORE"},
            {"startDate": muscleMassStart,"endDate": muscleMassMaxEffect,"taskName": muscleMass,"status":"ONSET"},
            {"startDate": muscleMassMaxEffect,"endDate": chartEnd,"taskName": muscleMass,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": skinOilinessStart,"taskName": skinOiliness,"status":"BEFORE"},
            {"startDate": skinOilinessStart,"endDate": skinOilinessMaxEffect,"taskName": skinOiliness,"status":"ONSET"},
            {"startDate": skinOilinessMaxEffect,"endDate": chartEnd,"taskName": skinOiliness,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": clitoralEnlargementStart,"taskName": clitoralEnlargement,"status":"BEFORE"},
            {"startDate": clitoralEnlargementStart,"endDate": clitoralEnlargementMaxEffect,"taskName": clitoralEnlargement,"status":"ONSET"},
            {"startDate": clitoralEnlargementMaxEffect,"endDate": chartEnd,"taskName": clitoralEnlargement,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": mensesStopDate,"taskName": mensesStop,"status":"BEFORE"},
            {"startDate": mensesStopDate,"endDate": chartEnd,"taskName": mensesStop,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": deepenedVoiceStart,"taskName": deepenedVoice,"status":"BEFORE"},
            {"startDate": deepenedVoiceStart,"endDate": deepenedVoiceMaxEffect,"taskName": deepenedVoice,"status":"ONSET"},
            {"startDate": deepenedVoiceMaxEffect,"endDate": chartEnd,"taskName": deepenedVoice,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": baldnessStart,"taskName": baldness,"status":"BEFORE"},
            {"startDate": baldnessStart,"endDate": chartEnd,"taskName": baldness,"status":"VARIABLE"},
            {"startDate": hrtStart,"endDate": bodyHairStart,"taskName": bodyHair,"status":"BEFORE"},
            {"startDate": bodyHairStart,"endDate": bodyHairMaxEffect,"taskName": bodyHair,"status":"ONSET"},
            {"startDate": bodyHairMaxEffect,"endDate": chartEnd,"taskName": bodyHair,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": vaginalAtrophyStart,"taskName": vaginalAtrophy,"status":"BEFORE"},
            {"startDate": vaginalAtrophyStart,"endDate": vaginalAtrophyMaxEffect,"taskName": vaginalAtrophy,"status":"ONSET"},
            {"startDate": vaginalAtrophyMaxEffect,"endDate": chartEnd,"taskName": vaginalAtrophy,"status":"MAX-EFFECT"},
        );
    }
        

    var taskStatus = {
        "NEEDS-SCHEDULING" : "bar-needs-scheduling",
        "SCHEDULED" : "bar-scheduled",
        "IN-PROGRESS" : "bar-in-progress",
        "BEFORE" : "bar-before-ftm",
        "ONSET": "bar-onset-ftm",
        "MAX-EFFECT" : "bar-max-effect-ftm",
        "TBD" : "bar-tbd",
        "VARIABLE" : "bar-variable",
        "DONE" : "bar-done"
    };

    var taskNames = taskNamesToUse;

    tasks.sort(function(a, b) {
        return a.endDate - b.endDate;
    });
    var maxDate = tasks[tasks.length - 1].endDate;
    tasks.sort(function(a, b) {
        return a.startDate - b.startDate;
    });
    var minDate = tasks[0].startDate;
    
    var jsonVersion = '1.0.1';

    var completedGanttChart = {
        tasks, taskNames, taskStatus, minDate, maxDate, jsonVersion, FtMPlanObject
    }

    return completedGanttChart;

};