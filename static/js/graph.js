/**
 * Created by matthewaltomare on 12/06/2017.
 */
queue()
    .defer(d3.json, "/market-price")
    .defer(d3.json, "/avg-block-size")
    .defer(d3.json, "/mempool-count")
    .defer(d3.json, "/mempool-growth")
    .defer(d3.json, "/mempool-size")
    .defer(d3.json, "/miners-revenue")
    .defer(d3.json, "/n-orphaned-blocks")
    .defer(d3.json, "/n-transactions")
    .defer(d3.json, "/n-transactions-excluding-chains-longer-than-100")
    .defer(d3.json, "/n-transactions-excluding-popular")
    .defer(d3.json, "/n-transactions-per-block")
    .defer(d3.json, "/n-unique-addresses")
    .defer(d3.json, "/output-volume")
    .defer(d3.json, "/total-bitcoins")
    .defer(d3.json, "/trade-volume")
    .defer(d3.json, "/transaction-fees")
    .defer(d3.json, "/transaction-fees-usd")
    .defer(d3.json, "/transactions-per-second")
    .defer(d3.json, "/utxo-count")
    .await(makeGraphs);


function makeGraphs(error, aa, bb, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    draw_graph(error, '#minersrevenue01', aa);
    draw_graph(error, '#minersrevenue0', bb);
    draw_graph(error, '#minersrevenue1', a);
    draw_graph(error, '#minersrevenue2', b);
    draw_graph(error, '#minersrevenue3', c);
    draw_graph(error, '#minersrevenue4', d);
    draw_graph(error, '#minersrevenue5', e);
    draw_graph(error, '#minersrevenue6', f);
    draw_graph(error, '#minersrevenue7', g);
    draw_graph(error, '#minersrevenue8', h);
    draw_graph(error, '#minersrevenue9', i);
    draw_graph(error, '#minersrevenue10', j);
    draw_graph(error, '#minersrevenue11', k);
    draw_graph(error, '#minersrevenue12', l);
    draw_graph(error, '#minersrevenue13', m);
    draw_graph(error, '#minersrevenue14', n);
    draw_graph(error, '#minersrevenue15', o);
    draw_graph(error, '#minersrevenue16', p);
    draw_graph(error, '#minersrevenue17', q);


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
        .width(500)
        .height(200)
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

