function downloadJSONFile() {
 var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ganttChartJSON));
var dlAnchorElem = document.getElementById('downloadAnchorElem');
dlAnchorElem.setAttribute("href",     dataStr     );
dlAnchorElem.setAttribute("download", "myTransitionPlan.json");
dlAnchorElem.click();
}