import React, { useEffect, useRef } from 'react';
import { select } from 'd3';
import { times } from 'lodash';

function Flower(props) {
	console.log(props.detailedMatchStats);
	console.log(props.isLoaded);

	const svgRef = useRef();

	const petalPathKills = 'M 0, 0 C -9, -9 -9, -20 0, -25 C 9, -20 9, -9 0, 0';
	const petalPathDeaths = 'M 0, 0 C -30, -10 -10, -40 0, -50 C 10, -40 30, -10 0, 0';

	useEffect(
		() => {
			if (props.isLoaded) {
				const svg = select(svgRef.current);

				const gameIndex = props.gameIndex;

				const flower = {
					petalSize: props.detailedMatchStats[gameIndex].kills,
					petalsKills: times(props.detailedMatchStats[gameIndex].kills, (i) => ({
						angle: 360 * i / props.detailedMatchStats[gameIndex].kills,
						petalPathKills
					})),
					petalsDeaths: times(props.detailedMatchStats[gameIndex].deaths, (i) => ({
						angle: 360 * i / props.detailedMatchStats[gameIndex].deaths,
						petalPathDeaths
					}))
				};

				console.log(flower);

				const flowers = svg
					.selectAll('g') //
					.data([ flower ])
					.join('g')
					.attr('transform', (d) => `translate(125, 125)scale(2.1)`);

				flowers
					.selectAll('.deaths') //
					.data((d) => d.petalsDeaths)
					.join('path')
					.attr('d', (d) => d.petalPathDeaths)
					.attr('transform', (d) => `rotate(${d.angle})`)
					.attr('fill', '#496D8C');

				flowers
					.selectAll('.deathsOutline') //
					.data((d) => d.petalsDeaths)
					.join('path')
					.attr('d', (d) => d.petalPathDeaths)
					.attr('transform', (d) => `rotate(${d.angle})`)
					.attr('stroke', 'white')
					.attr('stroke-width', '0.5px')
					.attr('fill', 'none');

				flowers
					.selectAll('.kills') //
					.data((d) => d.petalsKills)
					.join('path')
					.attr('d', (d) => d.petalPathKills)
					.attr('transform', (d) => `rotate(${d.angle})`)
					.attr('fill', '#F2798F');

				flowers
					.selectAll('.kills') //
					.data((d) => d.petalsKills)
					.join('path')
					.attr('d', (d) => d.petalPathKills)
					.attr('transform', (d) => `rotate(${d.angle})`)
					.attr('stroke', 'white')
					.attr('stroke-width', '0.5px')
					.attr('fill', 'none');
			}
		},
		[ props.detailedMatchStats, props.isLoaded, props.gameIndex ]
	);

	return (
		<div>
			<svg width="250" height="250" ref={svgRef}>
				<g className="kills" />
				<g className="killsOutline" />
				<g className="deaths" />
				<g className="deathsOutline" />
			</svg>
		</div>
	);
}

export default Flower;
