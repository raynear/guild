import React from 'react';
import {Outlet} from 'react-router-dom';

import Tabs from './Tabs';
import UserInfo from './UserInfo';

const MyAccount = () => {
  return (
		<div style={{position:"absolute"}}>
			<Tabs selected={1}/>
			<UserInfo/>
			<Outlet />
		</div>
  );
};

export default MyAccount;