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
import SupplyNFT from './pages/SupplyNFT';
import DisposeNFT from './pages/DisposeNFT';
import Dividend from './pages/Dividend';

import Image from './image/BackGround-Cloud.png';
import Cloud from './image/cloud.png';

import useInterval from './util/util';

import {accountState} from './recoil/atoms';

function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [correctNetwork, setCorrectNetwork] = useState(true);
  const setAccount = useSetRecoilState(accountState);

  useInterval(() => {
    window.klaytn._kaikas.isUnlocked().then((unlocked: any) => {
      setIsEnabled(unlocked);
    })
    if(window.klaytn.networkVersion !== 1001) {
        console.log("network version incorrect", window.klaytn.networkVersion);
        setCorrectNetwork(false);
    }
  }, 1000);

  // setTimeout(function() { //Start the timer
  useEffect(() => {
    window.klaytn.on('accountsChanged', (accounts:any) => {
      console.log('account changed', accounts);
      setAccount(accounts[0]);
    });

    window.klaytn.on('networkChanged', (network:any) => {
      console.log('network changed', network);
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
    if(window.klaytn.networkVersion !== 1001) {
        console.log("network version incorrect", window.klaytn.networkVersion);
        // setCorrectNetwork(false);
        setCorrectNetwork(true);
    }
  },[setAccount]);

  async function connect() {
    await window.klaytn.enable(false);
    console.log(window.klaytn._kaikas.isEnabled());
    window.location.reload();
  }

  if(correctNetwork === false) {
    return(
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
          <h3>Change Klaytn Network to Baobab</h3>
        </div>
      </div>
    );
  } else if(isEnabled === false) {
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
              <Route path="CreatePoll" element={<CreatePoll />} />
              <Route path="SupplyNFT" element={<SupplyNFT />} />
              <Route path="DisposeNFT" element={<DisposeNFT />} />
              <Route path="Dividend" element={<Dividend />} />
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