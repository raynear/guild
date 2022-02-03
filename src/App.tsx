import React, { useEffect, useState } from 'react';
import Home from './pages/unuse/Home';
import About from './pages/unuse/About';
import MyAccount from './pages/MyAccount';
import Discover from './pages/Discover';
import RentNFT from './pages/RentNFT';
import { Routes, Route, Link } from 'react-router-dom';


function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
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
      <div>
      <ul>
        <li><Link to="/myAccount"><h3>myAccount</h3></Link></li>
        <li><Link to="/discover"><h3>discover</h3></Link></li>
        <li><Link to="/rentNFT"><h3>rentNFT</h3></Link></li>
      </ul>
      <Routes>
        <Route path="/myAccount" element={<MyAccount/>} />
        <Route path="/discover" element={<Discover/>} />
        <Route path="/rentNFT" element={<RentNFT/>} />
      </Routes>
</div>
    );
  }
}

export default App;