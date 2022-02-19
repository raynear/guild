import React, { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import { Avatar, Grid, Box, Button } from '@mui/material';

import config from '../util/config';
import { KIP17_ABI, Guild_ABI } from '../util/ABI';

const UserInfo = () => {
	const [account, setAccount] = useState('');

	useEffect(() => {
		window.caver.klay.getAccounts().then((accounts:any) => {
			setAccount(accounts[0]);
			// const myContract = new window.caver.klay.Contract(KIP17_ABI, config.MembershipNFTAddress);
		});

		const myContract = new window.caver.klay.Contract(Guild_ABI, config.GuildContractAddress);
		myContract.methods.guildName().call().then((result:any) => {
			console.log(result);
		});
	})


	return (
	<div style={{position:"absolute", zIndex:"4"}}>
		<Typography variant="h5" style={{position:"absolute", left:"180px", top:"155px", transform:"translate(-50%, -50%)", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{account.substring(0, 6)+"..."+account.substring(38)}</Typography>
		<Typography variant="h5" style={{position:"absolute", left:"180px", top:"285px", transform:"translate(-50%, -50%)", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"100,000,000"}</Typography>
		<Typography variant="h5" style={{position:"absolute", left:"180px", top:"395px", transform:"translate(-50%, -50%)", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"14,300"}</Typography>
		<Button style={{position:"absolute", left:"6px", top:"440px"}}><img alt="logout" style={{width:"306px", height:"44px"}} src={require('../image/red-button-on.png')}/></Button>
	</div>
	);
};

export default UserInfo;