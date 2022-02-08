import React, { useState, useEffect } from 'react';

import {Box, Grid, Button, Typography} from "@mui/material";

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
			<Box sx={{m:2, p:1}}>
				<Grid container alignItems="center">
					<Grid container item justifyContent="flex-start" xs={6}>
						<Typography variant="h4">My Guilds</Typography>
					</Grid>
					<Grid container item justifyContent="flex-end" xs={6}>
						<Button variant="contained">Create Guild</Button>
					</Grid>
				</Grid>
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