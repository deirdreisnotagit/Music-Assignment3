const topRockSongs = [
    { artist: "Fleetwod Mac", title: "Dreams", sales_and_streams: 1882000 },
    { artist: "AJR", title: "Bang!", sales_and_streams: 1627000 },
    { artist: "Imagine Dragons", title: "Believer", sales_and_streams: 1571000 },
    { artist: "Journey", title: "Don't Stop Believin'", sales_and_streams: 1497000 },
    { artist: "Eagles", title: "Hotel California", sales_and_streams: 1393000 }
 ];
const tooltip = d3.select('#myTop_songs').append("div")
        .attr('class', 'tooltip');

const topSongsSection = d3.select('#top-songs');


topSongsSection
    .append('h3')
        .text('Top Rock Songs');

const circleChartWidth = 550;
const circleChartHeight = 130;

const circlesChart = topSongsSection
.append('svg')
        .attr('viewbox', [0, 0, circleChartWidth, circleChartHeight])
        .attr('width', circleChartWidth)
        .attr('height', circleChartHeight);
;
const circleWidth = 100;
const marginLeftCircle = 10;
const circlePadding = 40;
// Create the line
circlesChart
    .append('line')
    .attr('x1', 0)
    .attr('y1', circleChartHeight/2)
    .attr('x2', circleChartWidth)
    .attr('y2', circleChartHeight/2)
    .attr('stroke', '#333')
    .attr('stroke-width', 2);
// draw the circles
const circlesChartGroups =  circlesChart
    .selectAll('.circle-group')
    .data(topRockSongs)
    .join('g')
       .attr('class','circle-group');
// make the scale       
const myMax = d3.max(topRockSongs, d => d.sales_and_streams)
const circlesScale = d3.scaleSqrt()
    .domain([0,myMax])
    .range([0,40]);

// draw the circles
                                
circlesChartGroups
    .append("circle")
    .attr('r', (d ,i)=> {
          return circlesScale(d.sales_and_streams);
      })
    .attr('cy',circleChartHeight/2)
    .attr('cx',(d,i) => marginLeftCircle  + circlePadding + (marginLeftCircle +circleWidth)*i)
    .attr('fill', '#8da0cb')
circlesChartGroups.append('text')
         .attr('class','label')
         .attr('x',(d,i)  => marginLeftCircle + circlePadding + (marginLeftCircle +circleWidth)*i)
         .attr('y',120)
         .attr('text-anchor', 'middle')
         .text(d => d.title);
circlesChartGroups.append('text')
         .attr('class','label')
         .attr('x',(d,i)  => marginLeftCircle + circlePadding + (marginLeftCircle +circleWidth)*i)
         .attr('y',10)
         .attr('text-anchor', 'middle')
         .text(d => d.sales_and_streams/1000000 + 'M');

circlesChartGroups
 .on("mouseover", function(event, d) {
    // console.log(d);
    return tooltip.style("visibility", "visible").text('Artist = ' + d.artist);
  })
  
  // we move tooltip during of "mousemove"
  
  .on("mousemove", function() {
    // console.log(d);
    let myX = d3.event.pageX;
    let myY =  d3.event.pageY;
    // console.log(myX);
    return tooltip.style("left", myX + "px").style("top",  myY+ "px");
  })
  
  // we hide our tooltip on "mouseout"
  
  .on("mouseout", function() {
    return tooltip.style("visibility", "hidden");
  });
 