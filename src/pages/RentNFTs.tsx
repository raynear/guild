import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import ItemCard from './ItemCard';

import Tabs from './Tabs';

import collection from '../util/collection';



const RentNFTs = () => {
	const [name, setName] = useState('');
	const [json, setJSON] = useState([]);

	const {id} = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const guildAddress = id===undefined?'':id;
		collection.getBalance(guildAddress).then((result:any) => setName(result));
	},[]);

	const onChangeName = (e:any) => {
		setName(e.target.value);
  };

	const goBack = () => {
		navigate(-1);
	}

	const supplyNFT = () => {
	}

  return (
		<div style={{position:"absolute"}}>
			<Tabs selected={3}/>
			<div style={{position:"absolute", zIndex:"4", left:"330px", top:"100px", width:"640px", height:"500px"}}>
				<div onClick={goBack}><img alt="g1" src={require("../image/back-button.png")} style={{position:"absolute", left:"20px", top:"15px", width:"157px", height:"21px"}}/></div>
				<Typography variant="h4" style={{position:"absolute", left:"30px", top:"45px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"Inventory (${})"}</Typography>
				<div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", overflow:"auto", position:"absolute", left:"0px", top:"100px", width:"640px", height:"470px"}}>
					{json.map((data:any) => {
						return ItemCard(data);
					})}
				</div>
			</div>
		</div>
    );
};

// <Link to={"/Guild/supplyNFT"}>

export default RentNFTs;