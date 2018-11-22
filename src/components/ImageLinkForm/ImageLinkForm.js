import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({searchChange, buttonClick}) => {
	return(
		<div className='posCenter w-60'>
			<p className='tc w-60'>This Magic Brain will detect faces in your images. Give it a try</p>
			<div className='w-60 pa4 br3 shadow-4 form'>
				<input className='ph2 mh2 w-60 dib' type='text' onChange={searchChange}/>
				<button className='ph2 mh2 link dib grow pointer white bg-light-purple' onClick={buttonClick}>Detect</button>
			</div>			
		</div>
	);
}

export default ImageLinkForm;