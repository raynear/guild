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
		<div>
		<Card>
			<CardContent>
				<Grid container>
				<Box sx={{m:1, p:1}}>
					<Avatar src="/asssets/avatar.jpeg" variant="circular" />
				</Box>
				<Box sx={{m:1, p:1}}>
					<Typography variant="h6">{account.substring(0, 6)+"..."+account.substring(38)}</Typography>
				</Box>
				</Grid>
				<Typography>user balance</Typography>
			</CardContent>
		</Card>
		<Box sx={{m:2}}>
		</Box>
		<Box>
			<Button fullWidth variant="contained" color="secondary">Logout</Button>
		</Box>
		</div>
    );
};

export default UserInfo;