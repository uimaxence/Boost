<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let mapContainer;

  const AGENCIES = [
    {
      name: 'Angers',
      coords: [-0.5632, 47.4784],
      status: 'Actif',
      statusColor: '#22c55e',
    },
    {
      name: 'Rennes',
      coords: [-1.6778, 48.1173],
      status: 'Arrive bientôt',
      statusColor: '#f97316',
    },
  ];

  const COLORS = {
    regionFill: '#f8faff',
    regionStroke: '#c7d2fe',
  };

  onMount(async () => {
    const width = 600;
    const height = 500;

    const svg = d3.select(mapContainer)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('width', '100%')
      .style('height', '100%')
      .style('display', 'block');

    let geojson;
    try {
      const res = await fetch('https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson');
      geojson = await res.json();
    } catch {
      return;
    }

    const projection = d3.geoMercator()
      .center([-1.2, 47.6])
      .scale(width * 12)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Départements
    const regionsGroup = svg.append('g').attr('class', 'regions');

    regionsGroup.selectAll('path')
      .data(geojson.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', COLORS.regionFill)
      .attr('stroke', COLORS.regionStroke)
      .attr('stroke-width', 0.8)
      .attr('opacity', 0)
      .transition()
      .duration(400)
      .attr('opacity', 1);

    // Ligne pointillée Angers ↔ Rennes
    const angersXY = projection(AGENCIES[0].coords);
    const rennesXY = projection(AGENCIES[1].coords);

    svg.append('line')
      .attr('x1', angersXY[0])
      .attr('y1', angersXY[1])
      .attr('x2', angersXY[0])
      .attr('y2', angersXY[1])
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '5,5')
      .attr('opacity', 0.25)
      .transition()
      .delay(150)
      .duration(500)
      .ease(d3.easeQuadOut)
      .attr('x2', rennesXY[0])
      .attr('y2', rennesXY[1]);

    // Markers
    const markersGroup = svg.append('g').attr('class', 'markers');

    AGENCIES.forEach((agency, i) => {
      const [x, y] = projection(agency.coords);
      const isAngers = agency.name === 'Angers';
      const g = markersGroup.append('g')
        .attr('transform', `translate(${x}, ${y})`)
        .style('cursor', 'pointer');

      // Halo — bleu/gris translucide
      const pinColor = '#3b82f6';
      const haloColor = 'rgba(59, 130, 246, 0.18)';

      g.append('circle')
        .attr('r', 0)
        .attr('fill', haloColor)
        .transition()
        .delay(300 + i * 100)
        .duration(400)
        .ease(d3.easeBackOut.overshoot(1.5))
        .attr('r', 10);

      // Point central — bleu
      g.append('circle')
        .attr('r', 0)
        .attr('fill', pinColor)
        .transition()
        .delay(300 + i * 100)
        .duration(400)
        .ease(d3.easeBackOut.overshoot(2))
        .attr('r', 4.5);

      // Pulse uniquement pour Angers (actif)
      if (isAngers) {
        g.append('circle')
          .attr('r', 4.5)
          .attr('fill', 'none')
          .attr('stroke', pinColor)
          .attr('stroke-width', 1.5)
          .attr('opacity', 0)
          .transition()
          .delay(700 + i * 100)
          .duration(0)
          .attr('opacity', 0.3)
          .transition()
          .duration(2000)
          .ease(d3.easeQuadOut)
          .attr('r', 18)
          .attr('opacity', 0)
          .on('end', function repeat() {
            d3.select(this)
              .attr('r', 4.5)
              .attr('opacity', 0.3)
              .transition()
              .duration(2000)
              .ease(d3.easeQuadOut)
              .attr('r', 18)
              .attr('opacity', 0)
              .on('end', repeat);
          });
      }

      // Nom de ville persistant au-dessus du point
      g.append('text')
        .attr('x', 0)
        .attr('y', -16)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-weight', '500')
        .attr('font-family', 'Switzer, sans-serif')
        .attr('fill', '#6b7280')
        .attr('opacity', 0)
        .text(agency.name)
        .transition()
        .delay(450 + i * 100)
        .duration(300)
        .attr('opacity', 1);

      // Label statut au hover (au-dessus du nom, centré)
      const statusFo = g.append('foreignObject')
        .attr('x', -60)
        .attr('y', -42)
        .attr('width', 120)
        .attr('height', 22)
        .attr('opacity', 0)
        .style('pointer-events', 'none');

      const statusDiv = statusFo.append('xhtml:div')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', 'center')
        .style('gap', '4px')
        .style('font-family', 'Switzer, sans-serif')
        .style('white-space', 'nowrap');

      statusDiv.append('xhtml:span')
        .style('width', '5px')
        .style('height', '5px')
        .style('border-radius', '50%')
        .style('background', agency.statusColor)
        .style('flex-shrink', '0');

      statusDiv.append('xhtml:span')
        .style('font-size', '8px')
        .style('font-weight', '600')
        .style('color', agency.statusColor)
        .text(agency.status);

      // Zone de hit invisible pour le hover
      g.append('circle')
        .attr('r', 22)
        .attr('fill', 'transparent')
        .style('cursor', 'pointer')
        .on('mouseenter', () => {
          statusFo.transition().duration(150).attr('opacity', 1);
        })
        .on('mouseleave', () => {
          statusFo.transition().duration(150).attr('opacity', 0);
        });
    });
  });
</script>

<div class="france-map" bind:this={mapContainer}></div>

<style>
  .france-map {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .france-map :global(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }

</style>
