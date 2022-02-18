import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams, Outlet } from 'react-router-dom';

import { Typography } from '@mui/material';

import QueryString from 'qs';


const My = (props:any) => {
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
		<Outlet/>
    );
};

// <Link to={"/Guild/supplyNFT"}>

export default My;