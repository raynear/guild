import React, { useState } from 'react';

import Tabs from './Tabs';

const RentNFT = () => {
	const [name, setName] = useState('');

	const onChangeName = (e:any) => {
		setName(e.target.value);
	  };

    return (
		<div>
			<div style={{position:"absolute"}}>
				<Tabs selected={3}/>
			</div>
			<h2>RentNFT</h2>
			<div>
        		<input value={name} onChange={onChangeName} />
      		</div>
			<div>
				<h2>
					홈 : {name}
				</h2>
			</div>
		</div>
    );
};

export default RentNFT;