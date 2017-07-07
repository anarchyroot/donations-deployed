/**
 * Created by matthewaltomare on 12/06/2017.
 */
function draw_a_chart(chart_type) {
    queue()
        .defer(d3.json, "/" + chart_type)
        .await(makeGraphs);
}

    // queue()
    //     .defer(d3.json, "/avg-block-size")
        // .defer(d3.json, "/bip-9-segwit")
        // .defer(d3.json, "/bitcoin-unlimited-share")
        // .defer(d3.json, "/blocks-size")
        // .defer(d3.json, "/cost-per-transaction-percent")
        // .defer(d3.json, "/estimated-transaction-volume-usd")
        // .defer(d3.json, "/hash-rate")
        // .defer(d3.json, "/market-cap")
        // .defer(d3.json, "/market-price")
        // .defer(d3.json, "/median-confirmation-time")
        // .defer(d3.json, "/mempool-count")
        // .defer(d3.json, "/mempool-growth")
        // .defer(d3.json, "/mempool-size")
        // .defer(d3.json, "/miners-revenue")
        // .defer(d3.json, "/my-wallet-n-users")
        // .defer(d3.json, "/n-orphaned-blocks")
        // .defer(d3.json, "/n-transactions")
        // .defer(d3.json, "/n-transactions-excluding-chains-longer-than-100")
        // .defer(d3.json, "/n-transactions-excluding-popular")
        // .defer(d3.json, "/n-transactions-per-block")
        // .defer(d3.json, "/n-transactions-total")
        // .defer(d3.json, "/n-unique-addresses")
        // .defer(d3.json, "/nya-support")
        // .defer(d3.json, "/output-volume")
        // .defer(d3.json, "/total-bitcoins")
        // .defer(d3.json, "/trade-volume")
        // .defer(d3.json, "/transaction-fees")
        // .defer(d3.json, "/transaction-fees-usd")
        // .defer(d3.json, "/transactions-per-second")
        // .defer(d3.json, "/utxo-count")
        // .await(makeGraphs);


function makeGraphs(error, a) {
    draw_graph(error, '#chart-go-here', a);

    // , b, c, d, e, f, g, h, k, l, m, n, o, p, q, aa, bb, cc, dd, ee, ff, gg, hh, ii, jj, kk, ll, mm, nn, oo

    // draw_graph(error, '#bip-9-segwit', b);
    // draw_graph(error, '#bitcoin-unlimited-share', c);
    // draw_graph(error, '#blocks-size', d);
    // draw_graph(error, '#cost-per-transaction-percent', e);
    // draw_graph(error, '#estimated-transaction-volume-usd', f);
    // draw_graph(error, '#hash-rate', g);
    // draw_graph(error, '#market-cap', h);
    // draw_graph(error, '#market-price', k);
    // draw_graph(error, '#median-confirmation-time', l);
    // draw_graph(error, '#mempool-count', m);
    // draw_graph(error, '#mempool-growth', n);
    // draw_graph(error, '#mempool-size', o);
    // draw_graph(error, '#miners-revenue', p);
    // draw_graph(error, '#my-wallet-n-users', q);
    // draw_graph(error, '#n-orphaned-blocks', aa);
    // draw_graph(error, '#n-transactions', bb);
    // draw_graph(error, '#n-transactions-excluding-chains-longer-than-100', cc);
    // draw_graph(error, '#n-transactions-excluding-popular', dd);
    // draw_graph(error, '#n-transactions-per-block', ee);
    // draw_graph(error, '#n-transactions-total', ff);
    // draw_graph(error, '#n-unique-addresses', gg);
    // draw_graph(error, '#nya-support', hh);
    // draw_graph(error, '#output-volume', ii);
    // draw_graph(error, '#total-bitcoins', jj);
    // draw_graph(error, '#trade-volume', kk);
    // draw_graph(error, '#transaction-fees', ll);
    // draw_graph(error, '#transaction-fees-usd', mm);
    // draw_graph(error, '#transactions-per-second', nn);
    // draw_graph(error, '#utxo-count', oo);


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

