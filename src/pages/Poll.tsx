import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import guild from '../util/guild';


const Poll = (props:any) => {
	const dummy = {id:"0", content:"", nftContract:"0x0000000000000000000000000000000000000000", nftId:"0", price:"0", option:"supply", done:"in progress"};
	const [NFTInfo, setNFTInfo] = useState(dummy);
	const navigate = useNavigate();

	const { pollId } = useParams();

	useEffect(() => {
		guild.getProposal(parseInt(pollId===undefined?"0":pollId)).then(res => {
			console.log(res);
			const proposal = parseProposals(res);
			setNFTInfo(proposal===undefined?dummy:proposal);
		});
		// setNFTInfo({name:"Sword", symbol:"DWRF", contractAddress:"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", tokenId:"23", option:"supply"});
	},[]);

	function parseProposals(proposals:string) {
		const tokens = proposals.split(';');
		console.log(tokens, tokens.length);
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

	const agree = async () => {
		await guild.vote(parseInt(pollId as string), true);
		navigate(-1);
	}
	const disagree = async () => {
		await guild.vote(parseInt(pollId as string), false);
		navigate(-1);
	}

  return (
		<div style={{position:"absolute", zIndex:"4", left:"330px", top:"100px", width:"640px", height:"570px"}}>
      <div onClick={goBack}><img alt="g1" src={require("../image/back-button.png")} style={{position:"absolute", left:"20px", top:"15px", width:"157px", height:"21px"}}/></div>
			<Typography variant="h4" style={{position:"absolute", left:"30px", top:"45px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"Poll "+NFTInfo.option}</Typography>
			<Typography variant="subtitle1" style={{position:"absolute", left:"25px", top:"95px", color:"#bcdeef"}}>Enter the contract address and token ID of the NFT to be provided to our guild.</Typography>
      <img alt="g" src={require("../image/nft-info.png")} style={{position:"absolute", left:"20px", top:"130px", width:"596px", height:"67px"}}/>
      <img alt="a" src={require("../image/nft-info-table.png")} style={{position:"absolute", left:"15px", top:"210px", width:"603px", height:"256px"}}/>

      <Typography variant="body1" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#000", position:"absolute", left:"160px", top:"133px"}}>{NFTInfo.nftContract}</Typography>
      <Typography variant="body1" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#000", position:"absolute", left:"160px", top:"170px"}}>{NFTInfo.nftId}</Typography>

      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"230px"}}>{NFTInfo.content}</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"277px"}}>{NFTInfo.price}</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"324px"}}>5</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"370px"}}>2</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", right:"50px", top:"415px"}}>385,194</Typography>

      <img alt="a" src={require("../image/no-images.png")} style={{position:"absolute", left:"85px", top:"270px", width:"124px", height:"160px", zIndex:4}}/>

      <div onClick={agree}><img alt="b" src={require("../image/agree-button.png")} style={{position:"absolute", left:"50px", top:"490px", width:"262px", height:"39px"}}/></div>
      <div onClick={disagree}><img alt="c" src={require("../image/disagree-button.png")} style={{position:"absolute", left:"330px", top:"490px", width:"262px", height:"39px"}}/></div>

		</div>
    );
};

// <Link to={"/Guild/supplyNFT"}>

export default Poll;