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
			<img alt="myAccount" src={require('../image/tab-1-3.png')} style={{width:"978px", height:"690px", position:"absolute", zIndex:"1"}}/>
			<img alt="discover" src={require('../image/tab-2-3.png')} style={{width:"978px", height:"690px", position:"absolute", zIndex:"1"}}/>
			<img alt="rent" src={require('../image/tab-3-3.png')} style={{width:"978px", height:"690px", position:"absolute", zIndex:"1"}}/>
				{props.selected===1?
					<img alt="myAccount" src={require('../image/tab-1-3.png')} style={{width:"978px", height:"690px", position:"absolute", zIndex:"2"}}/>:
				props.selected===2?
					<img alt="discover" src={require('../image/tab-2-3.png')} style={{width:"978px", height:"690px", position:"absolute", zIndex:"2"}}/>:
					<img alt="rent" src={require('../image/tab-3-3.png')} style={{width:"978px", height:"690px", position:"absolute", zIndex:"2"}}/>
				}
				<div style={{position:"absolute", left:"0px", top:"0px", width:"326px", height:"100px", zIndex:"3"}} onClick={click1}>
				</div>
				<div style={{position:"absolute", left:"326px", top:"0px", width:"326px", height:"100px", zIndex:"3"}} onClick={click2}>
				</div>
				<div style={{position:"absolute", left:"652px", top:"0px", width:"326px", height:"100px", zIndex:"3"}} onClick={click3}>
				</div>
		</div>
    );
};

export default Tabs;