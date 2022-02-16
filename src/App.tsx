import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import MyAccount from './pages/MyAccount';
import Discover from './pages/Discover';
import RentNFT from './pages/RentNFT';

import Image from './image/sky.jpeg';
import Cloud from './image/cloud.png';

function App() {
  const [isEnabled, setIsEnabled] = useState(false);

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

  if(isEnabled === false) {
    return (
      <div>
          <button onClick={connect}>connect</button>
      </div>
    );
  } else {
    return (
      <div style={{
        height:"100%",
        display:"flex",
        alignItems:"center",
        backgroundColor:"#88aa88",
        justifyContent:"center",
        backgroundImage: `url(${Image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
        <img alt="cloud" src={require('./image/cloud.png')} style={{width:"600px", height:"300px", position:"absolute", top:`calc(100% - 300px)`, left:"0%", zIndex:5}}/>
        <div style={{width:"978px", height:"690px"}}>
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