import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt';
import brain from './brain.png';

const Logo = () => {
	return(
		<div className='leftAlign'>
			<Tilt className="Tilt pa2 ma2 shadow-5 tc bgmGrad" options={{ max : 55, reverse: false }} style={{ height: 75, width: 75 }} >
			 	<div className="Tilt-inner">
			 		<img style={{ paddingTop: '5px'}} src={brain} alt='This is a logo' />
			 	</div>
			</Tilt>
		</div>
	);
}

export default Logo;