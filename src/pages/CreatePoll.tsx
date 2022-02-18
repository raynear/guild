import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Typography } from '@mui/material';

import QueryString from 'qs';


const CreatePoll= () => {
	const [name, setName] = useState('');
	const [query, setQuery] = useState({});

	const location = useLocation();

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
			<Typography variant="h4" style={{position:"absolute", left:"30px", top:"45px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"Create Poll (${})"}</Typography>
			<Typography variant="subtitle1" style={{position:"absolute", left:"25px", top:"95px", color:"#bcdeef"}}>Enter the contract address and token ID of the NFT to be provided to our guild.</Typography>
      <img alt="g" src={require("../image/nft-info.png")} style={{position:"absolute", left:"20px", top:"130px", width:"596px", height:"67px"}}/>
      <img alt="a" src={require("../image/nft-info-table.png")} style={{position:"absolute", left:"15px", top:"210px", width:"603px", height:"256px"}}/>

      <Typography variant="body1" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#000", position:"absolute", left:"160px", top:"133px"}}>0x495f947276749Ce646f68AC8c248420045cb7b5e</Typography>
      <Typography variant="body1" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#000", position:"absolute", left:"160px", top:"170px"}}>5546465704496319970692304673817…</Typography>

      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"230px"}}>Lost Hero Sword</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"277px"}}>LHSWD</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"324px"}}>5</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"370px"}}>2</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"415px"}}>385,194</Typography>

      <img alt="a" src={require("../image/no-images.png")} style={{position:"absolute", left:"85px", top:"270px", width:"124px", height:"160px", zIndex:4}}/>

      <img alt="b" src={require("../image/create-button.png")} style={{position:"absolute", left:"50px", top:"490px", width:"262px", height:"39px"}}/>
      <img alt="c" src={require("../image/cancel-button.png")} style={{position:"absolute", left:"330px", top:"490px", width:"262px", height:"39px"}}/>

		</div>
    );
};

// <Link to={"/MyAccount/Guild/supplyNFT"}>

export default CreatePoll;