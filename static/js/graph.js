/**
 * Created by matthewaltomare on 12/06/2017.
 */
queue()
    .defer(d3.json, "/transactionspersecond")
    .defer(d3.json, "/transactionsfeesusd")
    .await(makeGraphs);

function makeGraphs(error, persecond, transfees) {
    transfees_graph(error, transfees);
    persecond_graph(error, persecond);
}

function transfees_graph(error, transfees) {

    //Clean projectsJson data
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    transfees.forEach(function (d) {
        d["Date"] = dateFormat.parse(d["Date"]);
    });


    //Create a Crossfilter instance
    var ndx = crossfilter(transfees);

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
    var transactionsPerSecond = dc.lineChart("#transpersec");
    // var timeChart = dc.lineChart("#time-chart");

    transactionsPerSecond
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

function persecond_graph(error, projectsJson) {

    //Clean projectsJson data
    var donorsUSProjects = projectsJson;
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    donorsUSProjects.forEach(function (d) {
        console.log(d["Date"]);
        d["Date"] = dateFormat.parse(d["Date"]);
    });


    //Create a Crossfilter instance
    var ndx = crossfilter(donorsUSProjects);

    //Define Dimensions
    var dateDim = ndx.dimension(function (d) {
        return d["Date"];
    });

    //Calculate metrics
    var valueByDate = dateDim.group().reduceSum(function (d) {
        return d["Value"];
    });

    //Define values (to be used in charts)
    var minDate = dateDim.bottom(1)[0]["Date"];
    var maxDate = dateDim.top(1)[0]["Date"];

    //Charts
    var transactionsfeesusd = dc.lineChart("#transfeesusd");
    // var timeChart = dc.lineChart("#transfeesusd");

    transactionsfeesusd
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