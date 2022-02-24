import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import RentItemCard from './RentItemCard';

import Tabs from './Tabs';

import collection from '../util/collection';

import config from '../util/config';



const RentNFTs = () => {
	const [items, setItems] = useState([{id:"0", name:"", price:"", image:"", description:"", owner:""}]);

	const navigate = useNavigate();

	useEffect(() => {
		collection.getItems(config.GuildContractAddress).then(async (data) => {
			console.log(data);
			const is = [];
			for(let i of data) {
				const item = await collection.getItem(config.CollectionNFTAddress, parseInt(i));
				console.log(item.replaceAll("'", '"'));
				const i2 = JSON.parse(item.replaceAll("'", '"'));
				i2['id'] = i;
				is.push(i2);
			}
			setItems(is);
		});

	},[]);

	const goBack = () => {
		navigate(-1);
	}

	const supplyNFT = () => {
	}

  return (
		<div style={{position:"absolute"}}>
			<Tabs selected={3}/>
			<div style={{position:"absolute", zIndex:"4", left:"30px", top:"100px", width:"910px", height:"570px"}}>
				<div onClick={goBack}><img alt="g1" src={require("../image/back-button.png")} style={{position:"absolute", left:"20px", top:"15px", width:"157px", height:"21px"}}/></div>
				<Typography variant="h4" style={{position:"absolute", left:"30px", top:"45px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"Rent NFTs"}</Typography>
				<div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", overflow:"auto", position:"absolute", left:"0px", top:"100px", width:"910px", height:"450px"}}>
					{items.map((data:any) => <RentItemCard {...data} key={data.name}/>)}
				</div>
			</div>
		</div>
    );
};

// <Link to={"/Guild/supplyNFT"}>

export default RentNFTs;