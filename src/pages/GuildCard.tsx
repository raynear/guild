import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

import {Card, CardContent, Grid, Typography} from '@mui/material';

import guild from '../util/guild';
import collection from '../util/collection';
import membership from '../util/membership';

import {useRecoilValue} from 'recoil';
import {accountState} from '../recoil/atoms';

const GuildCard = (props:any) => {
  const [guildInfo, setGuildInfo] = useState({ItemOwnedCnt:0, BalanceInKlay:0, GuildRevenue:0, TotalMembershipNFTCnt:0});
  const [userInfo, setUserInfo] = useState({UserRevenue:0, UserMembershipNFTCnt:0});

  const account = useRecoilValue(accountState);

  useEffect(() => {
    guild.getGuildRevenue().then(result => setGuildInfo({...guildInfo, GuildRevenue:result}));
    guild.getMemberRevenue(account).then(result => setUserInfo({...userInfo, UserRevenue:result}));
    collection.getBalance(props.address).then(result => setGuildInfo({...guildInfo, ItemOwnedCnt:result}));
    membership.getBalance(account).then(result => setUserInfo({...userInfo, UserMembershipNFTCnt:result}));
    window.caver.klay.getBalance(props.address).then((result:any) => setGuildInfo({...guildInfo, BalanceInKlay:window.caver.utils.fromPeb(result, "KLAY")}));
  },[])

  console.log(guildInfo);
  console.log(userInfo);

  function shorten(str:string, len:number) {
    if(str.length > len) {
      return str.substring(0, len/2+1) + "..." + str.substring(len/2+1, len);
    }
    return str;
  }

  return (
    <Link to={"/Guild/"+props.address}>
      <div style={{position:"relative", left:"25px", width:"601px", height:"134px"}}>
        <img alt="guild summary" src={require("../image/guild_list_item.png")} style={{width:"601px", height:"134px"}}/>
        <Typography variant="h5" style={{textShadow:"-1px -1px #412220, 0px -0px #412220, -0px 0px #412220, 0px 0px #412220", color:"#7f433d", position:"absolute", left:"15px", top:"12px"}}>{props.name}</Typography>
        <Typography variant="caption" style={{textShadow:"-1px -1px #412220, 0px -0px #412220, -0px 0px #412220, 0px 0px #412220", color:"#7f433d", position:"absolute", left:"495px", top:"12px"}}>{shorten(props.address, 10)}</Typography>
        <Typography variant="caption" style={{textShadow:"-1px -1px #412220, 0px -0px #412220, -0px 0px #412220, 0px 0px #412220", color:"#7f433d", position:"absolute", right:"15px", top:"35px"}}>{"MEMBERSHIP NFTs (TOTAL: "+guildInfo.TotalMembershipNFTCnt+" / MY: "+userInfo.UserMembershipNFTCnt+")"}</Typography>
        <img alt="emblem" width="80" src="/assets/guild2.png" style={{position:"absolute", left:"17px", top:"60px", width:"60px", height:"60px"}} />
        <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"120px", top:"85px"}}>{guildInfo.ItemOwnedCnt}</Typography>
        <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"230px", top:"85px"}}>{guildInfo.BalanceInKlay}</Typography>
        <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"340px", top:"85px"}}>{guildInfo.GuildRevenue}</Typography>
        <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"480px", top:"85px"}}>{userInfo.UserRevenue}</Typography>
      </div>
    </Link>
  );
};

export default GuildCard;