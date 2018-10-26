/* CHART */

let currentUrl = window.location.pathname;
let apiUrl = "/api" + currentUrl.substring(currentUrl.lastIndexOf("/"));

d3.json(apiUrl)
	.then(function(data) {

		let params = {
			"data": data,
			"activeValue": "Temperatur"
		}

		lineChart(params);
	})


const lineChart = (params) => {

	let data = params.data.payloads.slice(-50);

	//let parseTime = d3.timeFormat("%d.%m.%y %H:%M:%S");

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
		.x(function(d,i) {console.log(x(d.timestamp)); return x(d.timestamp)})
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

/*
const lineChart = (params) => {
  
    let module = {},
      container = params.container || d3.select('body'),
      height = params.height || 250,
      width = params.width || 500,
      data = params.data,
      date_column = params.date_column || 'date',
      data_column = params.data_column || 'value',
      zero_based = params.zero_based || false,
      group_column = params.group_column || false,
      colors = params.colors || '#000',
      svg = container.append('svg').attr('width', width).attr('height', height),
      margin = params.margin || {top: 20, right: 20, bottom: 30, left: 50},
      dWidth = width - margin.left - margin.right,
      dHeight = height - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`),
      parseTime = params.parseTime || d3.timeParse("%Y-%m-%d"),
      isTime = params.isTime || false,
      xTicks = params.xTicks || false
    
    data.forEach(d=>{
      if(isTime){
        d[date_column] = parseTime(d[date_column])
      }else{
        d[date_column] = +d[date_column]
      }
      d[data_column] = +d[data_column]
    })
    let x = params.x || (isTime==true) ? d3.scaleTime().rangeRound([0, dWidth]).domain(d3.extent(data, d=>d[date_column])) : d3.scaleLinear().range([0, dWidth]).domain(d3.extent(data, function(d) { return d[date_column]; })),
      y = params.y || d3.scaleLinear().rangeRound([dHeight, 0]).domain(((zero_based) ? [0,d3.max(data, d=>d[data_column])] : d3.extent(data, d=>d[data_column] ) )),
      line = params.line || d3.line().x(d=>x(d[date_column])).y(d=>y(d[data_column]))
      //console.log(date_column, y.domain(), y.range())
      //Let's get drawing
      let xAxis = d3.axisBottom(x)
      if(xTicks){
        xAxis.tickFormat(xTicks)
      }
      g.append("g")
        .attr("transform", "translate(0," + dHeight + ")")
        .call(xAxis)
      // .select(".domain")
      //   .remove()
      g.append("g")
        .call(d3.axisLeft(y))
      // .append("text")
      //   .attr("fill", "#000")
      //   .attr("transform", "rotate(-90)")
      //   .attr("y", 6)
      //   .attr("dy", "0.71em")
      //   .attr("text-anchor", "end")
      //   .text("Price ($)");
      if(group_column){
        let keys = []
        data.forEach(d=>{ if(keys.indexOf(d[group_column])==-1){ keys.push(d[group_column]); } })
        keys.forEach((key,ki)=>{
          g.append("path")
            .datum(data.filter(d=>(d[group_column]==key)?true:false))
            .attr("fill", "none")
            .attr("stroke", (typeof colors == 'object')?colors[key]:colors)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
        })
      }else{
        g.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", (typeof colors == 'object')?colors[key]:colors)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", line);
      }
    return module
  }

*/







 
   


   /*
    pm25ScaleY = d3.scaleLinear().domain([0,d3.max(d, function(d){return d.pm25;})]).range([200,0]),
    pm25Axis = d3.axisLeft().scale(pm25ScaleY),
    pm10ScaleY = d3.scaleLinear().domain([0,d3.max(d, function(d){return d.pm10;})]).range([200,0]),
    pm10Axis = d3.axisRight().scale(pm10ScaleY),
    scaleX = d3.scaleLinear().range([0, 450]).domain([0, d.length]),
    pm25 = d3.line().y(function(d){ return pm25ScaleY(d.pm25); }).x(function(d,i){ return scaleX(i); }),
    pm10 = d3.line().y(function(d){ return pm10ScaleY(d.pm10); }).x(function(d,i){ return scaleX(i); });
        
svg.append('g').append('path').attr('id', 'pm25').datum(d).attr('d', pm25).style('stroke','blue');
svg.append('g').append('path').attr('id', 'pm10').datum(d).attr('d', pm10).style('stroke','red');
svg.append('g').attr('transform', 'translate(450,-10)').append('text').text('pm10').style('fill','red');
svg.append('g').attr('transform', 'translate(0,-10)').append('text').text('pm25').style('text-anchor', 'end').style('fill','blue');
svg.append('g').call(pm25Axis);
svg.append('g').attr('transform', 'translate(450,0)').call(pm10Axis);
*/