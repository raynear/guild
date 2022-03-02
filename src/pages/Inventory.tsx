import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import ItemCard from './ItemCard';

import {useRecoilValue} from 'recoil';
import {accountState} from '../recoil/atoms';

import config from '../util/config';

import collection from '../util/collection';

const Inventory = () => {
	const [items, setItems] = useState([{id:"0", name:"", price:"", image:"", description:"", owner:""}]);
	const account = useRecoilValue(accountState);

	const {id} = useParams();

	const navigate = useNavigate();

//		{name:"aa", type:"supply", contractAddress:"0xaaa", nftId:"1", due:"1일"},

	useEffect(() => {
		const address = id===undefined?'':id;
		collection.getItems(address).then(async (data) => {
			// console.log(data);
			const is = [];
			for(let i of data) {
				const item = await collection.getItem(config.CollectionNFTAddress, parseInt(i));
				// console.log(item.replaceAll("'", '"'));
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
		<div style={{position:"absolute", zIndex:"4", left:"330px", top:"100px", width:"640px", height:"570px"}}>
      <div onClick={goBack}><img alt="g1" src={require("../image/back-button.png")} style={{position:"absolute", left:"20px", top:"15px", width:"157px", height:"21px"}}/></div>
			<Typography variant="h4" style={{position:"absolute", left:"30px", top:"45px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"Guild Inventory"}</Typography>
			<div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", overflow:"auto", position:"absolute", left:"0px", top:"100px", width:"640px", height:"470px"}}>
				{items.map((data:any) => <ItemCard {...data} key={data.name}/>)}
			</div>
		</div>
    );
};

// <Link to={"/Guild/supplyNFT"}>

export default Inventory;