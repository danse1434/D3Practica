var datos = [1, 2, 3, 5, 8, 11, 13, 21, 24, 55, 89, 144];

var x = d3.scale.linear()
                .domain([0,d3.max(datos)])
                .range([0,100])

function graficar(){
    d3.select('.miGrafica')
    .selectAll('div')
    .data(datos)
    .enter().append('div')
    .text(function(d){
        return d;
    })
    .style("width", function (d) {
                return x(d) + "px"
            })
    .style('background-color', 'green')
    .style('color', 'white')
    .style('padding', '5px')
    .style('margin', '5px')
    .style('text-align', 'right');
}


// function seleccionarBloque(){
//     d3.select('.bloque')
//     .selectAll('div')
//     .style('background.color', 'blue')
//     .style('color', 'white')
//     .style('padding', '5px')
//     .style('margin', '5px');
// }