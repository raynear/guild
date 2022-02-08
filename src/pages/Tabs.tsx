import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Grid, Box, Button } from '@mui/material';
import { on } from 'process';


const Tabs = (props:any) => {
	const navigate = useNavigate();

	const click1 = (e:any) => {
		navigate('/myaccount');
	};

	const click2 = () => {
		navigate('/discover');
	}

	const click3 = () => {
		navigate('/rentnft');
	}

    return (
		<div>
			<Button onClick={click1}>
				{props.selected===1?
					<img alt="myaccount" src={require('../image/myaccount.jpeg')} style={{width:"200px", height:"140px"}}/>:
					<img alt="myaccount" src={require('../image/myaccount.jpeg')} style={{width:"200px", height:"140px", opacity:0.4}}/>
				}
			</Button>
			<Button onClick={click2}>
				{props.selected===2?
					<img alt="myaccount" src={require('../image/discovery.png')} style={{width:"200px", height:"140px"}}/>:
					<img alt="myaccount" src={require('../image/discovery.png')} style={{width:"200px", height:"140px", opacity:0.4}}/>
				}
			</Button>
			<Button onClick={click3}>
				{
					props.selected===3?
					<img alt="myaccount" src={require('../image/rent.jpeg')} style={{width:"200px", height:"140px"}}/>:
					<img alt="myaccount" src={require('../image/rent.jpeg')} style={{width:"200px", height:"140px", opacity:0.4}}/>
				}
			</Button>
		</div>
    );
};

export default Tabs;