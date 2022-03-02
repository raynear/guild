import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import {useRecoilValue} from 'recoil';
import {accountState} from '../recoil/atoms';

import collection from '../util/collection';
import guild from '../util/guild';


const Supply = () => {
	const dummy = {id:"0", content:"", nftContract:"0x0000000000000000000000000000000000000000", nftId:"0", price:"0", option:"supply", done:"in progress"};
	const [NFTInfo, setNFTInfo] = useState(dummy);
	const [owner, setOwner] = useState(false);

	const navigate = useNavigate();

  const account = useRecoilValue(accountState);

	const {id, pollId} = useParams();

	useEffect(() => {
		guild.getProposal(pollId===undefined?0:parseInt(pollId)).then(res => {
			const proposal = parseProposals(res);
			setNFTInfo(proposal===undefined?dummy:proposal);
		})
	},[])


	function parseProposals(proposals:string) {
		const tokens = proposals.split(';');
		// console.log(tokens, tokens.length);
		for(let i=0 ; i<tokens.length-1 ; i+=7) {
			let option = "";
			switch(tokens[i+5]) {
				case "0":
					option = "supply";
					break;
				case "1":
					option = "dispose";
					break;
				case "2":
					option = "divide";
					break;
			}

			let done = "";
			switch(tokens[i+6]) {
				case "0":
					done="in progress";
					break;
				case "1":
					done="approved";
					break;
				case "2":
					done="disapproved";
					break;
				case "3":
					done="terminated";
					break;
			}

			const proposal = {
				id:tokens[i],
				content:tokens[i+1],
				nftContract:tokens[i+2],
				nftId:tokens[i+3],
				price:tokens[i+4],
				option:option,
				done:done
			};
			return proposal;
		}
	}

	const goBack = () => {
		navigate(-1);
	}

	const supplyNFT = async () => {
		const pid = pollId===undefined?0:parseInt(pollId);

		if(await isOwner()) {
			const done = await collection.approve(account, id as string, parseInt(NFTInfo.nftId));
			if(done) {
				await guild.supplyNFT(pid);
			}
		}
		navigate(-1);
	}

	const isOwner = async () => {
		return await collection.ownerOf(account, parseInt(NFTInfo.nftId));
	}

	function bringNFTInfo(contractAddress:string, nftId:string) {
		if(contractAddress !== "" && nftId !== "") {
			collection.getItem(contractAddress, parseInt(nftId)).then((data) => {
				const nftInfo = JSON.parse(data.replaceAll("'", '"'));
				setNFTInfo(nftInfo);
			});
		}
	}

	isOwner().then(res => {
		// console.log(res);
		if(res === account) {
			setOwner(true);
		}
	})

  return (
		<div style={{position:"absolute", zIndex:"4", left:"330px", top:"100px", width:"640px", height:"570px"}}>
      <div onClick={goBack}><img alt="g1" src={require("../image/back-button.png")} style={{position:"absolute", left:"20px", top:"15px", width:"157px", height:"21px"}}/></div>
			<Typography variant="h4" style={{position:"absolute", left:"30px", top:"45px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"Supply NFT"}</Typography>
			<Typography variant="subtitle1" style={{position:"absolute", left:"25px", top:"85px", color:"#bcdeef"}}>Enter the contract address and token ID of the NFT to be provided to our guild.</Typography>
      <img alt="g" src={require("../image/nft-info-price.png")} style={{position:"absolute", left:"20px", top:"115px", width:"596px", height:"97px"}}/>
      <img alt="a" src={require("../image/nft-info-table.png")} style={{position:"absolute", left:"15px", top:"210px", width:"603px", height:"256px"}}/>

			<Typography style={{position:"absolute", left:"160px", top:"115px", width:"465px", height:"21px"}}>{window.caver.utils.fromPeb(NFTInfo.price, 'KLAY')}</Typography>
			<Typography style={{position:"absolute", left:"160px", top:"150px", width:"465px", height:"21px"}}>{NFTInfo.nftContract}</Typography>
			<Typography style={{position:"absolute", left:"160px", top:"183px", width:"465px", height:"21px"}}>{NFTInfo.nftId}</Typography>

      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"280px", top:"230px"}}>CONTENT</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"280px", top:"277px"}}>PRICE</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"280px", top:"324px"}}></Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"280px", top:"370px"}}></Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"280px", top:"415px"}}></Typography>

      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"230px"}}>{NFTInfo.content}</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"277px"}}>{window.caver.utils.fromPeb(NFTInfo.price, 'KLAY')}</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"324px"}}></Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"370px"}}></Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"415px"}}></Typography>

      <img alt="a" src={require("../image/no-images.png")} style={{position:"absolute", left:"85px", top:"270px", width:"124px", height:"160px", zIndex:4}}/>

      <div onClick={supplyNFT} style={{position:"absolute", left:"50px", top:"490px", width:"262px", height:"39px"}}><img alt="b" src={require("../image/supply-button.png")} style={{width:"262px", height:"39px"}}/></div>
      <div onClick={goBack} style={{position:"absolute", left:"330px", top:"490px", width:"262px", height:"39px"}}><img alt="c" src={require("../image/cancel-button.png")} style={{width:"262px", height:"39px"}}/></div>

		</div>
    );
};

// <Link to={"/Guild/supplyNFT"}>

export default Supply;