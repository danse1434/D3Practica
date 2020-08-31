var datos = [1,2,3,4,5,6,8, 20, 10];

function graficar(){
    d3.select('.miGrafica')
    .selectAll('div')
    .data(datos)
    .enter().append('div')
    .attr('class', 'barra')
    .style("height", function(d){
        return d + 'px';
    });
}