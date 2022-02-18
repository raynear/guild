import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Typography } from '@mui/material';

import PollCard from './PollCard';

import QueryString from 'qs';


const PollList = () => {
	const [name, setName] = useState('');
	const [query, setQuery] = useState({});

	const location = useLocation();

	const json = [
		{name:"aa", type:"supply", contractAddress:"0xaaa", nftId:"1", due:"1일"},
		{name:"bb", type:"dispose", contractAddress:"0xbbb", nftId:"2", due:"2일"},
		{name:"cc", type:"supply", contractAddress:"0xccc", nftId:"3", due:"3일"},
		{name:"dd", type:"change", contractAddress:"0xddd", nftId:"4", due:"4일"},
		{name:"ee", type:"supply", contractAddress:"0xeee", nftId:"5", due:"1일"}
	];

	useEffect(() => {
		const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });
		setQuery(queryData);
	})

	const onChangeName = (e:any) => {
		setName(e.target.value);
  };

	const goBack = () => {
	}

	const supplyNFT = () => {
	}

  return (
		<div style={{position:"absolute", zIndex:"4", left:"330px", top:"100px", width:"640px", height:"570px"}}>
      <Link to={""}><img alt="g1" src={require("../image/back-button.png")} style={{position:"absolute", left:"20px", top:"15px", width:"157px", height:"21px"}}/></Link>
			<Typography variant="h4" style={{position:"absolute", left:"30px", top:"45px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"Poll List (${})"}</Typography>
			<div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", overflow:"auto", position:"absolute", left:"0px", top:"100px", width:"640px", height:"470px"}}>
				{json.map((data:any) => {
					return PollCard(data);
				})}
			</div>
		</div>
    );
};

// <Link to={"/MyAccount/Guild/supplyNFT"}>

export default PollList;