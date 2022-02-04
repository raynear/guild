import React, { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const UserInfo = () => {
	const [account, setAccount] = useState('');

	useEffect( () => {
		window.caver.klay.getAccounts().then((accounts:any) => {
			setAccount(accounts[0]);
		})
	})

    return (
		<Card>
			<CardContent>
				<Typography>{account}</Typography>
				<Typography>user balance</Typography>
			</CardContent>
		</Card>
    );
};

export default UserInfo;