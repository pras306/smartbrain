import React from 'react';

const Rank = ({ name, entries}) => {
	return(
		<div className='tc f3 black w-60' style={{paddingTop: '100px', marginLeft: 'auto', marginRight: 'auto'}}>
			{`Hello ${name}, your current rank is ${entries}`}
		</div>
	);
}

export default Rank;