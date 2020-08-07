import React, { useEffect, useRef } from 'react';
import { select, scaleLinear, extent } from 'd3';
import { times } from 'lodash';

function Flower(props) {
	console.log(props.detailedMatchStats);
	console.log(props.isLoaded);

	const svgRef = useRef();

	const petalPath = 'M 0, 0 C -10, -10 -10, -40 0, -50 C 10, -40 10, -10 0, 0';

	useEffect(
		() => {
			if (props.isLoaded) {
				const svg = select(svgRef.current);

				var kills = [];

				for (var i in props.detailedMatchStats) {
					kills.push(props.detailedMatchStats[i].kills);
				}

				var deaths = [];

				for (var i in props.detailedMatchStats) {
					deaths.push(props.detailedMatchStats[i].deaths);
				}

				const killsRange = extent(kills, (d) => d);
				const deathsRange = extent(deaths, (d) => d);

				// const numPetalScale = scaleLinear()
				// 	.domain(killsRange) //
				// 	.range([ 0.25, 1 ]);
				// const sizeScale = scaleLinear()
				// 	.domain(deathsRange) //
				//     .range([ 3, 5, 9 ]);

				const gameIndex = props.gameIndex;

				const flower = {
					petalSize: props.detailedMatchStats[gameIndex].kills,
					petals: times(props.detailedMatchStats[gameIndex].deaths, (i) => ({
						angle: 360 * i / props.detailedMatchStats[gameIndex].deaths,
						petalPath
					}))
				};

				console.log(flower);

				const flowers = svg
					.selectAll('g') //
					.data([ flower ])
					.join('g')
					.attr('transform', (d) => `translate(125, 125)scale(${d.petalSize * 0.2})`);

				flowers
					.selectAll('path') //
					.data((d) => d.petals)
					.join('path')
					.attr('d', (d) => d.petalPath)
					.attr('transform', (d) => `rotate(${d.angle})`)
					.attr('fill', 'none')
					.attr('stroke', 'black')
					.attr('stroke-width', '2px');
			}
		},
		[ props.detailedMatchStats, props.isLoaded ]
	);

	return (
		<div>
			<svg width="250" height="250" ref={svgRef} />
		</div>
	);
}

export default Flower;
