import React from 'react';

import Box from '@mui/material/Box';

import Tabs from './Tabs';
import UserInfo from './UserInfo';
import GuildList from './GuildList';

const MyAccount = () => {
    return (
		<div>
			<div>
				<Tabs selected={1}/>
			</div>
			<div style={{float:"left",width:"30%"}}>
				<Box m={2}>
					<UserInfo/>
				</Box>
			</div>
			<div style={{float:"left",width:"70%"}}>
				<Box m={2}>
					<GuildList/>
				</Box>
			</div>
		</div>
    );
};

export default MyAccount;