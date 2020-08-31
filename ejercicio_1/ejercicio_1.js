var datos = [1, 2, 3, 5, 7, 13, 21, 34, 55, 89, 144];

var x = d3.scale.linear()
    .domain([0, d3.max(datos)])
    .range([0, 100])

function graficar() {
    d3.select(".barra")
        .selectAll("div")
        .data(datos)
        .enter()
        .append('div')
        .style("width",
            function (d) {
                return x(d) + "px";
            });
}