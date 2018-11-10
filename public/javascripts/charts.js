let currentUrl = window.location.pathname;
let apiUrl = "/api" + currentUrl.substring(currentUrl.lastIndexOf("/"));

d3.json(apiUrl)
	.then(function(data) {

		let params = {

			"data": data,	
			"activeValue": Object.keys(data.payloads[data.payloads.length-1].payload)[0]
		}
		
		let payloadValueArray = Object.keys(data.payloads[data.payloads.length-1].payload)
	
		let dropdownChange = function() {
        	let newParams = {
        		"data": data,
        		"activeValue": d3.select(this).property('value')
        	}
            updateChart(newParams);
        };

		let dropdown = d3.select("#dropdown")
			.insert("select", "svg")
			.on("change", dropdownChange);

		dropdown
			.selectAll("option")
			.data(payloadValueArray)
			.enter()
			.append("option")
			.attr("value", function(d){
            	return d;
        		})
        	.text(function(d){
            	return (d) ;
        		});

        
/*
		d3.selectAll("option")
	        .data(data.payloads.payload)
	        .enter()
	        .append("option")
	        .attr("value", function(d, i) {
	            return i;
	        })
	        .text(function(d) {
	            return d;
	        });*/


		updateChart(params);
	});


const updateChart = (params) => {

	d3.select("#vis-container svg").remove()

	let data = params.data.payloads.slice(-20);

	let margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 700,
		height = 250,
	 	dWidth = width - margin.left - margin.right,
     	dHeight = height - margin.top - margin.bottom;
  
	data.forEach(d=>{
		d.timestamp = new Date(d.timestamp);
	})

	let x = d3.scaleTime().rangeRound([0, dWidth]).domain(d3.extent(data, d=> d.timestamp));

	let y = d3.scaleLinear().rangeRound([dHeight, 0]).domain(d3.extent(data, d=> d.payload[params.activeValue]));

	let svg = d3.select('#vis-container')
 	.append('svg')
 	.attr('width', width)
 	.attr('height', height)

 	let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
 	
 	g.append("g")
        .attr("transform", "translate(0," + dHeight + ")")
        .call(d3.axisBottom(x));
	
   	g.append("g")
    	.call(d3.axisLeft(y));


// start the lines
	let line = d3.line()
	//	.defined(d => !isNaN(d))
		.x(function(d,i) {return x(d.timestamp)})
		.y(function(d) {console.log(d.payload[params.activeValue]); return y(d.payload[params.activeValue])})
		
	g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);


}
