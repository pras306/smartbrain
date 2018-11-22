import React from 'react';
import './Navigation.css'

const Navigation = ({signedIn,onRouteChange}) => {
	if(signedIn){
		return(
		<div className='rightAlign'>
			<p className='pa1 ma1 link dim pointer underline grow' onClick={()=>onRouteChange('signin')}>Sign Out</p>
		</div>
	);
	}
	else {
		return(
		<div className='rightAlign'>
			<p className='pa1 ma1 link dim pointer underline grow' onClick={()=>onRouteChange('signin')}>Sign In</p>
			<p className='pa1 ma1 link dim pointer underline grow' onClick={()=>onRouteChange('register')}>Register</p>
		</div>
	);
	}
}

export default Navigation;