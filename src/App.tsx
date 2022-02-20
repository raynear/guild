import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import MyAccount from './pages/MyAccount';
import Discover from './pages/Discover';
import RentNFT from './pages/RentNFT';

import My from './pages/My';
import GuildList from './pages/GuildList';
import Guild from './pages/Guild';
import Inventory from './pages/Inventory';
import Poll from './pages/Poll';
import PollList from './pages/PollList';
import CreatePoll from './pages/CreatePoll';
import NFTInfo from './pages/NFTInfo';

import Image from './image/BackGround-Cloud.png';
import Cloud from './image/cloud.png';

import useInterval from './util/util';

import {accountState} from './recoil/atoms';

function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const setAccount = useSetRecoilState(accountState);

  useInterval(() => {
    window.klaytn._kaikas.isUnlocked().then((unlocked: any) => {
      setIsEnabled(unlocked);
    })
  }, 5000);

  // setTimeout(function() { //Start the timer
  useEffect(() => {
    window.klaytn.on('accountsChanged', (accounts:any) => {
      console.log('account changed', accounts);
      setAccount(accounts[0]);
    });

    window.caver.klay.getAccounts().then((accounts:any) => {
			setAccount(accounts[0]);
		});

    const enable = window.klaytn._kaikas.isEnabled();
    console.log("isEnabled : ", enable);
    if(enable) {
      window.klaytn._kaikas.isApproved().then((approved: any) => {
        console.log("isApproved : ", approved);
      });
      window.klaytn._kaikas.isUnlocked().then((unlocked: any) => {
        console.log("isUnlocked: ", unlocked);
        setIsEnabled(unlocked);
      });
    }
  },[setAccount]);

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
          <Route path="/" element={<MyAccount/>} >
            <Route index element={<GuildList />} />
            <Route path="Guild/:id" element={<My />}>
              <Route index element={<Guild />} />
              <Route path="Poll/:pollId" element={<Poll />} />
              <Route path="PollList" element={<PollList />} />
              <Route path="CreatePoll/:pollType" element={<CreatePoll />} />
              <Route path="Inventory" element={<Inventory />} />
              <Route path="NFTInfo/:nftId" element={<NFTInfo />} />
            </Route>
          </Route>
          <Route path="Discover" element={<Discover/>} />
          <Route path="RentNFT" element={<RentNFT/>} />
        </Routes>
        </div>
      </div>
    );
  }
}

export default App;