import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams, Outlet } from 'react-router-dom';

import { Typography } from '@mui/material';

import QueryString from 'qs';


const Guild = (props:any) => {
	const [name, setName] = useState('');
	const [qs, setQS] = useState({id:""});

	const navigate = useNavigate();

	const location = useLocation();

	const { id } = useParams();

	const onChangeName = (e:any) => {
		setName(e.target.value);
  };

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
			<Typography variant="h4" style={{position:"absolute", left:"30px", top:"45px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#FFF"}}>My Guilds</Typography>
			<Typography variant="caption" style={{position:"absolute", right:"30px", top:"75px", textShadow:"-2px -2px #36727E, 2px -2px #36727E, -2px 2px #36727E, 2px 2px #36727E", color:"#000"}}>MEMBERSHIP NFTs (TOTAL: 10K / MY: 329)</Typography>
      <img alt="g" src={require("../image/green-rectangle.png")} style={{position:"absolute", left:"500px", top:"50px", width:"95px", height:"21px"}}/>
      <img alt="a" src={require("../image/guild-info-bg.png")} style={{position:"absolute", left:"28px", top:"110px", width:"585px", height:"61px"}}/>
      <img alt="b" src={require("../image/about-rules-button.png")} style={{position:"absolute", left:"28px", top:"190px", width:"188px", height:"48px"}}/>
      <Link to={"/Guild/"+id+"/Inventory"}><img alt="c" src={require("../image/inventory-button.png")} style={{position:"absolute", left:"230px", top:"190px", width:"188px", height:"48px"}}/></Link>
      <Link to={"/Guild/"+id+"/PollList"}><img alt="d" src={require("../image/poll-button.png")} style={{position:"absolute", left:"430px", top:"190px", width:"188px", height:"48px"}}/></Link>
      <img alt="e" src={require("../image/divide-line.png")} style={{position:"absolute", left:"35px", top:"250px", width:"572px", height:"21px"}}/>
      <img alt="f" src={require("../image/create-poll-list.png")} style={{position:"absolute", left:"40px", top:"310px", width:"572x", height:"235px"}}/>

      <Typography variant="caption" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#20420c", position:"absolute", left:"510px", top:"52px"}}>0x99f4…1ead</Typography>
      <img alt="emblem" width="80" src="/assets/guild2.png" style={{position:"absolute", left:"40px", top:"110px", width:"60px", height:"60px"}} />
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"145px", top:"137px"}}>100</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"255px", top:"137px"}}>100</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"365px", top:"137px"}}>100</Typography>
      <Typography variant="h6" style={{textShadow:"0px 0px #aaa, 0px 0px #fff, 0px 1px #777, 0px 0px #fff", color:"#fff", position:"absolute", left:"525px", top:"137px"}}>100</Typography>

			<Link to={"/Guild/"+id+"/CreatePoll/supplyNFT"}><div style={{position:"absolute", left:"40px", top:"310px", width:"555px", height:"58px"}} onClick={supplyNFT}/></Link>
			<Link to={"/Guild/"+id+"/CreatePoll/disposeNFT"}><div style={{position:"absolute", left:"40px", top:"367px", width:"555px", height:"58px"}} onClick={disposeNFT}/></Link>
			<Link to={"/Guild/"+id+"/CreatePoll/changeRentConditionNFT"}><div style={{position:"absolute", left:"40px", top:"424px", width:"555px", height:"58px"}} onClick={changeRentCondition}/></Link>
			<Link to={"/Guild/"+id+"/CreatePoll/dividend"}><div style={{position:"absolute", left:"40px", top:"480px", width:"555px", height:"58px"}} onClick={dividend}/></Link>
		</div>
    );
};

// <Link to={"/Guild/supplyNFT"}>

export default Guild;