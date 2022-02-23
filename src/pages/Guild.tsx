import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams, Outlet } from 'react-router-dom';

import {useRecoilValue} from 'recoil';
import {accountState} from '../recoil/atoms';

import { Typography } from '@mui/material';

import config from '../util/config';

import guild from '../util/guild';
import membership from '../util/membership';
import collection from '../util/collection';

const Guild = (props:any) => {
	const [name, setName] = useState('');
	const [itemOwnedCnt, setItemOwnedCnt] = useState(0);
	const [balanceInKlay, setBalanceInKlay] = useState(0);
	const [guildRevenue, setGuildRevenue] = useState(0);
	const [userRevenue, setUserRevenue] = useState(0);
	const [userMembershipNFTCnt, setUserMembershipNFTCnt] = useState(0);
	// const [guildInfo, setGuildInfo] = useState({ItemOwnedCnt:0, BalanceInKlay:0, GuildRevenue:0, TotalMembershipNFTCnt:0});
  // const [userInfo, setUserInfo] = useState({UserRevenue:0, UserMembershipNFTCnt:0});

  const account = useRecoilValue(accountState);

	const navigate = useNavigate();
	const { id } = useParams();

  useEffect(() => {
		console.log("raynear", account);
		console.log("props", id);
		load();
		// guild.getGuildName().then((result:any) => setName(result));
    // guild.getGuildRevenue().then((result:any) => setGuildInfo({...guildInfo, GuildRevenue:result}));
    // guild.getMemberRevenue().then((result:any) => setUserInfo({...userInfo, UserRevenue:result}));
    // collection.getBalance(id as string).then((result:any) => setGuildInfo({...guildInfo, ItemOwnedCnt:result}));
    // membership.getBalance(account).then((result:any) => setUserInfo({...userInfo, UserMembershipNFTCnt:result}));
    // window.caver.klay.getBalance(id).then((result:any) => setGuildInfo({...guildInfo, BalanceInKlay:parseFloat(window.caver.utils.fromPeb(result, "KLAY"))}));
  },[])

	async function load() {
		let result = await guild.getGuildName();//.then((result:any) => setName(result));
		setName(result);
    result = await guild.getGuildRevenue();//.then((result:any) => setGuildInfo({...guildInfo, GuildRevenue:result}));
		setGuildRevenue(result);
    result = await guild.getMemberRevenue();//.then((result:any) => setUserInfo({...userInfo, UserRevenue:result}));
		setUserRevenue(result);
    result = await collection.getBalance(id as string);//.then((result:any) => setGuildInfo({...guildInfo, ItemOwnedCnt:result}));
		setItemOwnedCnt(result);
    result = await membership.getBalance(account);//.then((result:any) => setUserInfo({...userInfo, UserMembershipNFTCnt:result}));
		setUserMembershipNFTCnt(result);
    result = await window.caver.klay.getBalance(id);//.then((result:any) => setGuildInfo({...guildInfo, BalanceInKlay:parseFloat(window.caver.utils.fromPeb(result, "KLAY"))}));
		setBalanceInKlay(parseFloat(window.caver.utils.fromPeb(result, "KLAY")));
	}

	const goBack = () => {
		navigate(-1);
	}

	const supplyNFT = () => {
	}

	const disposeNFT = () => {
	}

	const changeRentCondition = () => {
	}

	const dividend = () => {
	}

  return (
		<div style={{position:"absolute", zIndex:"4", left:"330px", top:"100px", width:"640px", height:"570px"}}>
      <div onClick={goBack}><img alt="g1" src={require("../image/back-button.png")} style={{position:"absolute", left:"20px", top:"15px", width:"157px", height:"21px"}}/></div>
			<Typography variant="h4" style={{position:"absolute", left:"30px", top:"45px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>{name}</Typography>
			<Typography variant="caption" style={{position:"absolute", right:"30px", top:"75px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#000"}}>{"MY MEMBERSHIP NFTs : "+userMembershipNFTCnt}</Typography>
      <img alt="g" src={require("../image/green-rectangle.png")} style={{position:"absolute", left:"500px", top:"50px", width:"110px", height:"21px"}}/>
      <img alt="a" src={require("../image/guild-info-bg.png")} style={{position:"absolute", left:"28px", top:"110px", width:"585px", height:"61px"}}/>
      <img alt="b" src={require("../image/about-rules-button.png")} style={{position:"absolute", left:"28px", top:"190px", width:"188px", height:"48px"}}/>
      <Link to={"/Guild/"+id+"/Inventory"}><img alt="c" src={require("../image/inventory-button.png")} style={{position:"absolute", left:"230px", top:"190px", width:"188px", height:"48px"}}/></Link>
      <Link to={"/Guild/"+id+"/PollList"}><img alt="d" src={require("../image/poll-button.png")} style={{position:"absolute", left:"430px", top:"190px", width:"188px", height:"48px"}}/></Link>
      <img alt="e" src={require("../image/divide-line.png")} style={{position:"absolute", left:"35px", top:"250px", width:"572px", height:"21px"}}/>
      <img alt="f" src={require("../image/create-poll-list.png")} style={{position:"absolute", left:"40px", top:"310px", width:"572x", height:"235px"}}/>

      <Typography variant="caption" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#20420c", position:"absolute", left:"510px", top:"52px"}}>{config.GuildContractAddress.substring(0, 6)+".."+config.GuildContractAddress.substring(37)}</Typography>
      <img alt="emblem" width="80" src="/assets/guild2.png" style={{position:"absolute", left:"40px", top:"110px", width:"60px", height:"60px"}} />
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"145px", top:"137px"}}>{itemOwnedCnt}</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"255px", top:"137px"}}>{balanceInKlay.toFixed(4)}</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"365px", top:"137px"}}>{guildRevenue}</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"525px", top:"137px"}}>{userRevenue}</Typography>

			<Link to={"/Guild/"+id+"/supplyNFT"}><div style={{position:"absolute", left:"40px", top:"310px", width:"555px", height:"58px"}} onClick={supplyNFT}/></Link>
			<Link to={"/Guild/"+id+"/disposeNFT"}><div style={{position:"absolute", left:"40px", top:"367px", width:"555px", height:"58px"}} onClick={disposeNFT}/></Link>
			<Link to={"/Guild/"+id+"/changeRentCondition"}><div style={{position:"absolute", left:"40px", top:"424px", width:"555px", height:"58px"}} onClick={changeRentCondition}/></Link>
			<Link to={"/Guild/"+id+"/dividend"}><div style={{position:"absolute", left:"40px", top:"480px", width:"555px", height:"58px"}} onClick={dividend}/></Link>
		</div>
    );
};

// <Link to={"/Guild/supplyNFT"}>

export default Guild;