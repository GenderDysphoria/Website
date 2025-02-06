function MtFPlanObject(    spermCryoStartDate, spermCryoStatus,
    hormoneStartDate, hormoneStatus,
    comeOutDate, comeOutStatus,
    socialTransitionStartDate, socialTransitionStatus,
    hairTransplantDate, hairTransplantStatus,
    ffsStartDate, ffsStatus,
    topSurgeryStartDate, topStatus,
    bottomSurgeryStartDate, bottomStatus,
    nameChangeDate, nameChangeStatus,
    laserStartDate, 
    numberLaserAppointments, laserStatus,
    counselingStartDate,
    counselingDaysBetween,
    counselingNumberSessions, counselingStatus,
    speechTherapyStartDate,
    speechTherapyNumberSessions,
    speechTherapyDaysBetween, speechTherapyStatus,
    orchiectomyDate, orchiectomyStatus,
    trachealShaveDate, trachealShaveStatus,
    hairLossDate, hairLossStatus,
    
    ) {
        this.spermCryoStartDate = spermCryoStartDate, 
        this.spermCryoStatus=  spermCryoStatus ;
        this.hormoneStartDate=  hormoneStartDate ; 
        this.hormoneStatus=   hormoneStatus;
    
        this.comeOutDate=  comeOutDate ; 
        this.comeOutStatus=  comeOutStatus ;
        this.socialTransitionStartDate=  socialTransitionStartDate ; 
        this.socialTransitionStatus=  socialTransitionStatus ;
        this.hairTransplantDate=  hairTransplantDate ; 
        this.hairTransplantStatus=  hairTransplantStatus ;
        this.ffsStartDate=  ffsStartDate ;
        this.ffsStatus=  ffsStatus ;
        this.topSurgeryStartDate=  topSurgeryStartDate ; 
        this.topStatus=  topStatus ;
        this.bottomSurgeryStartDate=  bottomSurgeryStartDate ; 
        this.bottomStatus= bottomStatus  ;
        this.nameChangeDate= nameChangeDate  ; 
        this.nameChangeStatus= nameChangeStatus  ;
        this.laserStartDate= laserStartDate  ; 
        this.numberLaserAppointments= numberLaserAppointments  ; 
        this.laserStatus=  laserStatus ;
        this.counselingStartDate=  counselingStartDate ;
        this.counselingDaysBetween= counselingDaysBetween  ;
        this.counselingNumberSessions=  counselingNumberSessions ; 
        this.counselingStatus=  counselingStatus ;
        this.speechTherapyStartDate=  speechTherapyStartDate ;
        this.speechTherapyNumberSessions= speechTherapyNumberSessions  ;
        this.speechTherapyDaysBetween=  speechTherapyDaysBetween ; 
        this.speechTherapyStatus=  speechTherapyStatus ;
        this.orchiectomyDate = orchiectomyDate;
        this.orchiectomyStatus = orchiectomyStatus;
        this.trachealShaveDate = trachealShaveDate;
        this.trachealShaveStatus = trachealShaveStatus;
        this.hairLossDate = hairLossDate;
        this.hairLossStatus = hairLossStatus;
    }

    //Define some manual table elements to collect
//Are you planning to:
var questionsRoundOneMtF = 
[ 
  "Freeze sperm prior to starting hormones?",
  "Take feminizing hormones (HRT)?",
  "Come out publicly as female?",
  "Socially transition to female?",
  "Seek Hair Transplant Surgery (Hair Plugs)?",
  "Seek Facial Feminization Surgery (FFS)?",
  "Seek Top (aka Breast) Surgery?",
  "Seek Bottom (aka Vaginoplasty) Surgery?",
  "Legally Change Your Name?",
  "Get Laser Hair Removal Treatment?",
  "Get Mental Health Counseling? (My biased opinion) you really should.",
  "Get Speech Therapy?",
  "Seek an Orchiectomy Surgery?",
  "Seek Tracheal Shave Surgery?",
  "Take Hair Loss Products (Minoxidil/Finasteride)?",
 ]

 function getAnswersRoundOneMtF() {
    if (ganttChartJSON != null) {
        return [ganttChartJSON.MtFPlanObject.spermCryoStatus,
            ganttChartJSON.MtFPlanObject.hormoneStatus,
            ganttChartJSON.MtFPlanObject.comeOutStatus,
            ganttChartJSON.MtFPlanObject.socialTransitionStatus,
            ganttChartJSON.MtFPlanObject.hairTransplantStatus,
            ganttChartJSON.MtFPlanObject.ffsStatus,
            ganttChartJSON.MtFPlanObject.topStatus,
            ganttChartJSON.MtFPlanObject.bottomStatus,
            ganttChartJSON.MtFPlanObject.nameChangeStatus,
            ganttChartJSON.MtFPlanObject.laserStatus,
            ganttChartJSON.MtFPlanObject.counselingStatus,
            ganttChartJSON.MtFPlanObject.speechTherapyStatus,
            ganttChartJSON.MtFPlanObject.orchiectomyStatus,
            ganttChartJSON.MtFPlanObject.trachealShaveStatus,
            ganttChartJSON.MtFPlanObject.hairLossStatus,
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
    "NEEDS-SCHEDULING",
    "NEEDS-SCHEDULING",
    "NEEDS-SCHEDULING",
    "NEEDS-SCHEDULING",
    "NEEDS-SCHEDULING",
    "NEEDS-SCHEDULING",
    "NEEDS-SCHEDULING",
    "NEEDS-SCHEDULING"
 ];
}

 //When will you:
 var questionsRoundTwoMtF = [
   "Start sperm preservation? This can take 2-3 weeks.",
   "Start HRT? If you are preserving sperm you should wait until that's finished to start HRT.",
   "Come out publicly?",
   "Start Social Transition?",
   "Schedule Hair Transplants? If you get FFS this should be 9-12 months after at the earliest.",
   "Schedule FFS?",
   "Schedule Top Surgery?",
   "Schedule Bottom Surgery?  Typically this requires a year or two of social transition + counseling.",
   "Start the Legal Name Change?",
   "Start Laser Hair Removal?   Note that this works best at least 6 weeks after starting hormones.",
   "Start Counseling?",
   "Start Speech Therapy?",
   "Schedule Orchiectomy?",
   "Schedule Tracheal Shave?",
   "Start Hair Loss Treatments (Finasteride/Minoxidil)?",
 ]


 function getAnswersRoundTwoMtF() {
    if (ganttChartJSON != null) {
        return [
            new Date(ganttChartJSON.MtFPlanObject.spermCryoStartDate),
            new Date(ganttChartJSON.MtFPlanObject.hormoneStartDate),
            new Date(ganttChartJSON.MtFPlanObject.comeOutDate),
            new Date(ganttChartJSON.MtFPlanObject.socialTransitionStartDate),
            new Date(ganttChartJSON.MtFPlanObject.hairTransplantDate),
            new Date(ganttChartJSON.MtFPlanObject.ffsStartDate),
            new Date(ganttChartJSON.MtFPlanObject.topSurgeryStartDate),
            new Date(ganttChartJSON.MtFPlanObject.bottomSurgeryStartDate),
            new Date(ganttChartJSON.MtFPlanObject.nameChangeDate),
            new Date(ganttChartJSON.MtFPlanObject.laserStartDate),
            new Date(ganttChartJSON.MtFPlanObject.counselingStartDate),
            new Date(ganttChartJSON.MtFPlanObject.speechTherapyStartDate),
            new Date(ganttChartJSON.MtFPlanObject.orchiectomyDate),
            new Date(ganttChartJSON.MtFPlanObject.trachealShaveDate),
            new Date(ganttChartJSON.MtFPlanObject.hairLossDate)
            
        ]
    }
    else {
        var today = new Date();

        return [
        today,
        new Date(today.getTime()+(14 * msInDay)),
        new Date(today.getTime()+(14 * msInDay)),
        new Date(today.getTime()+(14 * msInDay)),
        new Date(today.getTime()+(365 * msInDay)),
        new Date(today.getTime()+(400 * msInDay)),
        new Date(today.getTime()+(500 * msInDay)),
        new Date(today.getTime()+(700 * msInDay)),
        new Date(today.getTime()+(500 * msInDay)),
        new Date(today.getTime()+(56 * msInDay)),
        new Date(today.getTime()+(7 * msInDay)),
        new Date(today.getTime()+(14 * msInDay)),
        new Date(today.getTime()+(450 * msInDay)),
        new Date(today.getTime()+(550 * msInDay)),
        new Date(today.getTime()+(1 * msInDay))
        ]
    }
}
 //How many:

 var questionsRoundThreeMtF = [
   "Laser Sessions are you planning? 6-12 are common to start with occasional followups, but sometimes more are needed.",
   "Counseling Sessions are you planning? If you don't know just leave this at 80.",
   "Speech Therapy Sessions are you planning?"
 ]


 function getAnswersRoundThreeMtF() {
    if (ganttChartJSON != null) {
        return [
            ganttChartJSON.MtFPlanObject.numberLaserAppointments,
            ganttChartJSON.MtFPlanObject.counselingNumberSessions,
            ganttChartJSON.MtFPlanObject.speechTherapyNumberSessions,
       ];
    }
    else {
        return [
            16,
         80,
         12,
         ]
    }
 }

//How frequently:

var questionsRoundFourMtF = [
  "Counseling Sessions?",
  "Speech Therapy Sessions?"
]

function getAnswersRoundFourMtF() {
    if (ganttChartJSON != null) {
        return [
            ganttChartJSON.MtFPlanObject.counselingDaysBetween,
            ganttChartJSON.MtFPlanObject.speechTherapyDaysBetween,
        ];
    }
    else {
        return [
            14,
            30
          ]
    }
}

