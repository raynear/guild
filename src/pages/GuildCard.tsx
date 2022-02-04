import React, { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const GuildCard = (props:any) => {
	const [name, setName] = useState('');

	const onChangeName = (e:any) => {
		setName(e.target.value);
	  };

    return (
		<Card>
			<CardContent>
			<Typography>{props.name}</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">정보</Button>
			</CardActions>
		</Card>
    );
};

export default GuildCard;