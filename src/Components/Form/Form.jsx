import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TestData from '../Debug/TestData';

function Form(props) {
	const [ isTestData, setIsTestData ] = useState(false); // DEBUG

	const { handleSubmit, register } = useForm();

	const onSubmit = (values) => {
		console.log('Getting stats for ' + values.accountName + ' in ' + values.region);

		fetch(
			'http://35.224.13.247:8000/get-player-data?region=' + values.region + '&accountName=' + values.accountName
		)
			.then((r) => r.json())
			.then((data) => {
				console.log(data);
				props.setDetailedMatchStats(data.detailed);
			})
			.then(() => {
				setIsTestData(false);
				props.setIsLoaded(true);
			});
	};

	return (
		<div className="formWrapper">
			<h1>LoL K/D/A Flowers</h1>
			<p>
				Inspired by <a href="https://sxywu.com/filmflowers/">Shirley Wu's Film Flowers</a>, this takes the kills
				and deaths of the player's recent matches, and visualizes them as flowers. The deaths are represented as
				the larger, blue petals while the kills are the smaller, red petals.
			</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<select type="regionDropdown" name="region" id="region" ref={register()}>
					<option key="na1" value="na1">
						NA
					</option>
					<option key="euw1" value="euw1">
						EUW
					</option>

					<option key="kr" value="kr">
						KR
					</option>
				</select>

				<input type="text" name="accountName" ref={register()} />
				<button type="submit">Go</button>
			</form>

			<br />

			<TestData
				setBasicData={props.setBasicData}
				setChampFreqData={props.setChampFreqData}
				setIsLoaded={props.setIsLoaded}
				isTestData={isTestData}
				setIsTestData={setIsTestData}
				setDetailedMatchStats={props.setDetailedMatchStats}
				setSummaryStats={props.setSummaryStats}
			/>
		</div>
	);
}

export default Form;
