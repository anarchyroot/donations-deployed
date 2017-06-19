/**
 * Created by matthewaltomare on 12/06/2017.
 */
queue()
    .defer(d3.json, "/mempool-count")
    .defer(d3.json, "/mempool-growth")
    .defer(d3.json, "/mempool-size")
    .defer(d3.json, "/miners-revenue")
    .await(makeGraphs);



function makeGraphs(error, mempoolcount, mempoolgrowth, mempoolsize, minersrevenue) {
    mempool_count_graph(error, mempoolcount);
    mempool_growth_graph(error, mempoolgrowth);
    mempool_size_graph(error, mempoolsize);
    miners_revenue_graph(error, minersrevenue);
}

function mempool_count_graph(error, mempoolcount) {

    //Clean projectsJson data
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    mempoolcount.forEach(function (d) {
        d["Date"] = dateFormat.parse(d["Date"]);
    });


    //Create a Crossfilter instance
    var ndx = crossfilter(mempoolcount);

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
    var mempool_count = dc.lineChart("#mempoolcount");
    // var timeChart = dc.lineChart("#time-chart");

    mempool_count
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

function mempool_growth_graph(error, mempoolgrowth) {

    //Clean projectsJson data
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    mempoolgrowth.forEach(function (d) {
        d["Date"] = dateFormat.parse(d["Date"]);
    });


    //Create a Crossfilter instance
    var ndx = crossfilter(mempoolgrowth);

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
    var mempool_growth = dc.lineChart("#mempoolgrowth");
    // var timeChart = dc.lineChart("#time-chart");

    mempool_growth
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

function mempool_size_graph(error, mempoolsize) {

    //Clean projectsJson data
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    mempoolsize.forEach(function (d) {
        d["Date"] = dateFormat.parse(d["Date"]);
    });


    //Create a Crossfilter instance
    var ndx = crossfilter(mempoolsize);

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
    var mempool_size = dc.lineChart("#mempoolsize");
    // var timeChart = dc.lineChart("#time-chart");

    mempool_size
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


function miners_revenue_graph(error, minersrevenue) {

    //Clean projectsJson data
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    minersrevenue.forEach(function (d) {
        d["Date"] = dateFormat.parse(d["Date"]);
    });


    //Create a Crossfilter instance
    var ndx = crossfilter(minersrevenue);

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
    var miners_revenue = dc.lineChart("#minersrevenue");
    // var timeChart = dc.lineChart("#time-chart");

    miners_revenue
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

