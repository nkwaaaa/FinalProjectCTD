import cities from '../mockedData/cities.json';
import styles from '../styles/searchBlock.module.css';
import TypeAheadDropDown from './TypeAheadDropDown';
import DatePicker from './DatePicker';
import Button from './Button';
import locationIcon from '../../src/assets/icons/location-dot-outline.svg';
import { useState } from 'react';
import Input from './Input';

export default function SearchBlock() {
	// eslint-disable-next-line no-unused-vars
	const [selectedCity, setSelectedCity] = useState();
	const renderCitySuggestion = citySuggestion => {
		// function for city suggestions.
		return (
			<div className={styles.citySuggestion}>
				<img src={locationIcon}></img>
				<div className={styles.citySuggestionTextContainer}>
					<span className={styles.primaryText}>{citySuggestion.name}</span>
					<span className={styles.secondaryText}>
						{citySuggestion.secondaryText}
					</span>
				</div>
			</div>
		);
	};

	const onSelectSuggestion = suggestion => {
		// save in a state the selected city from the suggestions list.
		setSelectedCity(suggestion.name);
	};

	return (
		<div className={styles.mainContainer}>
			<h1>Buscá ofertas en hoteles, casas y mucho más </h1>
			<div id='searchBlockForm' className={styles.formContainer}>
				<TypeAheadDropDown
					data={cities.map(city => ({
						name: city.name,
						secondaryText: city.country,
					}))}
					renderSuggestion={renderCitySuggestion}
					placeholder='¿A dónde vamos?'
					onSelectSuggestion={onSelectSuggestion}
				/>
				<DatePicker
					customInput={<Input placeholder='Check in - Check out' />}
				/>
				<Button type='basic' innerText='Buscar'></Button>
			</div>
		</div>
	);
}
