function FtMPlanObject(    
    hormoneStartDate, hormoneStatus,
    comeOutDate, comeOutStatus,
    socialTransitionStartDate, socialTransitionStatus,
    topSurgeryStartDate, topStatus,
    bottomSurgeryStartDate, bottomStatus,
    nameChangeDate, nameChangeStatus,
    counselingStartDate,
    counselingDaysBetween,
    counselingNumberSessions, counselingStatus,
    ) {
        this.hormoneStartDate=  hormoneStartDate ; 
        this.hormoneStatus=   hormoneStatus;
    
        this.comeOutDate=  comeOutDate ; 
        this.comeOutStatus=  comeOutStatus ;
        this.socialTransitionStartDate=  socialTransitionStartDate ; 
        this.socialTransitionStatus=  socialTransitionStatus ;
        this.topSurgeryStartDate=  topSurgeryStartDate ; 
        this.topStatus=  topStatus ;
        this.bottomSurgeryStartDate=  bottomSurgeryStartDate ; 
        this.bottomStatus= bottomStatus  ;
        this.nameChangeDate= nameChangeDate  ; 
        this.nameChangeStatus= nameChangeStatus  ;
        this.counselingStartDate=  counselingStartDate ;
        this.counselingDaysBetween= counselingDaysBetween  ;
        this.counselingNumberSessions=  counselingNumberSessions ; 
        this.counselingStatus=  counselingStatus ;
    }

    //Define some manual table elements to collect
//Are you planning to:
var questionsRoundOneFtM = 
[ 
  "Take Masculine hormones (Testosterone)?",
  "Come out publicly as male?",
  "Socially transition to male?",
  "Seek Top (aka Breast) Surgery?",
  "Seek Bottom (aka Phalloplasty) Surgery?",
  "Legally Change Your Name?",
  "Get Mental Health Counseling? (My biased opinion) you really should.",
 ]

 function getAnswersRoundOneFtM() {
    if (ganttChartJSON != null) {
        return [
            ganttChartJSON.FtMPlanObject.hormoneStatus,
            ganttChartJSON.FtMPlanObject.comeOutStatus,
            ganttChartJSON.FtMPlanObject.socialTransitionStatus,
            ganttChartJSON.FtMPlanObject.topStatus,
            ganttChartJSON.FtMPlanObject.bottomStatus,
            ganttChartJSON.FtMPlanObject.nameChangeStatus,
            ganttChartJSON.FtMPlanObject.counselingStatus,
        ]
    }
    else return [
    "NEEDS-SCHEDULING",
    "NEEDS-SCHEDULING",
    "NEEDS-SCHEDULING",
    "NEEDS-SCHEDULING",
    "NEEDS-SCHEDULING",
    "NEEDS-SCHEDULING",
    "NEEDS-SCHEDULING",
 ];
}

 //When will you:
 var questionsRoundTwoFtM = [
   "Start HRT?",
   "Come out publicly?",
   "Start Social Transition?",
   "Schedule Top Surgery?",
   "Schedule Bottom Surgery?  Typically this requires a year or two of social transition + counseling.",
   "Start the Legal Name Change?",
   "Start Counseling?",
 ]


 function getAnswersRoundTwoFtM() {
    if (ganttChartJSON != null) {
        return [
            new Date(ganttChartJSON.FtMPlanObject.hormoneStartDate),
            new Date(ganttChartJSON.FtMPlanObject.comeOutDate),
            new Date(ganttChartJSON.FtMPlanObject.socialTransitionStartDate),
            new Date(ganttChartJSON.FtMPlanObject.topSurgeryStartDate),
            new Date(ganttChartJSON.FtMPlanObject.bottomSurgeryStartDate),
            new Date(ganttChartJSON.FtMPlanObject.nameChangeDate),
            new Date(ganttChartJSON.FtMPlanObject.counselingStartDate)
        ]
    }
    else {
        var today = new Date();

        return [
        new Date(today.getTime()+(14 * msInDay)),
        new Date(today.getTime()+(14 * msInDay)),
        new Date(today.getTime()+(14 * msInDay)),
        new Date(today.getTime()+(365 * msInDay)),
        new Date(today.getTime()+(700 * msInDay)),
        new Date(today.getTime()+(500 * msInDay)),
        new Date(today.getTime()+(1 * msInDay))
        ]
    }
}
 //How many:

 var questionsRoundThreeFtM = [
  "Counseling Sessions are you planning? If you don't know just leave this at 80."
 ]


 function getAnswersRoundThreeFtM() {
    if (ganttChartJSON != null) {
        return [
            ganttChartJSON.FtMPlanObject.counselingNumberSessions
       ];
    }
    else {
        return [
            80
         ]
    }
 }

//How frequently:

var questionsRoundFourFtM = [
  "Counseling Sessions?"
]

function getAnswersRoundFourFtM() {
    if (ganttChartJSON != null) {
        return [
            ganttChartJSON.FtMPlanObject.counselingDaysBetween,
        ];
    }
    else {
        return [
            14
          ]
    }
}

