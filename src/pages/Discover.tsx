import React, { useState } from 'react';

import Tabs from './Tabs';

const Discover = () => {
	const [name, setName] = useState('');

	const onChangeName = (e:any) => {
		setName(e.target.value);
	  };

    return (
			<div style={{position:"absolute"}}>
				<Tabs selected={2}/>
			</div>
    );
};

export default Discover;