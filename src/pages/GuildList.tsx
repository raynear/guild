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
		<div style={{position:"absolute", zIndex:"4", left:"330px", top:"100px", width:"640px", height:"500px"}}>
			<Box sx={{m:2, p:1}}>
				<Grid container alignItems="center">
					<Grid container item justifyContent="flex-start" xs={6}>
						<Typography variant="h4" style={{textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>My Guilds</Typography>
					</Grid>
					<Grid container item justifyContent="flex-end" xs={6}>
						<Button><img alt="logout" style={{width:"177px", height:"45.8px"}} src={require('../image/action-button-on.png')}/></Button>
					</Grid>
				</Grid>
			</Box>
				<div style={{position:"relative"}}>
			{guilds.map((guild:any) => (
					<GuildCard name={guild.name} address={guild.address} key={guild} />
			))}
				</div>
		</div>
    );
};

export default GuildList;