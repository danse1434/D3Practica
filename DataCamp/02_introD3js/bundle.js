(function (d3) {
    'use strict';
   
// Este pequeño script modifica durante la ejecución a svg
// Le incluye el atributo
const svg = d3.select('svg');


// Definir algunas variables
const alto = +svg.attr('height'); // Esto es como extraer el valor del svg que está en el HTML; también se puede definir acá con un número
const ancho  = parseFloat(svg.attr('width'));  // parseFloat hace un casting a 'número' de estas variables que son originalmente 'strings'
// Se puede hacer el casting también con " + "
const ojosEspaciamiento = 101;
const ojosExterno = -89;
const ojosRadio = 40;
const cejasAlto = 20;
const cejasAncho = 70;
const cejasExterno = -70;

console.log(ancho); // Imprimir en la consola el valor

// Crear un grupo
const grupo = svg
    .append('g')
        .attr('transform', `translate(${ancho / 2}, ${alto / 2})`);

// Con esto definimos un circulo en SVG
// Encadenamiento de métodos para atributos de " circle "
const circulo = grupo
    .append('circle')
    // se encadenan atributos al círculo
        .attr('r', alto / 2)
        .attr('fill', 'yellow')
        .attr('stroke', 'black');


// Ojos
const grupoOjos = grupo
    .append('g')
        .attr('transform', `translate(0, ${ojosExterno})`)
        .attr('fill', 'blue');

const ojoIzquierda = grupoOjos
    .append('circle')
        .attr('r', ojosRadio)
        .attr('cx', - ojosEspaciamiento);

const ojoDerecho = grupoOjos
    .append('circle')
        .attr('r', ojosRadio)
        .attr('cx', + ojosEspaciamiento);
        // .attr('cy', height/2 + orientacionOjos)


// Control de las cejas
const grupoCejas = grupoOjos
    .append('g')
        .attr('transform', `translate(0, ${cejasExterno})`)
        .attr('fill', 'blue')
        .attr('stroke', 'blue');

grupoCejas
    .transition().duration(2000) // Se pasa una transición que modifica por una duración al atributo
        .attr('transform', `translate(0, ${cejasExterno - 50})`)
    .transition().duration(2000)
        .attr('transform', `translate(0, ${cejasExterno})`);
    
const cejaIzquierda = grupoCejas
    .append('rect')
        .attr('x', -ojosEspaciamiento - cejasAncho / 2)
        .attr('height', cejasAlto)
        .attr('width', cejasAncho);

const cejaDerecha = grupoCejas
    .append('rect')
        .attr('x', ojosEspaciamiento - cejasAncho / 2)
        .attr('height', cejasAlto)
        .attr('width', cejasAncho);

const boca = grupo
    .append('path')
    .attr('fill', 'blue')
    .attr('d', d3.arc()({
        innerRadius: 150,
        outerRadius: 170,
        startAngle: Math.PI / 2,
        endAngle:   Math.PI * 3 / 2
    }));

}(d3));