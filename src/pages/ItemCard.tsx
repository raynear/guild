import React, { useState } from 'react';
import {Link, useParams} from "react-router-dom";

import {Typography} from '@mui/material';

const ItemCard = (props:any) => {
  // const [name, setName] = useState('');

  const {id} = useParams();

  return (
    <Link to={"/Guild/"+id+"/NFTInfo/"+props.id}>
      <div style={{position:"relative", left:"25px", width:"147px", height:"210px"}}>
        <img alt="guild summary" src={require("../image/card.png")} style={{width:"147px", height:"210px"}}/>
        <img alt="emblem" width="80" src="/assets/guild2.png" style={{position:"absolute", left:"40px", top:"50px", width:"60px", height:"60px"}} />
        <Typography variant="h5" style={{textShadow:"0px 1px #000", color:"#fff", position:"absolute", left:"10px", top:"150px"}}>{props.name}</Typography>
        <Typography variant="caption" style={{textShadow:"-1px -1px #412220, 0px -0px #412220, -0px 0px #412220, 0px 0px #412220", color:"#7f4334d", position:"absolute", left:"10px", top:"180px"}}>{props.due}</Typography>
      </div>
    </Link>
  );
};

export default ItemCard;