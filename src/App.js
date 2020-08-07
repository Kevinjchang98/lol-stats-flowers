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

	return (
		<div className="App">
			<Form
				setBasicData={setBasicData}
				setChampFreqData={setChampFreqData}
				setIsLoaded={setIsLoaded}
				setDetailedMatchStats={setDetailedMatchStats}
				setSummaryStats={setSummaryStats}
			/>

			<Flower detailedMatchStats={detailedMatchStats} isLoaded={isLoaded} gameIndex={0} />
		</div>
	);
}

export default App;
