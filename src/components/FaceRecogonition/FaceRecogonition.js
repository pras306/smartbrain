import React from 'react';
import './FaceRecogonition.css'

const FaceRecogonition = ({box, imageURL}) => {
	return(
		<div className='ma' style={{display:'flex', justifyContent: 'center'}}>			
			<div className='absolute mt2'>
				<img id='inputImage' alt='' src={imageURL} style={{width: '500px', height: 'auto'}} />
				<div className='bounding-box' style={{top: box.top_row, left: box.left_col, bottom: box.bottom_row, right: box.right_col}}></div>
			</div>
		</div>
	);
}


export default FaceRecogonition;