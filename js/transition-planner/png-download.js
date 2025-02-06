d3.select("#downloadPng")
.on('click', function(){
    // Get the d3js SVG element and save using saveSvgAsPng.js
    saveSvgAsPng(document.getElementById("ganttChartSVG"), "plot.png", {scale: 2, backgroundColor: "#FFFFFF"});
})