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
		<div style={{position:"absolute", zIndex:"4", left:"330px", top:"100px", width:"625px", height:"500px"}}>
			<Box sx={{m:2, p:1}}>
				<Grid container alignItems="center">
					<Grid container item justifyContent="flex-start" xs={6}>
						<Typography variant="h4">My Guilds</Typography>
					</Grid>
					<Grid container item justifyContent="flex-end" xs={6}>
						<Button><img alt="logout" style={{width:"177px", height:"45.8px"}} src={require('../image/action-button-on.png')}/></Button>
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