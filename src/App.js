import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Form from './Components/Form/Form';
import Flower from './Components/Flower/Flower';
import FadeIn from 'react-fade-in';

function App() {
	const [ isLoaded, setIsLoaded ] = useState(false);
	const [ detailedMatchStats, setDetailedMatchStats ] = useState({});

	const indices = [];
	for (var i = 0; i < 50; i++) {
		indices.push(i);
	}

	const flowers = indices.map((i) => (
		<Flower detailedMatchStats={detailedMatchStats} isLoaded={isLoaded} gameIndex={i} />
	));

	const flowersRef = useRef();

	useEffect(
		() => {
			if (isLoaded) {
				flowersRef.current.scrollIntoView({
					behavior: 'smooth'
				});
			}
		},
		[ isLoaded ]
	);

	return (
		<div className="App">
			<Form setIsLoaded={setIsLoaded} setDetailedMatchStats={setDetailedMatchStats} />
			<div ref={flowersRef}>{isLoaded ? <FadeIn className="flowerContainer">{flowers}</FadeIn> : null}</div>
		</div>
	);
}

export default App;
