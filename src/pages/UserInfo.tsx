import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';

import { Avatar, Grid, Box, Button, Typography } from '@mui/material';

import config from '../util/config';
import { KIP17_ABI, Guild_ABI } from '../util/ABI';

import { useRecoilValue } from 'recoil';
import { accountState } from '../recoil/atoms';

import collection from '../util/collection';
import membership from '../util/membership';
import guild from '../util/guild';

const UserInfo = () => {
	const [userRevenue, setUserRevenue] = useState(0);
	const [userMembershipNFTCnt, setUserMembershipNFTCnt] = useState(0);
	const account = useRecoilValue(accountState);
	const { id } = useParams();
	// const [account , b] = useRecoilState(accountState);
	// const account = '0x0000';

	useEffect(() => {
		console.log("aaaa", account);
		collection.getBalance(account).then(result => {
			console.log("collection balance", result);
		});
		membership.getBalance(account).then(result => {
			console.log("membership balance", result);
			// setValue({memberRevenue:value.memberRevenue, membershipNFT:result});
			setUserMembershipNFTCnt(result);
		});

		guild.getMemberRevenue().then(result => {
			console.log("member revenue", result);
			// setValue({memberRevenue:result, membershipNFT:value.membershipNFT});
			setUserRevenue(result);
		});

		// window.caver.klay.getAccounts().then((accounts:any) => {
		// 	setAccount(accounts[0]);
		// 	// const myContract = new window.caver.klay.Contract(KIP17_ABI, config.MembershipNFTAddress);
		// });

		const myContract = new window.caver.klay.Contract(Guild_ABI, config.GuildContractAddress);
		myContract.methods.guildName().call().then((result:any) => {
			console.log(result);
		});
	}, [])

		console.log(account);

	return (
	<div style={{position:"absolute", zIndex:"4"}}>
		<Typography variant="h5" style={{position:"absolute", left:"180px", top:"155px", transform:"translate(-50%, -50%)", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{account.substring(0, 6)+"..."+account.substring(38)}</Typography>
		<Typography variant="h5" style={{position:"absolute", left:"180px", top:"285px", transform:"translate(-50%, -50%)", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{userMembershipNFTCnt}</Typography>
		<Typography variant="h5" style={{position:"absolute", left:"180px", top:"395px", transform:"translate(-50%, -50%)", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{userRevenue}</Typography>
		{id===undefined?<></>:<Link to={"/Guild/"+id+"/MyInventory"} style={{position:"absolute", left:"13px", top:"440px", width:"306px", height:"44px"}}><img alt="my inventory" style={{width:"306px", height:"44px"}} src={require('../image/my-inventory.png')}/></Link>}
	</div>
	);
};

export default UserInfo;