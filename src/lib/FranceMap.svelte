<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let mapContainer;
  let tooltip = { visible: false, x: 0, y: 0, name: '', info: '', sub: '' };

  const AGENCIES = [
    {
      name: 'Angers',
      coords: [-0.5632, 47.4784],
      active: true,
      info: 'Ouvert depuis 2 mois',
      sub: '45 membres actifs',
    },
    {
      name: 'Rennes',
      coords: [-1.6778, 48.1173],
      active: true,
      info: 'Ouverture prochainement',
      sub: '',
    },
  ];

  const COLORS = {
    regionFill: '#f8faff',
    regionStroke: '#c7d2fe',
    markerActive: '#3730A3',
    markerSoon: '#818cf8',
  };

  onMount(async () => {
    const width = mapContainer.clientWidth;
    const height = mapContainer.clientHeight;

    const svg = d3.select(mapContainer)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('width', '100%')
      .style('height', '100%');

    // Glow filter
    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%').attr('y', '-50%')
      .attr('width', '200%').attr('height', '200%');
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '5')
      .attr('result', 'coloredBlur');
    const merge = filter.append('feMerge');
    merge.append('feMergeNode').attr('in', 'coloredBlur');
    merge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Fetch GeoJSON départements pour plus de détail
    let geojson;
    try {
      const res = await fetch('https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson');
      geojson = await res.json();
    } catch {
      return;
    }

    // Projection zoomée sur Pays de la Loire / Bretagne
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
      .delay((d, i) => i * 30)
      .duration(500)
      .attr('opacity', 1);

    // Ligne pointillée Angers ↔ Rennes
    const angersXY = projection(AGENCIES[0].coords);
    const rennesXY = projection(AGENCIES[1].coords);

    svg.append('line')
      .attr('x1', angersXY[0])
      .attr('y1', angersXY[1])
      .attr('x2', angersXY[0])
      .attr('y2', angersXY[1])
      .attr('stroke', COLORS.markerActive)
      .attr('stroke-width', 1.2)
      .attr('stroke-dasharray', '5,5')
      .attr('opacity', 0.35)
      .transition()
      .delay(700)
      .duration(800)
      .ease(d3.easeQuadOut)
      .attr('x2', rennesXY[0])
      .attr('y2', rennesXY[1]);

    // Markers
    const markersGroup = svg.append('g').attr('class', 'markers');

    AGENCIES.forEach((agency, i) => {
      const [x, y] = projection(agency.coords);
      const g = markersGroup.append('g')
        .attr('transform', `translate(${x}, ${y})`)
        .style('cursor', 'pointer');

      const isActive = agency.name === 'Angers';

      // Cercle principal
      g.append('circle')
        .attr('class', 'marker-dot')
        .attr('r', 0)
        .attr('fill', isActive ? COLORS.markerActive : COLORS.markerSoon)
        .attr('filter', isActive ? 'url(#glow)' : null)
        .transition()
        .delay(800 + i * 200)
        .duration(500)
        .ease(d3.easeBackOut.overshoot(2))
        .attr('r', isActive ? 10 : 7);

      // Pulse pour Angers
      if (isActive) {
        g.append('circle')
          .attr('r', 10)
          .attr('fill', 'none')
          .attr('stroke', COLORS.markerActive)
          .attr('stroke-width', 2)
          .attr('opacity', 0)
          .transition()
          .delay(1300 + i * 200)
          .duration(0)
          .attr('opacity', 0.5)
          .transition()
          .duration(2000)
          .ease(d3.easeQuadOut)
          .attr('r', 28)
          .attr('opacity', 0)
          .on('end', function repeat() {
            d3.select(this)
              .attr('r', 10)
              .attr('opacity', 0.5)
              .transition()
              .duration(2000)
              .ease(d3.easeQuadOut)
              .attr('r', 28)
              .attr('opacity', 0)
              .on('end', repeat);
          });
      }

      // Label ville
      g.append('text')
        .attr('x', 0)
        .attr('y', isActive ? -18 : -14)
        .attr('text-anchor', 'middle')
        .attr('font-size', isActive ? '13px' : '11px')
        .attr('font-weight', '600')
        .attr('font-family', 'Switzer, sans-serif')
        .attr('fill', isActive ? COLORS.markerActive : COLORS.markerSoon)
        .attr('opacity', 0)
        .text(agency.name)
        .transition()
        .delay(1000 + i * 200)
        .duration(400)
        .attr('opacity', 1);

      // Zone de hit invisible (plus grande pour faciliter le hover)
      g.append('circle')
        .attr('r', 25)
        .attr('fill', 'transparent')
        .on('mouseenter', (event) => {
          const rect = mapContainer.getBoundingClientRect();
          tooltip = {
            visible: true,
            x: event.clientX - rect.left,
            y: event.clientY - rect.top - 12,
            name: agency.name,
            info: agency.info,
            sub: agency.sub,
          };
        })
        .on('mouseleave', () => {
          tooltip = { ...tooltip, visible: false };
        });
    });
  });
</script>

<div class="france-map" bind:this={mapContainer}>
  {#if tooltip.visible}
    <div
      class="tooltip"
      class:active={tooltip.sub}
      style="left: {tooltip.x}px; top: {tooltip.y}px;"
    >
      <span class="tooltip-name">{tooltip.name}</span>
      <span class="tooltip-info">{tooltip.info}</span>
      {#if tooltip.sub}
        <span class="tooltip-sub">{tooltip.sub}</span>
      {/if}
    </div>
  {/if}
</div>

<style>
  .france-map {
    width: 100%;
    height: 100%;
    min-height: 500px;
    position: relative;
  }

  .france-map :global(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }

  .tooltip {
    position: absolute;
    transform: translate(-50%, -100%);
    background: white;
    border-radius: 10px;
    padding: 0.625rem 0.875rem;
    box-shadow: 0 4px 20px rgba(55, 48, 163, 0.15), 0 0 0 1px rgba(55, 48, 163, 0.08);
    pointer-events: none;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 2px;
    white-space: nowrap;
    animation: tooltipIn 0.2s ease-out;
  }

  @keyframes tooltipIn {
    from { opacity: 0; transform: translate(-50%, -90%); }
    to { opacity: 1; transform: translate(-50%, -100%); }
  }

  .tooltip-name {
    font-size: 0.8125rem;
    font-weight: 700;
    color: #3730A3;
  }

  .tooltip-info {
    font-size: 0.75rem;
    font-weight: 500;
    color: #4b5563;
  }

  .tooltip-sub {
    font-size: 0.6875rem;
    font-weight: 500;
    color: #3730A3;
  }

  .tooltip::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background: white;
    box-shadow: 2px 2px 4px rgba(55, 48, 163, 0.08);
  }
</style>
