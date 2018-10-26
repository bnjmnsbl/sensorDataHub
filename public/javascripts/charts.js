/* CHART */

let currentUrl = window.location.pathname;
let apiUrl = "/api" + currentUrl.substring(currentUrl.lastIndexOf("/"));

d3.json(apiUrl)
	.then(function(data) {

		let params = {
			"data": data,
			"activeValue": function() {
					if (data.metadata.valuenames) {
						return data.metadata
					}else {
						return Object.keys(data.payloads);
					}
				

			}
		}
		lineChart(params);
	})


const lineChart = (params) => {
	console.log(params.activeValue());

	let data = params.data.payloads.slice(-50);

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

	let line = d3.line()
		.x(function(d,i) {return x(d.timestamp)})
		.y(function(d) {return y(d.payload[params.activeValue])})
		 .curve(d3.curveMonotoneX);

	let svg = d3.select('#vis-container')
 	.append('svg')
 	.attr('width', width)
 	.attr('height', height)

 	let  g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
 	
 	g.append("g")
        .attr("transform", "translate(0," + dHeight + ")")
        .call(d3.axisBottom(x));
	
   	g.append("g")
    	.call(d3.axisLeft(y));

	g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
}
