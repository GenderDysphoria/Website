


    var spermCryoLabel = "Sperm Cryopreservation";
    var hormonesLabel = "Start Hormone Therapy";
    var lasersLabel = "Laser Hair Removal";

    var hairTransplantLabel = "Hair Transplant";
    var ffsLabel = "Facial Feminization";
    var topSurgery = "Top Surgery";
    var bottomSurgery = "Bottom Surgery";
    var orchiectomySurgery = "Orchiectomy Surgery";
    var trachealShave = "Tracheal Shave Surgery";
    var counseling = "Counseling Sessions";
    var comeOut = "Come Out Publicly";
    var legalNameChange = "Legal Name Change";
    var socialTransition = "Social Transition";
    var speechTherapySession = "Speech Therapy Sessions";

    var hairLossStartLabel = "Start Finasteride/Minoxidil";
    var hairLossEffect = "Finasteride/Minoxidil Effect";




    //Medical effects

    var bodyFatRedistribution = "Body Fat Redistribution";
    var decreasedMuscleMass = "Decreased Muscle Mass";
    var skinSoften = "Skin Softening";
    var breastGrowth = "Breast Growth";
    var smallerTestes = "Smaller Testes";
    var decreasedLibido = "Decreased Libido";
    var decreasedErections = "Decreased Erections";
    var moodChanges = "Mood Changes";
    var baldnessStops = "Baldness Loss Stops";
    var thinningBodyHair = "Thinning Body Hair";
    var maleSexDysfunction = "Orgasm Difficulty";
    var decreasedSperm = "Lower sperm production";

var taskNamesInOriginalOrderMtF = [ comeOut, 
    spermCryoLabel, 
    hormonesLabel, 
    hairLossStartLabel,
    lasersLabel, 
    counseling, 
    speechTherapySession, 
    socialTransition, 
    legalNameChange,  
    hairTransplantLabel, 
    ffsLabel, 
    trachealShave, 
    topSurgery, 
    orchiectomySurgery, 
    bottomSurgery, 
    bodyFatRedistribution, decreasedMuscleMass, skinSoften, breastGrowth, smallerTestes, decreasedErections, 
    decreasedLibido, moodChanges, baldnessStops, thinningBodyHair, maleSexDysfunction, decreasedSperm,
    hairLossEffect  
];

function generateAndRenderMtFPlan(
    MtFPlanObject
    ) {
ganttChartJSON = GenerateMtFTransitionPlannerJSON(
    MtFPlanObject
    );
renderGanttChart( );
document.getElementById('editAndDownload').style.display = "block";
document.getElementById('zoomControl').style.display = "block";
}




function GenerateMtFTransitionPlannerJSON(
    MtFPlanObject
    ) {


    //Month is 0-indexed
    var spermCryoStart = MtFPlanObject.spermCryoStartDate;
    var spermCryoEnd = new Date(spermCryoStart.getTime()+(14 * msInDay));
    

    var hrtStart = MtFPlanObject.hormoneStartDate;
    var laserStart = MtFPlanObject.laserStartDate;
    
    var comeOutStart = MtFPlanObject.comeOutDate;
    var comeOutEnd = new Date(MtFPlanObject.comeOutDate.getTime()+(2 * msInDay));

    var socialTransitionStart = MtFPlanObject.socialTransitionStartDate
    var socialTransitionEnd = new Date(MtFPlanObject.socialTransitionStartDate.getTime()+(720 * msInDay));


    var hrtEnd = new Date(hrtStart.getTime()+(1 * msInDay));
    var hairTransplantStart = MtFPlanObject.hairTransplantDate
    var hairTransplantEnd = new Date(MtFPlanObject.hairTransplantDate.getTime()+(1 * msInDay));

    var ffsStart = MtFPlanObject.ffsStartDate
    var ffsEnd = new Date(ffsStart.getTime()+(1 * msInDay));

    var topStart = MtFPlanObject.topSurgeryStartDate;
    var topEnd = new Date(MtFPlanObject.topSurgeryStartDate.getTime()+(1 * msInDay));

    var bottomStart = MtFPlanObject.bottomSurgeryStartDate;
    var bottomEnd = new Date(bottomStart.getTime()+(1 * msInDay));

    var orchiectomyStart = MtFPlanObject.orchiectomyDate;
    var orchiectomyEnd = new Date(orchiectomyStart.getTime()+(1 * msInDay));

    var trachealStart = MtFPlanObject.trachealShaveDate;
    var trachealEnd = new Date(trachealStart.getTime()+(1 * msInDay));


    var nameChangeStart = MtFPlanObject.nameChangeDate
    var nameChangeEnd = new Date(MtFPlanObject.nameChangeDate.getTime()+(90 * msInDay));


    var chartEnd = new Date(hrtStart.getTime()+(1200 * msInDay));

    var bodyFatRedistributionStart = new Date(hrtStart.getTime()+(90 * msInDay));
    var bodyFatRedistributionMaxEffect = new Date(hrtStart.getTime()+(720 * msInDay));

    var decreasedMuscleMassStart  = new Date(hrtStart.getTime()+(90 * msInDay));
    var decreasedMuscleMassMaxEffect = new Date(hrtStart.getTime()+(360 * msInDay));

    var skinSoftenStart  = new Date(hrtStart.getTime()+(90 * msInDay));


    var decreasedLibidoStart  = new Date(hrtStart.getTime()+(30 * msInDay));
    var decreasedLibidoMaxEffect = new Date(hrtStart.getTime()+(360 * msInDay));

    var decreasedErectionsStart = new Date(hrtStart.getTime()+(30 * msInDay));
    var decreasedErectionsMaxEffect = new Date(hrtStart.getTime()+(90 * msInDay));

    var breastGrowthStart  = new Date(hrtStart.getTime()+(90 * msInDay));
    var breastGrowthMaxEffect = new Date(hrtStart.getTime()+(720 * msInDay));

    var decreasedTestesStart  = new Date(hrtStart.getTime()+(90 * msInDay));
    var decreasedTestesMaxEffect = new Date(hrtStart.getTime()+(720 * msInDay));

    var thinnedthinningBodyHairStart = new Date(hrtStart.getTime()+(180 * msInDay));
    var thinnedthinningBodyHairMaxEffect = new Date(hrtStart.getTime()+(1080 * msInDay));

    var maleBaldnessStart = new Date(hrtStart.getTime()+(30 * msInDay));
    var maleBaldnessMaxEffect = new Date(hrtStart.getTime()+(360 * msInDay));

    var moodChangesStart = new Date(hrtStart.getTime()+(30 * msInDay));
    var moodChangesMaxEffect = new Date(hrtStart.getTime()+(360 * msInDay));

    var hairLossProductStart = MtFPlanObject.hairLossDate;
        var hairLossProductEnd = new Date(hairLossProductStart.getTime()+(1 * msInDay));

        var hairLossEffectStart = new Date(hairLossProductStart.getTime()+(90 * msInDay));
        var hairLossMaxEffect = new Date(hairLossProductStart.getTime()+(180 * msInDay));


    var tasks = [];

    //Remove any tasks that have the status of "won't do"


    var taskNamesToUse = [];

    if (MtFPlanObject.comeOutStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(comeOut);
        tasks.push(
            {"startDate": comeOutStart,"endDate":comeOutEnd,"taskName":comeOut,"status":MtFPlanObject.comeOutStatus},
        
        );
    }
    if (MtFPlanObject.spermCryoStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(spermCryoLabel);
        tasks.push(
            {"startDate": spermCryoStart,"endDate": spermCryoEnd,"taskName": spermCryoLabel,"status":MtFPlanObject.spermCryoStatus},
        
        );
    }
    if (MtFPlanObject.hormoneStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(hormonesLabel);
        tasks.push(
            {"startDate": hrtStart,"endDate":hrtEnd,"taskName":hormonesLabel,"status":MtFPlanObject.hormoneStatus},
       
        );
    }
    if (MtFPlanObject.hairLossStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(hairLossStartLabel);
    }
    
    if (MtFPlanObject.laserStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(lasersLabel);
            var lasersAptStart = [];
            var lasersAptEnd = [];
            for(var i = 0; i < MtFPlanObject.numberLaserAppointments; i++) {
                
                var daysBetweenApts = 30;
                lasersAptStart[i]  = new Date(laserStart.getTime()+(daysBetweenApts * i * msInDay));
                if (i > 6) {
                    daysBetweenApts = 42;
                    lasersAptStart[i] = new Date(lasersAptStart[i-1].getTime()+(daysBetweenApts * msInDay));
                }
                if (i > 12) {
                    daysBetweenApts = 180;
                    lasersAptStart[i] = new Date(lasersAptStart[i-1].getTime()+(daysBetweenApts * msInDay));
                }

                
                lasersAptEnd[i] = new Date(lasersAptStart[i].getTime()+(1 * msInDay));
                tasks.push({"startDate": lasersAptStart[i],"endDate":  lasersAptEnd[i],"taskName": lasersLabel,"status":MtFPlanObject.laserStatus},)
            }
    }
    
    if (MtFPlanObject.counselingStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(counseling);
        var counselingStarts = MtFPlanObject.counselingStartDate;
        var counselingAptsStart = [];
        var counselingAptsEnd = [];
        for(var i = 0; i < MtFPlanObject.counselingNumberSessions; i++) {
            
            var daysBetweenApts = MtFPlanObject.counselingDaysBetween;

            counselingAptsStart[i] = new Date(counselingStarts.getTime()+(daysBetweenApts * i * msInDay));
            counselingAptsEnd[i] = new Date(counselingAptsStart[i].getTime()+(1 * msInDay));
            tasks.push({"startDate": counselingAptsStart[i],"endDate":  counselingAptsEnd[i],"taskName": counseling,"status":MtFPlanObject.counselingStatus},)
        }
    }
    
    if (MtFPlanObject.speechTherapyStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(speechTherapySession);
        var speechTherapyStart = MtFPlanObject.speechTherapyStartDate;
        var speechTherapyAptsStart = [];
        var speechTherapyAptsEnd = [];
        for(var i = 0; i < MtFPlanObject.speechTherapyNumberSessions; i++) {
            
            var daysBetweenApts = MtFPlanObject.speechTherapyDaysBetween;
    
            speechTherapyAptsStart[i] = new Date(speechTherapyStart.getTime()+(daysBetweenApts * i * msInDay));
            speechTherapyAptsEnd[i] = new Date(speechTherapyAptsStart[i].getTime()+(1 * msInDay));
            tasks.push({"startDate": speechTherapyAptsStart[i],"endDate":  speechTherapyAptsEnd[i],"taskName": speechTherapySession,"status":MtFPlanObject.speechTherapyStatus},)
        }
    }
    if (MtFPlanObject.socialTransitionStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(socialTransition);
        tasks.push(
            {"startDate": socialTransitionStart,"endDate":socialTransitionEnd,"taskName":socialTransition,"status":MtFPlanObject.socialTransitionStatus},
       
        );
    }
    if (MtFPlanObject.nameChangeStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(legalNameChange);
        tasks.push(
            {"startDate": nameChangeStart,"endDate":nameChangeEnd,"taskName":legalNameChange,"status":MtFPlanObject.nameChangeStatus},
       
        );
    }
    if (MtFPlanObject.hairTransplantStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(hairTransplantLabel);
        tasks.push(
            {"startDate": hairTransplantStart,"endDate": hairTransplantEnd,"taskName": hairTransplantLabel,"status":MtFPlanObject.hairTransplantStatus},
        
        );
    }
    if (MtFPlanObject.ffsStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(ffsLabel);
        tasks.push(
            {"startDate": ffsStart,"endDate": ffsEnd,"taskName": ffsLabel,"status":MtFPlanObject.ffsStatus},
       
        );
    }
    if (MtFPlanObject.trachealShaveStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(trachealShave);
        tasks.push(
            {"startDate": trachealStart,"endDate": trachealEnd,"taskName": trachealShave,"status":MtFPlanObject.trachealShaveStatus},
       
        );
    }
    if (MtFPlanObject.topStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(topSurgery);
        tasks.push(
            {"startDate": topStart,"endDate": topEnd,"taskName": topSurgery,"status":MtFPlanObject.topStatus},
       
        );
    }
    if (MtFPlanObject.orchiectomyStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(orchiectomySurgery);
        tasks.push(
            {"startDate": orchiectomyStart,"endDate": orchiectomyEnd,"taskName": orchiectomySurgery,"status":MtFPlanObject.orchiectomyStatus},
       
        );
    }
    if (MtFPlanObject.bottomStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(bottomSurgery);
        tasks.push(
            {"startDate": bottomStart,"endDate": bottomEnd,"taskName": bottomSurgery,"status":MtFPlanObject.bottomStatus},
      
        );
    }
    
        //Remove all the onset/BEFORE/MAX effect tasks if hormones aren't selected

    if (MtFPlanObject.hormoneStatus != "WILL-NOT-DO"){
        taskNamesToUse.push(bodyFatRedistribution);
        taskNamesToUse.push(decreasedMuscleMass);
        taskNamesToUse.push(skinSoften);
        taskNamesToUse.push(breastGrowth);
        taskNamesToUse.push(smallerTestes);
        taskNamesToUse.push(decreasedErections);
        taskNamesToUse.push(decreasedLibido);
        taskNamesToUse.push(moodChanges);
        taskNamesToUse.push(baldnessStops);
        taskNamesToUse.push(thinningBodyHair);
        taskNamesToUse.push(maleSexDysfunction);
        taskNamesToUse.push(decreasedSperm);
        tasks.push(
            {"startDate": hrtStart,"endDate": bodyFatRedistributionStart,"taskName": bodyFatRedistribution,"status":"BEFORE"},
            {"startDate": bodyFatRedistributionStart,"endDate": bodyFatRedistributionMaxEffect,"taskName": bodyFatRedistribution,"status":"ONSET"},
            {"startDate": bodyFatRedistributionMaxEffect,"endDate": chartEnd,"taskName": bodyFatRedistribution,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": decreasedMuscleMassStart,"taskName": decreasedMuscleMass,"status":"BEFORE"},
            {"startDate": decreasedMuscleMassStart,"endDate": decreasedMuscleMassMaxEffect,"taskName": decreasedMuscleMass,"status":"ONSET"},
            {"startDate": decreasedMuscleMassMaxEffect,"endDate": chartEnd,"taskName": decreasedMuscleMass,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": skinSoftenStart,"taskName": skinSoften,"status":"BEFORE"},
            {"startDate": skinSoftenStart,"endDate": chartEnd,"taskName": skinSoften,"status":"ONSET"},
            {"startDate": hrtStart,"endDate": decreasedLibidoStart,"taskName": decreasedLibido,"status":"BEFORE"},
            {"startDate": decreasedLibidoStart,"endDate": decreasedLibidoMaxEffect,"taskName": decreasedLibido,"status":"ONSET"},
            {"startDate": decreasedLibidoMaxEffect,"endDate": chartEnd,"taskName": decreasedLibido,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": decreasedTestesStart,"taskName": smallerTestes,"status":"BEFORE"},
            {"startDate": decreasedTestesStart,"endDate": decreasedTestesMaxEffect,"taskName": smallerTestes,"status":"ONSET"},
            {"startDate": decreasedTestesMaxEffect,"endDate": chartEnd,"taskName": smallerTestes,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": decreasedLibidoStart,"taskName": decreasedLibido,"status":"BEFORE"},
            {"startDate": decreasedLibidoStart,"endDate": decreasedLibidoMaxEffect,"taskName": decreasedLibido,"status":"ONSET"},
            {"startDate": decreasedLibidoMaxEffect,"endDate": chartEnd,"taskName": decreasedLibido,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": breastGrowthStart,"taskName": breastGrowth,"status":"BEFORE"},
            {"startDate": breastGrowthStart,"endDate": breastGrowthMaxEffect,"taskName": breastGrowth,"status":"ONSET"},
            {"startDate": breastGrowthMaxEffect,"endDate": chartEnd,"taskName": breastGrowth,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": decreasedErectionsStart,"taskName": decreasedErections,"status":"BEFORE"},
            {"startDate": decreasedErectionsStart,"endDate": decreasedErectionsMaxEffect,"taskName": decreasedErections,"status":"ONSET"},
            {"startDate": decreasedErectionsMaxEffect,"endDate": chartEnd,"taskName": decreasedErections,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": thinnedthinningBodyHairStart,"taskName": thinningBodyHair,"status":"BEFORE"},
            {"startDate": thinnedthinningBodyHairStart,"endDate": thinnedthinningBodyHairMaxEffect,"taskName": thinningBodyHair,"status":"ONSET"},
            {"startDate": thinnedthinningBodyHairMaxEffect,"endDate": chartEnd,"taskName": thinningBodyHair,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": maleBaldnessStart,"taskName": baldnessStops,"status":"BEFORE"},
            {"startDate": maleBaldnessStart,"endDate": maleBaldnessMaxEffect,"taskName": baldnessStops,"status":"ONSET"},
            {"startDate": maleBaldnessMaxEffect,"endDate": chartEnd,"taskName": baldnessStops,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": moodChangesStart,"taskName": moodChanges,"status":"BEFORE"},
            {"startDate": moodChangesStart,"endDate": moodChangesMaxEffect,"taskName": moodChanges,"status":"ONSET"},
            {"startDate": moodChangesMaxEffect,"endDate": chartEnd,"taskName": moodChanges,"status":"MAX-EFFECT"},
            {"startDate": hrtStart,"endDate": chartEnd,"taskName": maleSexDysfunction,"status":"VARIABLE"},
            {"startDate": hrtStart,"endDate": chartEnd,"taskName": decreasedSperm,"status":"VARIABLE"},
      
        );
    }

    if (MtFPlanObject.hairLossStatus != "WILL-NOT-DO"){

        taskNamesToUse.push(hairLossEffect);
        tasks.push(
            {"startDate": hairLossProductStart,"endDate": hairLossProductEnd,"taskName": hairLossStartLabel,"status":MtFPlanObject.hairLossStatus},
            {"startDate": hairLossProductStart,"endDate": hairLossEffectStart,"taskName": hairLossEffect,"status":"BEFORE"},
            {"startDate": hairLossEffectStart,"endDate": hairLossMaxEffect,"taskName": hairLossEffect,"status":"ONSET"},
            {"startDate": hairLossMaxEffect,"endDate": chartEnd,"taskName": hairLossEffect,"status":"MAX-EFFECT"},
            
        );
    }

    var taskStatus = {
        "NEEDS-SCHEDULING" : "bar-needs-scheduling",
        "SCHEDULED" : "bar-scheduled",
        "IN-PROGRESS" : "bar-in-progress",
        "BEFORE" : "bar-before-mtf",
        "ONSET": "bar-onset-mtf",
        "MAX-EFFECT" : "bar-max-effect-mtf",
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
        tasks, taskNames, taskStatus, minDate, maxDate, jsonVersion, MtFPlanObject
    }

    return completedGanttChart;

};