import React, { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Grid, Box, Button } from '@mui/material';


const UserInfo = () => {
	const [account, setAccount] = useState('');

	useEffect( () => {
		window.caver.klay.getAccounts().then((accounts:any) => {
			setAccount(accounts[0]);
		})
	})

    return (
		<div style={{position:"absolute", zIndex:"4"}}>
			<Typography variant="h5" style={{position:"absolute", left:"90px", top:"135px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{account.substring(0, 6)+"..."+account.substring(38)}</Typography>
			<Typography variant="h5" style={{position:"absolute", left:"90px", top:"260px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"100,000,000"}</Typography>
			<Typography style={{position:"absolute", left:"90px", top:"350px"}}>user balance</Typography>
			<Button style={{position:"absolute", left:"6px", top:"440px"}}><img alt="logout" style={{width:"306px", height:"44px"}} src={require('../image/red-button-on.png')}/></Button>
		</div>
    );
};

export default UserInfo;