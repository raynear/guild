import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Tabs from './Tabs';
import UserInfo from './UserInfo';
import GuildList from './GuildList';
import Guild from './Guild';
import Inventory from './Inventory';
import Poll from './Poll';
import PollList from './PollList';
import CreatePoll from './CreatePoll';
import NFTInfo from './NFTInfo';

const MyAccount = () => {
  return (
		<div style={{position:"absolute"}}>
			<Tabs selected={1}/>
			<UserInfo/>
			<Routes>
				<Route path="/GuildList" element={<GuildList />} />
				<Route path="/Guild" element={<Guild />} />
				<Route path="/Poll" element={<Poll />} />
				<Route path="/" element={<PollList />} />
				<Route path="/CreatePoll" element={<CreatePoll />} />
				<Route path="/Inventory" element={<Inventory />} />
				<Route path="/NFTInfo" element={<NFTInfo />} />
			</Routes>
		</div>
  );
};

export default MyAccount;