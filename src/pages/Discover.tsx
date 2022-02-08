import React, { useState } from 'react';

import Tabs from './Tabs';
import GuildPresentation from './GuildPresentation';

const Discover = () => {
	const [name, setName] = useState('');

	const onChangeName = (e:any) => {
		setName(e.target.value);
	  };

    return (
		<div>
			<div>
				<Tabs selected={2}/>
			</div>
			<h2>Discover</h2>
			<ul>
				<li><GuildPresentation name="1" /></li>
				<li><GuildPresentation name="2" /></li>
				<li><GuildPresentation name="3" /></li>
				<li><GuildPresentation name="4" /></li>
			</ul>
		</div>
    );
};

export default Discover;