import React, { useState } from 'react';
import './App.css';
import Form from './Components/Form/Form';
import Flower from './Components/Flower/Flower';

function App() {
	const [ isLoaded, setIsLoaded ] = useState(false);
	const [ basicData, setBasicData ] = useState({});
	const [ champFreqData, setChampFreqData ] = useState({});
	const [ detailedMatchStats, setDetailedMatchStats ] = useState({});
	const [ summaryStats, setSummaryStats ] = useState({});

	const indices = [];
	for (var i = 0; i < 20; i++) {
		indices.push(i);
	}

	const flowers = indices.map((i) => (
		<Flower detailedMatchStats={detailedMatchStats} isLoaded={isLoaded} gameIndex={i} />
	));

	return (
		<div className="App">
			<Form
				setBasicData={setBasicData}
				setChampFreqData={setChampFreqData}
				setIsLoaded={setIsLoaded}
				setDetailedMatchStats={setDetailedMatchStats}
				setSummaryStats={setSummaryStats}
			/>
			<div className="flowerContainer">{flowers}</div>
		</div>
	);
}

export default App;
