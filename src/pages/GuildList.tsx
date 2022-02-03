import React, { useState } from 'react';

import Guild from './Guild';

const GuildList = () => {

    return (
		<div>
			<h2>Guild List</h2>
			<ul>
				<li><Guild name="1" /></li>
				<li><Guild name="2" /></li>
			</ul>
		</div>
    );
};

export default GuildList;