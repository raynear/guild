import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import MyAccount from './pages/MyAccount';
import Discover from './pages/Discover';
import RentNFT from './pages/RentNFT';

import Image from './image/BackGround-Cloud.png';
import Cloud from './image/cloud.png';

function App() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // setTimeout(function() { //Start the timer
    const enable = window.klaytn._kaikas.isEnabled();
    console.log("isEnabled : ", enable);
    if(enable) {
      setIsEnabled(enable);
      window.klaytn._kaikas.isApproved().then((approved: any) => {
        console.log("isApproved : ", approved);
      });
      window.klaytn._kaikas.isUnlocked().then((unlocked: any) => {
        console.log("isUnlocked: ", unlocked);
        if(unlocked === false) {
          setIsEnabled(unlocked);
        }
      });
    }
    // setIsEnabled(enable && unlock);
  // }, 50)
  },[]);

  async function connect() {
    await window.klaytn.enable(false);
    console.log(window.klaytn._kaikas.isEnabled());
    window.location.reload();
  }

  if(isEnabled === false) {
    return (
      <div style={{
        height:"100%",
        width:"100%",
        textAlign:"center",
        verticalAlign:"middle",
        alignItems:"center",
        justifyContent:"center",
        backgroundImage: `url(${Image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
        <div style={{
          position:"absolute",
          left:"50%",
          top:"50%",
          transform: "translateX(-50%) translateY(-50%)",
        }}>
          <img alt="title" src={require('./image/title.png')} style={{width:"580px", height:"285px"}}/>
        </div>
        <div style={{
          position:"absolute",
          left:"50%",
          top:"50%",
          transform: "translate(-50%, calc(-50% + 225px))",
        }}>
          <div onClick={connect}><img alt="title" src={require('./image/login-button.png')} style={{width:"480px", height:"114px"}}/></div>
        </div>
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
        <img alt="cloud" src={Cloud} style={{width:"600px", height:"300px", position:"absolute", top:`calc(100% - 300px)`, left:"0%", zIndex:5}}/>
        <div style={{width:"978px", height:"690px"}}>
        <Routes>
          <Route path="/" element={<MyAccount/>} />
          <Route path="/MyAccount" element={<MyAccount/>} />
          <Route path="/Discover" element={<Discover/>} />
          <Route path="/RentNFT" element={<RentNFT/>} />
        </Routes>
        </div>
      </div>
    );
  }
}

export default App;