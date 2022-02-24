import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import config from '../util/config';
import collection from '../util/collection';
import guild from '../util/guild';

const AboutAndRules = () => {
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

	// <Typography variant="subtitle1" style={{position:"absolute", left:"25px", top:"95px", color:"#bcdeef"}}>Enter the contract address and token ID of the NFT to be provided to our guild.</Typography>
  return (
		<div style={{overflow:"scroll", position:"absolute", zIndex:"4", left:"330px", top:"100px", width:"640px", height:"570px"}}>
      <div onClick={goBack}><img alt="g1" src={require("../image/back-button.png")} style={{position:"absolute", left:"20px", top:"15px", width:"157px", height:"21px"}}/></div>
			<Typography variant="h4" style={{position:"absolute", left:"30px", top:"45px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{"About And Rules"}</Typography>
			<div style={{overflow:"scroll", width:"500px", height:"400px"}}>
				<Typography variant="h6" style={{position:"absolute", left:"30px", top:"100px", width:"600px"}}>
					Here in Red Eagles, our primary rule is that we want everyone to have fun and enjoy themselves while playing the game. As such, our cardinal rules concern behavior, first and foremost. Violating these rules will prompt a discussion with an officer; repeated violations can lead to removal from the guild.
					<br/>
					<br/>
					All guild members are expected to be respectful and polite when dealing with other members of the community. Griefing, interfering with other players, and otherwise being a jerk is not permitted.
					Humor is welcome! If someone is offended by a joke, apologize and move on; if you're offended, state that and then move on. There's no need to go into depth on the matter.
					The following topics are off-limits in general guild chat: [TOPICS HERE]
					<br/>
					<br/>
					This is an important thing to consider; if there's a discussion that you just know will go to a bad place or that you don't even want to entertain, talk about it here. Likely candidates include spoilers for recent films/games/shows, major political issues, and whether the toilet paper roll should be under or over.
					Adult language in guild chat is [PERMITTED/NOT PERMITTED/DISCOURAGED].
					All players are expected to treat officers and other guild members with respect and politeness.
					These rules are simply guidelines; it's possible that situations may develop in play which require more specific rules. In the event that an officer makes a rule for a time that's more restrictive than these rules, go by that rule until further notice; if we expect the rule to be in place for an extended period of time, we'll add it in here.
				</Typography>
			</div>
		</div>
    );
};

// <Link to={"/Guild/supplyNFT"}>

export default AboutAndRules;