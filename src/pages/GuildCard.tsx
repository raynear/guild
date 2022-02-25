import React, { useState, useEffect } from 'react';
import {Link, useParams} from "react-router-dom";

import {Card, CardContent, Grid, Typography} from '@mui/material';

import {Guild} from '../util/guild';
import collection from '../util/collection';
import membership from '../util/membership';
import token from '../util/token';

import {shorten} from '../util/util';
import config from '../util/config';

import {useRecoilValue} from 'recoil';
import {accountState} from '../recoil/atoms';

const GuildCard = (props:any) => {

  const [name, setName] = useState('');
	const [itemOwnedCnt, setItemOwnedCnt] = useState(0);
	const [balanceInKlay, setBalanceInKlay] = useState(0);
	const [guildRevenue, setGuildRevenue] = useState(0);
	const [userRevenue, setUserRevenue] = useState(0);
	const [userMembershipNFTCnt, setUserMembershipNFTCnt] = useState(0);

  const account = useRecoilValue(accountState);

  useEffect(() => {
    // guild.getGuildRevenue().then(result => setGuildInfo({...guildInfo, GuildRevenue:result}));
    // guild.getMemberRevenue().then(result => setUserInfo({...userInfo, UserRevenue:result}));
    // collection.getBalance(props.address).then(result => setGuildInfo({...guildInfo, ItemOwnedCnt:result}));
    // membership.getBalance(account).then(result => setUserInfo({...userInfo, UserMembershipNFTCnt:result}));
    // window.caver.klay.getBalance(props.address).then((result:any) => setGuildInfo({...guildInfo, BalanceInKlay:window.caver.utils.fromPeb(result, "KLAY")}));
    load();
  },[])

	async function load() {
    const guild = new Guild(props.address);
		let result = await guild.getGuildName();//.then((result:any) => setName(result));
		setName(result);
    result = await guild.getGuildRevenue();//.then((result:any) => setGuildInfo({...guildInfo, GuildRevenue:result}));
		setGuildRevenue(result);
    result = await guild.getMemberRevenue();//.then((result:any) => setUserInfo({...userInfo, UserRevenue:result}));
		setUserRevenue(result);
    result = await collection.getBalance(props.address as string);//.then((result:any) => setGuildInfo({...guildInfo, ItemOwnedCnt:result}));
		setItemOwnedCnt(result);
    result = await membership.getBalance(account);//.then((result:any) => setUserInfo({...userInfo, UserMembershipNFTCnt:result}));
		setUserMembershipNFTCnt(result);
    result = await token.getBalance(props.address);//.then((result:any) => setGuildInfo({...guildInfo, BalanceInKlay:parseFloat(window.caver.utils.fromPeb(result, "KLAY"))}));
    console.log("balance", result);
		setBalanceInKlay(parseFloat(window.caver.utils.fromPeb(result, "KLAY")));
	}

  console.log(props);

  return (
    <Link to={"/Guild/"+props.address}>
      <div style={{position:"relative", left:"25px", width:"601px", height:"134px"}}>
        <img alt="guild summary" src={require("../image/guild_list_item.png")} style={{width:"601px", height:"134px"}}/>
        <Typography variant="h5" style={{textShadow:"-1px -1px #412220, 0px -0px #412220, -0px 0px #412220, 0px 0px #412220", color:"#7f433d", position:"absolute", left:"15px", top:"12px"}}>{props.name}</Typography>
        <Typography variant="caption" style={{textShadow:"-1px -1px #412220, 0px -0px #412220, -0px 0px #412220, 0px 0px #412220", color:"#7f433d", position:"absolute", left:"495px", top:"12px"}}>{shorten(props.address, 10)}</Typography>
        <Typography variant="caption" style={{textShadow:"-1px -1px #412220, 0px -0px #412220, -0px 0px #412220, 0px 0px #412220", color:"#7f433d", position:"absolute", right:"15px", top:"35px"}}>{"MY MEMBERSHIP NFTs : "+userMembershipNFTCnt}</Typography>
        <img alt="emblem" width="80" src="/assets/guild2.png" style={{position:"absolute", left:"17px", top:"60px", width:"60px", height:"60px"}} />
        <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"120px", top:"85px"}}>{itemOwnedCnt}</Typography>
        <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"230px", top:"85px"}}>{balanceInKlay}</Typography>
        <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"340px", top:"85px"}}>{guildRevenue}</Typography>
        <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"480px", top:"85px"}}>{userRevenue}</Typography>
      </div>
    </Link>
  );
};

export default GuildCard;