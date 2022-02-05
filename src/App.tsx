import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import MyAccount from './pages/MyAccount';
import Discover from './pages/Discover';
import RentNFT from './pages/RentNFT';

function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [value, setValue] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    // setTimeout(function() { //Start the timer
    const enable = window.klaytn._kaikas.isEnabled();
    console.log("isEnabled : ", enable);
    // if(enable) {
      setIsEnabled(enable);
      window.klaytn._kaikas.isApproved().then((approved: any) => {
        console.log("isApproved : ", approved);
      });
      window.klaytn._kaikas.isUnlocked().then((unlocked: any) => {
        console.log("isUnlocked: ", unlocked);
        if(unlocked) {
          setIsEnabled(unlocked);
        }
      });
    // }
    // setIsEnabled(enable && unlock);
  // }, 50)
  },[]);

  async function connect() {
    await window.klaytn.enable(false);
    console.log(window.klaytn._kaikas.isEnabled());
    // window.location.reload();
  }

  function tabPush(e:any, value:any) {
    console.log("tabPush");
    setValue(value);
    switch(value) {
      case 0:
        navigate('/myAccount');
        break;
      case 1:
        navigate('/discover');
        break;
      case 2:
        navigate('/rentNFT');
        break;
      default:
        navigate('/myAccount');
        break;
    }
  }

  if(isEnabled === false) {
    return (
      <div>
          <button onClick={connect}>connect</button>
      </div>
    );
  } else {
    return (
      <div style={{height:"100%", display:"flex", alignItems:"center", backgroundColor:"#88aa88", justifyContent:"center"}}>
        <div style={{width:"60%", height:"60%", backgroundColor:"#88cc88", borderRadius:"25px"}}>
        <Tabs value={value} onChange={tabPush} aria-label="basic tabs example">
          <Tab label="myAccount"/>
          <Tab label="discover"/>
          <Tab label="rentNFT"/>
        </Tabs>
        <Routes>
          <Route path="/" element={<MyAccount/>} />
          <Route path="/myAccount" element={<MyAccount/>} />
          <Route path="/discover" element={<Discover/>} />
          <Route path="/rentNFT" element={<RentNFT/>} />
        </Routes>
        </div>
      </div>
    );
  }
}

export default App;