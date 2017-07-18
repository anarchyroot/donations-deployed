/**
 * Created by matthewaltomare on 12/06/2017.
 */
function draw_a_chart(chart_type, caption_text) {
    document.getElementById("chart-header").innerText = caption_text;

    queue()
        .defer(d3.json, "/" + chart_type)
        .await(makeGraphs);
}

function makeGraphs(error, a) {
    draw_graph(error, '#chart-go-here', a);
}


function draw_graph(error, html_div, json) {

    //Clean projectsJson data
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    json.forEach(function (d) {
        d["Date"] = dateFormat.parse(d["Date"]);
    });

    //Create a Crossfilter instance
    var ndx = crossfilter(json);

    //Define Dimensions
    var dateDim = ndx.dimension(function (d) {
        return d["Date"];
    });

    //Calculate metrics
    var valueByDate = dateDim.group().reduceSum(function (d) {
        return d["Value"];
    });

    // Define values (to be used in charts)
    var minDate = dateDim.bottom(1)[0]["Date"];
    var maxDate = dateDim.top(1)[0]["Date"];


    //Charts
    var chart = dc.lineChart(html_div);

    // var timeChart = dc.lineChart("#time-chart");

    chart
        .width(1000)
        .height(400)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dateDim)
        .group(valueByDate)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxis().ticks(4);

    dc.renderAll();
}

