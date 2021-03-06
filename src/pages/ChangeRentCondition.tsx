import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import collection from '../util/collection';
import guild from '../util/guild';


const ChangeRentCondition = () => {
	const [value, setValue] = useState({contractAddress:"", nftId:0, price:0});
	const [NFTInfo, setNFTInfo] = useState({name:"", symbol:""});

	const navigate = useNavigate();

	useEffect(() => {
	},[])

	const goBack = () => {
		navigate(-1);
	}

	const changeRentCondition = () => {
		guild.proposeSupplyNFT(value.contractAddress, value.nftId, value.price);
		navigate(-1);
	}


	function bringNFTInfo() {
		if(value.contractAddress !== "") {
			collection.getItem(value.contractAddress, value.nftId).then((data) => {
				// console.log(data);
			});
		}
	}


	const handleAddress = (e:any) => {
		setValue({...value, contractAddress:e.target.value});
		bringNFTInfo();
	}

	const handleNFTId = (e:any) => {
		setValue({...value, nftId:e.target.value});
		bringNFTInfo();
	}

	const handlePrice = (e:any) => {
		setValue({...value, price:e.target.value});
	}

  return (
		<div style={{position:"absolute", zIndex:"4", left:"330px", top:"100px", width:"640px", height:"570px"}}>
      <div onClick={goBack}><img alt="g1" src={require("../image/back-button.png")} style={{position:"absolute", left:"20px", top:"15px", width:"157px", height:"21px"}}/></div>
			<Typography variant="h4" style={{position:"absolute", left:"30px", top:"45px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"Change Rent Condition"}</Typography>
			<Typography variant="subtitle1" style={{position:"absolute", left:"25px", top:"85px", color:"#bcdeef"}}>Enter the contract address and token ID of the NFT to be provided to our guild.</Typography>
      <img alt="g" src={require("../image/nft-info-price.png")} style={{position:"absolute", left:"20px", top:"115px", width:"596px", height:"97px"}}/>
      <img alt="a" src={require("../image/nft-info-table.png")} style={{position:"absolute", left:"15px", top:"210px", width:"603px", height:"256px"}}/>

			<input style={{position:"absolute", left:"145px", top:"115px", width:"465px", height:"21px"}} color="secondary" onChange={handlePrice}/>
			<input style={{position:"absolute", left:"145px", top:"150px", width:"465px", height:"21px"}} color="secondary" onChange={handleAddress}/>
			<input style={{position:"absolute", left:"145px", top:"183px", width:"465px", height:"21px"}} color="secondary" onChange={handleNFTId}/>

      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"280px", top:"230px"}}>NAME</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"280px", top:"277px"}}>SYMBOL</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"280px", top:"324px"}}></Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"280px", top:"370px"}}></Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"280px", top:"415px"}}></Typography>

      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"230px"}}>{NFTInfo.name}</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"277px"}}>{NFTInfo.symbol}</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"324px"}}></Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"370px"}}></Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"415px"}}></Typography>

      <img alt="a" src={require("../image/no-images.png")} style={{position:"absolute", left:"85px", top:"270px", width:"124px", height:"160px", zIndex:4}}/>

      <div onClick={changeRentCondition} style={{position:"absolute", left:"50px", top:"490px", width:"262px", height:"39px"}}><img alt="b" src={require("../image/create-button.png")} style={{width:"262px", height:"39px"}}/></div>
      <div onClick={goBack} style={{position:"absolute", left:"330px", top:"490px", width:"262px", height:"39px"}}><img alt="c" src={require("../image/cancel-button.png")} style={{width:"262px", height:"39px"}}/></div>

		</div>
    );
};

// <Link to={"/Guild/supplyNFT"}>

export default ChangeRentCondition;