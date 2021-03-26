import React from 'react';
import classes from './Stopatch.module.css';

const Stopwatch = (props) => {

	const checkNumber = (number) => {
		if (number < 10) {
			number = '0' + number;
		}
		return number;
	}

	return (
		<div className={classes.Stopwatch}>
			<span>{checkNumber(props.hh)}</span>
			<span>:</span>
			<span>{checkNumber(props.mm)}</span>
			<span>:</span>
			<span>{checkNumber(props.ss)}</span>
		</div>
	);
}

export default Stopwatch;