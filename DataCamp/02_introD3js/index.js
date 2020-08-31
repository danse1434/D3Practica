// Con esto seleccionamos el comando desde de D3: no necesitamos usar d3.select
import {select, arc} from "d3";

// Este pequeño script modifica durante la ejecución a svg
// Le incluye el atributo

const svg = select('svg');

// Definir algunas variables
const alto = +svg.attr('height'); // Esto es como extraer el valor del svg que está en el HTML; también se puede definir acá con un número
const ancho  = parseFloat(svg.attr('width'));  // parseFloat hace un casting a 'número' de estas variables que son originalmente 'strings'
// Se puede hacer el casting también con " + "
const ojosEspaciamiento = 100;
const ojosExterno = -70;
const ojosRadio = 30;
const cejasAlto   = 20;
const cejasAncho = 50;
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
        .attr('cy', `translate(0, ${ojosExterno})`)
        .attr('fill', 'black');

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
        .attr('transform', `translate(0, ${cejasExterno})`);

grupoCejas
    .transition().duration(2000) // Se pasa una transición que modifica por una duración al atributo
        .attr('y', cejasExterno - 30)
    .transition().duration(2000)
        .attr('y', cejasExterno);
    
const cejaIzquierda = grupoCejas
    .append('rect')
        .attr('x', -ojosEspaciamiento - cejasAncho / 2)
        .attr('y', cejasExterno)
        .attr('heigth', cejasAlto)
        .attr('width', cejasAncho);

const cejaDerecha = grupoCejas
    .append('rect')
        .attr('x', +ojosEspaciamiento - cejasAncho / 2)
        .attr('y', cejasExterno)
        .attr('heigth', cejasAlto)
        .attr('width', cejasAncho);

const boca = grupo
    .append('path')
        .attr('d', arc()({
            innerRadius: 150,
            outerRadius: 170,
            startAngle: Math.PI / 2,
            endAngle: Math.PI * 3 / 4
        }));

// svg.style('background-color', 'red')
//     .style('stroke', 'black');

