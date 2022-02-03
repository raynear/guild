import React from 'react';

import UserInfo from './UserInfo';
import GuildList from './GuildList';

const MyAccount = () => {
    return (
		<div>
			<UserInfo/>
			<GuildList/>
		</div>
    );
};

export default MyAccount;