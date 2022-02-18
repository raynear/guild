import React, { useState } from 'react';

import Tabs from './Tabs';

const RentNFT = () => {
	const [name, setName] = useState('');

	const onChangeName = (e:any) => {
		setName(e.target.value);
	  };

    return (
			<div style={{position:"absolute"}}>
				<Tabs selected={3}/>
				<h2>RentNFT</h2>
        <input value={name} onChange={onChangeName} />
				<h2>홈 : {name}</h2>
			</div>
    );
};

export default RentNFT;