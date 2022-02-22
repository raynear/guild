import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import PollCard from './PollCard';

import guild from '../util/guild';


const PollList = () => {
	const [proposals, setProposals] = useState([{hash:"", contractAddress:"0x0000000000000000000000000000000000000000", nftId:"0", option:"supply", done:false}]);

	const location = useLocation();
	const navigate = useNavigate();


	useEffect(() => {
		// guild.getNFTProposals().then((res:any) => {
		// 	setProposals(parseProposals(res));
		// 	});
		const parsedProposals = parseProposals("16afc96a3d588894e6e01719d2e266e836e389024ef666094304ccf46e3074a3;0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;0;true;false;27d550eafb23b95ed6067beca0d5bcf47da6cd255a1b387f96eadf156b793f21;0x70997970C51812dc3A010C7d01b50e0d17dc79C8;1;false;true");
		console.log(parsedProposals);
		setProposals(parsedProposals);
	},[]);

	// "16afc96a3d588894e6e01719d2e266e836e389024ef666094304ccf46e3074a3;0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;0;true;false;27d550eafb23b95ed6067beca0d5bcf47da6cd255a1b387f96eadf156b793f21;0x70997970C51812dc3A010C7d01b50e0d17dc79C8;1;true;false";

	function parseProposals(proposals:string) {
		const ret = [];
		const tokens = proposals.split(';');
		for(let i=0 ; i<tokens.length ; i+=5) {
			const proposal = {
				id:0,
				hash:tokens[i],
				contractAddress:tokens[i+1],
				nftId:tokens[i+2],
				option:tokens[i+3]==="true"?"supply":"dispose",
				done:tokens[i+4]==="true"?true:false
			}
			ret.push(proposal);
		}

		return ret;
	}


	const goBack = () => {
		navigate(-1);
	}

	const supplyNFT = () => {
	}


  return (
		<div style={{position:"absolute", zIndex:"4", left:"330px", top:"100px", width:"640px", height:"570px"}}>
      <div onClick={goBack}><img alt="g1" src={require("../image/back-button.png")} style={{position:"absolute", left:"20px", top:"15px", width:"157px", height:"21px"}}/></div>
			<Typography variant="h4" style={{position:"absolute", left:"30px", top:"45px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"Poll List"}</Typography>
			<div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", overflow:"auto", position:"absolute", left:"0px", top:"100px", width:"640px", height:"470px"}}>
				{proposals.map((data:any) => {
					return <PollCard {...data} key={data.hash} />;
				})}
			</div>
		</div>
    );
};

// <Link to={"/Guild/supplyNFT"}>

export default PollList;