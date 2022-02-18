import React, { useState } from 'react';
import {Link} from "react-router-dom";

import {Card, CardContent, Grid, Typography} from '@mui/material';

const GuildCard = (props:any) => {
  const [name, setName] = useState('');

  const onChangeName = (e:any) => {
    setName(e.target.value);
  };

  return (
    <Link to={"/Guild/"+props.address}>
      <div style={{position:"relative", left:"25px", width:"601px", height:"134px"}}>
        <img alt="guild summary" src={require("../image/guild_list_item.png")} style={{width:"601px", height:"134px"}}/>
        <Typography variant="h5" style={{textShadow:"-1px -1px #412220, 0px -0px #412220, -0px 0px #412220, 0px 0px #412220", color:"#7f433d", position:"absolute", left:"15px", top:"12px"}}>{props.name}</Typography>
        <Typography variant="caption" style={{textShadow:"-1px -1px #412220, 0px -0px #412220, -0px 0px #412220, 0px 0px #412220", color:"#7f433d", position:"absolute", left:"495px", top:"12px"}}>{"0xasdkhfalskdf"}</Typography>
        <Typography variant="caption" style={{textShadow:"-1px -1px #412220, 0px -0px #412220, -0px 0px #412220, 0px 0px #412220", color:"#7f433d", position:"absolute", left:"340px", top:"35px"}}>{"MEMBERSHIP NFTs (TOTAL: 10K / MY: 329)"}</Typography>
        <img alt="emblem" width="80" src="/assets/guild2.png" style={{position:"absolute", left:"17px", top:"60px", width:"60px", height:"60px"}} />
        <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"120px", top:"85px"}}>100</Typography>
        <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"230px", top:"85px"}}>200</Typography>
        <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"340px", top:"85px"}}>300</Typography>
        <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"480px", top:"85px"}}>400</Typography>
      </div>
    </Link>
  );
};

export default GuildCard;