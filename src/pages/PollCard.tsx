import React, { useState } from 'react';
import {Link, useParams} from "react-router-dom";

import {Typography} from '@mui/material';

import {shorten} from '../util/util';

const PollCard = (props:any) => {
  const [name, setName] = useState('');

  const {id} = useParams();

  const onChangeName = (e:any) => {
    setName(e.target.value);
  };

  // console.log(props);

  switch(props.done) {
    case "in progress":
      return (<Link to={"/Guild/"+id+"/Poll/"+props.id}>
        <div style={{position:"relative", left:"25px", width:"147px", height:"210px"}}>
          <img alt="guild summary" src={require("../image/card.png")} style={{width:"147px", height:"210px"}}/>
          <img alt="emblem" width="80" src="/assets/guild2.png" style={{position:"absolute", left:"40px", top:"50px", width:"60px", height:"60px"}} />
          {props.option==="supply"?<img alt="supply" width="80" src={require("../image/supply.png")} style={{position:"absolute", left:"10px", top:"130px", width:"60px", height:"23px"}} />:<></>}
          {props.option==="dispose"?<img alt="dispose" width="80" src={require("../image/dispose.png")} style={{position:"absolute", left:"10px", top:"130px", width:"60px", height:"23px"}} />:<></>}
          {props.option==="change"?<img alt="change" width="80" src={require("../image/change.png")} style={{position:"absolute", left:"10px", top:"130px", width:"60px", height:"23px"}} />:<></>}
          {props.option==="divide"?<img alt="change" width="80" src={require("../image/divide.png")} style={{position:"absolute", left:"10px", top:"130px", width:"60px", height:"23px"}} />:<></>}
          <Typography variant="h5" style={{textShadow:"0px 1px #000", color:"#fff", position:"absolute", left:"10px", top:"150px"}}>{shorten(props.content, 8)}</Typography>
          <Typography variant="caption" style={{textShadow:"-1px -1px #412220, 0px -0px #412220, -0px 0px #412220, 0px 0px #412220", color:"#7f4334d", position:"absolute", left:"10px", top:"180px"}}>{props.done}</Typography>
        </div>
      </Link>);
    case "approved":
      if(props.option==="supply") {
        return (<Link to={"/Guild/"+id+"/Supply/"+props.id}>
          <div style={{position:"relative", left:"25px", width:"147px", height:"210px"}}>
            <img alt="guild summary" src={require("../image/card.png")} style={{width:"147px", height:"210px"}}/>
            <img alt="emblem" width="80" src="/assets/guild2.png" style={{position:"absolute", left:"40px", top:"50px", width:"60px", height:"60px"}} />
            <img alt="supply" width="80" src={require("../image/supply.png")} style={{position:"absolute", left:"10px", top:"130px", width:"60px", height:"23px"}} />
            <Typography variant="h5" style={{textShadow:"0px 1px #000", color:"#fff", position:"absolute", left:"10px", top:"150px"}}>{shorten(props.content, 8)}</Typography>
            <Typography variant="caption" style={{textShadow:"-1px -1px #412220, 0px -0px #412220, -0px 0px #412220, 0px 0px #412220", color:"#7f4334d", position:"absolute", left:"10px", top:"180px"}}>{props.done}</Typography>
          </div>
        </Link>);
      } else if(props.option === "dispose") {
        return (<Link to={"/Guild/"+id+"/Dispose/"+props.id}>
          <div style={{position:"relative", left:"25px", width:"147px", height:"210px"}}>
            <img alt="guild summary" src={require("../image/card.png")} style={{width:"147px", height:"210px"}}/>
            <img alt="emblem" width="80" src="/assets/guild2.png" style={{position:"absolute", left:"40px", top:"50px", width:"60px", height:"60px"}} />
            <img alt="dispose" width="80" src={require("../image/dispose.png")} style={{position:"absolute", left:"10px", top:"130px", width:"60px", height:"23px"}} />
            <Typography variant="h5" style={{textShadow:"0px 1px #000", color:"#fff", position:"absolute", left:"10px", top:"150px"}}>{shorten(props.content, 8)}</Typography>
            <Typography variant="caption" style={{textShadow:"-1px -1px #412220, 0px -0px #412220, -0px 0px #412220, 0px 0px #412220", color:"#7f4334d", position:"absolute", left:"10px", top:"180px"}}>{props.done}</Typography>
          </div>
        </Link>);
      }
      else {
        return <></>;
      }
    case "disapproved":
      return (<div style={{position:"relative", left:"25px", width:"147px", height:"210px"}}>
        <img alt="guild summary" src={require("../image/card.png")} style={{width:"147px", height:"210px"}}/>
        <img alt="emblem" width="80" src="/assets/guild2.png" style={{position:"absolute", left:"40px", top:"50px", width:"60px", height:"60px"}} />
        {props.option==="supply"?<img alt="supply" width="80" src={require("../image/supply.png")} style={{position:"absolute", left:"10px", top:"130px", width:"60px", height:"23px"}} />:<></>}
        {props.option==="dispose"?<img alt="dispose" width="80" src={require("../image/dispose.png")} style={{position:"absolute", left:"10px", top:"130px", width:"60px", height:"23px"}} />:<></>}
        {props.option==="change"?<img alt="change" width="80" src={require("../image/change.png")} style={{position:"absolute", left:"10px", top:"130px", width:"60px", height:"23px"}} />:<></>}
        {props.option==="divide"?<img alt="change" width="80" src={require("../image/divide.png")} style={{position:"absolute", left:"10px", top:"130px", width:"60px", height:"23px"}} />:<></>}
        <Typography variant="h5" style={{textShadow:"0px 1px #000", color:"#fff", position:"absolute", left:"10px", top:"150px"}}>{shorten(props.content, 8)}</Typography>
        <Typography variant="caption" style={{textShadow:"-1px -1px #412220, 0px -0px #412220, -0px 0px #412220, 0px 0px #412220", color:"#7f4334d", position:"absolute", left:"10px", top:"180px"}}>{props.done}</Typography>
      </div>)
    default:
      return (<div></div>);
  }
};

export default PollCard;