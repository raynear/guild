import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import config from '../util/config';
import collection from '../util/collection';
import guild from '../util/guild';

const NFTInfo = () => {
	const [NFTInfo, setNFTInfo] = useState({contractAddress:"0x0000000000000000000000000000000000000000", name:"sword", symbol:"SWRD"});

	const navigate = useNavigate();
	const {nftId} = useParams();

	useEffect(() => {
		const id = nftId===undefined?"0":nftId;
		collection.getItem(config.CollectionNFTAddress, parseInt(id)).then(item => {
			const i2 = JSON.parse(item.replaceAll("'", '"'));
			i2['contractAddress'] = config.CollectionNFTAddress;
			setNFTInfo(i2);
		});
	},[]);

	const goBack = () => {
		navigate(-1);
	}

  return (
		<div style={{position:"absolute", zIndex:"4", left:"330px", top:"100px", width:"640px", height:"570px"}}>
      <div onClick={goBack}><img alt="g1" src={require("../image/back-button.png")} style={{position:"absolute", left:"20px", top:"15px", width:"157px", height:"21px"}}/></div>
			<Typography variant="h4" style={{position:"absolute", left:"30px", top:"45px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"NFT Info"}</Typography>
			<Typography variant="subtitle1" style={{position:"absolute", left:"25px", top:"95px", color:"#bcdeef"}}>Enter the contract address and token ID of the NFT to be provided to our guild.</Typography>
      <img alt="g" src={require("../image/nft-info.png")} style={{position:"absolute", left:"20px", top:"130px", width:"596px", height:"67px"}}/>
      <img alt="a" src={require("../image/nft-info-table.png")} style={{position:"absolute", left:"15px", top:"210px", width:"603px", height:"256px"}}/>

      <Typography variant="body1" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#000", position:"absolute", left:"160px", top:"133px"}}>{NFTInfo.contractAddress}</Typography>
      <Typography variant="body1" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#000", position:"absolute", left:"160px", top:"170px"}}>{nftId}</Typography>

      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"230px"}}>{NFTInfo.name}</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"277px"}}>{NFTInfo.symbol}</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"324px"}}></Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"370px"}}></Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"415px"}}></Typography>

      <img alt="a" src={require("../image/no-images.png")} style={{position:"absolute", left:"85px", top:"270px", width:"124px", height:"160px", zIndex:4}}/>
		</div>
    );
};

// <Link to={"/Guild/supplyNFT"}>

export default NFTInfo;