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
			<Typography variant="h5" style={{position:"absolute", left:"180px", top:"155px", transform:"translate(-50%, -50%)", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{account.substring(0, 6)+"..."+account.substring(38)}</Typography>
			<Typography variant="h5" style={{position:"absolute", left:"180px", top:"285px", transform:"translate(-50%, -50%)", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"100,000,000"}</Typography>
			<Typography variant="h5" style={{position:"absolute", left:"180px", top:"395px", transform:"translate(-50%, -50%)", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"14,300"}</Typography>
			<Button style={{position:"absolute", left:"6px", top:"440px"}}><img alt="logout" style={{width:"306px", height:"44px"}} src={require('../image/red-button-on.png')}/></Button>
		</div>
    );
};

export default UserInfo;