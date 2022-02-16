import React from 'react';

import Box from '@mui/material/Box';

import Tabs from './Tabs';
import UserInfo from './UserInfo';
import GuildList from './GuildList';

const MyAccount = () => {
    return (
		<div style={{position:"absolute"}}>
			<Tabs selected={1}/>
			<UserInfo/>
			<GuildList/>
		</div>
    );
};

export default MyAccount;