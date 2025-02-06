/**
 * @author Dimitry Kudrayvtsev
 * @version 2.1
 */

 function dimAllExceptClassLabel (classLabel) {
	//Dim all blobs
	d3.selectAll("rect")
	.transition().duration(200)
	.style("stroke-width", 0.1)
	.style("fill-opacity", 0.1);

	//Bring back the hovered over blob
	d3.selectAll(classLabel)
	.transition().duration(200)
	.style("stroke-width", 2.0)
	.style("fill-opacity", 1.0);	       
}

 function returnAllToNormal() {
	//Bring back all blobs
	d3.selectAll("rect")
	.transition().duration(200)
	.style("stroke-width", 2.0)
	.style("fill-opacity", 1.0);
}


function drawSingleLabel(statusLabel, className, innerIndex, svg, height, margin) {
	var colorToDraw = '0xFFFFFF';
	try {
		colorToDraw = getComputedStyle(document.querySelector(className)).fill;
	}
	catch {
		//Nothing of this type was drawn, just ignore for now
		//TODO - more elegant handling
	}
	
	svg.append("text")
		.attr("class", "onHoverText")
	 .attr("text-anchor", "start")
	 .attr("x", - margin.left + 10 + 90 * Math.floor(innerIndex / 6) )
	 .attr("y", height - 30 + 15 * innerIndex - 45 * Math.floor(innerIndex / 6))
	 .attr("stroke", colorToDraw)
	 .text(statusLabel)
	 .on('mouseover', function() {dimAllExceptClassLabel(className) } )
	 .on('mouseout', function() {returnAllToNormal()});
}

function drawCommonLabels(svg, height, margin) {
	taskStatusTypes = ganttChartJSON.taskStatus;

	var innerIndex = 0;

	// svg.append("text")
	//  .attr("text-anchor", "start")
	//  .attr("x", - margin.left + 10)
	//  .attr("y", height - 50)
	//  .attr("stroke", '0x000000')
	//  .text('Mouse Over to see detail:')

	for (const [key, value] of Object.entries(taskStatusTypes)) {
		drawSingleLabel(key, "." + value, innerIndex, svg, height, margin);
		innerIndex += 1;
	  }
}

 d3.gantt = function() {
    var FIT_TIME_DOMAIN_MODE = "fit";
    var FIXED_TIME_DOMAIN_MODE = "fixed";
    
	//Scale to width because this isn't expected to change
	var initialSize = {
		width: document.body.clientWidth,
		height: document.body.clientWidth * 0.5
	}

    var margin = {
	top : 20,
	right : 40,
	bottom : 50,
	left : 150
    };
    var selector = '#ganttChartTarget';
    var timeDomainStart = d3.time.day.offset(new Date(),-3);
    var timeDomainEnd = d3.time.hour.offset(new Date(),+3);
    var timeDomainMode = FIXED_TIME_DOMAIN_MODE;// fixed or fit
    var taskTypes = [];
    var taskStatus = [];
    var height = initialSize.height - margin.top - margin.bottom-20;
    var width = initialSize.width - margin.right - margin.left-5;

    var tickFormat = "%m/%d";

    var keyFunction = function(d) {
	return d.startDate + d.taskName + d.endDate;
    };

    var rectTransform = function(d) {
	return "translate(" + x(new Date(d.startDate)) + "," + y(d.taskName) + ")";
    };

    var x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);

    var y = d3.scale.ordinal().domain(taskTypes).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
    
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format(tickFormat)).tickSubdivide(true)
	    .tickSize(8).tickPadding(8);

    var yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);

    var initTimeDomain = function(tasks) {
	if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
	    if (tasks === undefined || tasks.length < 1) {
		timeDomainStart = d3.time.day.offset(new Date(), -3);
		timeDomainEnd = d3.time.hour.offset(new Date(), +3);
		return;
	    }
	    tasks.sort(function(a, b) {
		return a.endDate - b.endDate;
	    });
	    timeDomainEnd = tasks[tasks.length - 1].endDate;
	    tasks.sort(function(a, b) {
		return a.startDate - b.startDate;
	    });
	    timeDomainStart = tasks[0].startDate;
	}
    };

    var initAxis = function() {
	x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);
	y = d3.scale.ordinal().domain(taskTypes).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
	xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format(tickFormat)).tickSubdivide(true)
		.tickSize(8).tickPadding(8);

	yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);
    };
    
    function gantt(tasks) {
	
	initTimeDomain(tasks);
	initAxis();


    d3.select(selector).selectAll("svg").remove();
	
	var svg = d3.select(selector)
	.append("svg")
	.attr("id","ganttChartSVG")
	.attr("class", "chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
        .attr("class", "gantt-chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
	
      svg.selectAll(".chart")
	 .data(tasks, keyFunction).enter()
	 .append("rect")
	 .attr("rx", 5)
         .attr("ry", 5)
	 .attr("class", function(d){ 
	     if(taskStatus[d.status] == null){ return "bar";}
	     return taskStatus[d.status];
	     }) 
	 .attr("y", 0)
	 .attr("transform", rectTransform)
	 .attr("height", function(d) { return y.rangeBand(); })
	 .attr("width", function(d) { 
	     return Math.max(1,(x(new Date(d.endDate)) - x(new Date(d.startDate)))); 
	     });
	 
	 
	 svg.append("g")
	 .attr("class", "x axis")
	 .attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
	 .transition()
	 .call(xAxis)
     .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");
	 
	 svg.append("g").attr("class", "y axis").transition().call(yAxis);
	 


	 drawCommonLabels(svg, height, margin);

	 return gantt;

    };
    
    gantt.redraw = function(tasks) {

	initTimeDomain(tasks);
	initAxis();
	
        var svg = d3.select(".chart");

        var ganttChartGroup = svg.select(".gantt-chart");
        var rect = ganttChartGroup.selectAll("rect").data(tasks, keyFunction);
        
        rect.enter()
         .insert("rect",":first-child")
         .attr("rx", 5)
         .attr("ry", 5)
	 .attr("class", function(d){ 
	     if(taskStatus[d.status] == null){ return "bar";}
	     return taskStatus[d.status];
	     }) 
	 .transition()
	 .attr("y", 0)
	 .attr("transform", rectTransform)
	 .attr("height", function(d) { return y.rangeBand(); })
	 .attr("width", function(d) { 
	     return Math.max(1,(x(new Date(d.endDate)) - x(new Date(d.startDate)))); 
	     });

        rect.transition()
          .attr("transform", rectTransform)
	 .attr("height", function(d) { return y.rangeBand(); })
	 .attr("width", function(d) { 
	     return Math.max(1,(x(ate(new Dd.endDate)) - x(new Date(d.startDate)))); 
	     });
        
	rect.exit().remove();

	svg.select(".x").transition().call(xAxis);
	svg.select(".y").transition().call(yAxis);
	
	return gantt;
    };

    gantt.margin = function(value) {
	if (!arguments.length)
	    return margin;
	margin = value;
	return gantt;
    };

    gantt.timeDomain = function(value) {
	if (!arguments.length)
	    return [ timeDomainStart, timeDomainEnd ];
	timeDomainStart = +value[0], timeDomainEnd = +value[1];
	return gantt;
    };

    /**
     * @param {string}
     *                vale The value can be "fit" - the domain fits the data or
     *                "fixed" - fixed domain.
     */
    gantt.timeDomainMode = function(value) {
	if (!arguments.length)
	    return timeDomainMode;
        timeDomainMode = value;
        return gantt;

    };

    gantt.taskTypes = function(value) {
	if (!arguments.length)
	    return taskTypes;
	taskTypes = value;
	return gantt;
    };
    
    gantt.taskStatus = function(value) {
	if (!arguments.length)
	    return taskStatus;
	taskStatus = value;
	return gantt;
    };

    gantt.width = function(value) {
	if (!arguments.length)
	    return width;
	width = +value;
	return gantt;
    };

    gantt.height = function(value) {
	if (!arguments.length)
	    return height;
	height = +value;
	return gantt;
    };

    gantt.tickFormat = function(value) {
	if (!arguments.length)
	    return tickFormat;
	tickFormat = value;
	return gantt;
    };

    gantt.selector = function(value) {
	if (!arguments.length)
	    return selector;
	selector = value;
	return gantt;
    };

    return gantt;
};