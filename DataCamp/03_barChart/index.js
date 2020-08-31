(function (d3) {

    'use strict'
    // import { select, csv } from 'd3';
    const svg =  d3.select('svg');
    const ancho = +svg.attr('width');
    const altura = +svg.attr('height');
    // crear la función Render 
    const render = data => {
        // Valores a tomar
        const xValor = d => d.population;
        const yValor = d => d.country;
        const margin = { top: 25, right: 10, bottom: 50, left: 150 }
        const anchoInterno = ancho - margin.left - margin.right;
        const alturaInterna = altura - margin.top - margin.bottom;

        // se hace un mapeo lineal del dominio (datos) al rango (interfaz con usuario)
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, xValor)])
            .range([0, anchoInterno]);
        // se hace un mapeo de bada
        const yScale = d3.scaleBand()
            .domain(data.map(yValor)) // Mapea a la lista de datos con los países le asigna su elemento
            .range([0, alturaInterna])
            .padding(0.2); // Esto separa un poco las barras
        // Imprime en consola el valor del dominio
        // console.log(xScale.domain());

        // crear márgenes hay que incluir a los rectángulos dentro de un grupo
        const grupo = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
        
        // definir un gradiente
        var defs = grupo.append('defs');
        var gradiente = defs.append('linearGradient')
            .attr('id', 'svgGradiente')
            .attr('x1', '0%').attr('y1', '0%')
            .attr('x2', '40%').attr('y2', '100%');
        gradiente.append('stop')
            .attr('class', 'start').attr('offset', '0%')
            .attr('stop-color', '#8EC5FC')
            .attr('stop-opacity', 1);
        gradiente.append('stop')
            .attr('class', 'end').attr('offset', '100%')
            .attr('stop-color', '#E0C3FC')
            .attr('stop-opacity', 1);

        // agregar Escalas
        grupo.append('g').call(d3.axisLeft(yScale)); 
        // Para remover los ticks y lineas tick se pueden eliminar .selectAll('.domain, .tick line').remove();
        
        const xEje = grupo.append('g')
            .call(d3.axisBottom(xScale).tickFormat(d3.format('.2s')).tickSize(-alturaInterna))
            .attr('transform', `translate(0, ${alturaInterna})`); // Esta escala aparece inicialmente arriba
        
        xEje.append('text')
            .text('Población')
            .attr('x', anchoInterno/2).attr('y', 40)
            .attr('class', 'tituloEjeX');
        
        grupo.selectAll('rect').data(data)
            // Selecciona todos los rectangulos en DOM - luego data hace el join con los datos
            // Esto permite que los rectángulos alcancen para su asignación de los datos
            .enter().append('rect')
            // enter() asigna el elemento de la lista y adiciona el rectángulo con append('rect')
            .attr('y', d => yScale(yValor(d)))
            .attr('width', d => xScale(xValor(d)))
            .attr('height', d => yScale.bandwidth());
        // Título
        grupo.append('text')
            .text('Población en Paises de Latino América')
            .attr('class', 'titulo')
            .attr('transform', `translate(${+5}, ${-10})`);
    };


    d3.csv('/data.csv').then(data => {
        // Este hace casting a float de cada uno de los elementos de "population" 
        data.forEach(element => {
            element.population = +element.population; // Se transforma a Millones
        });
        // Imprime en consola para comprobar funcionamiento - recuerde utilizar servidores
        // console.log(data);

        render(data)
    });
    

}(d3));
