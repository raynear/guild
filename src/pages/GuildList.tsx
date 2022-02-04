import React, { useState, useEffect } from 'react';

import Box from "@mui/material/Box";

import guild from '../util/guild';

import GuildCard from './GuildCard';

const GuildList = () => {
	const [guilds, setGuilds] = useState([]);

	useEffect( () => {
		guild.getGuilds().then((guilds:any) => {
				setGuilds(guilds);
		});
	});

    return (
		<div>
			<Box m={2}>
				<Box sx={{left:0}}>
					My Guilds
				</Box>
				<Box sx={{right:0}}>
					<button>Create Guild</button>
				</Box>
			</Box>
			<Box m={2}>
				{guilds.map((guild:any) => (
					<Box m={2}><GuildCard name={guild} key={guild} /></Box>
				))}
			</Box>
		</div>
    );
};

export default GuildList;