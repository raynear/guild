import React, { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import { Routes, Route } from 'react-router-dom';


function App() {
  useEffect(() => {
     window.caver.klay.getAccounts().then((accounts:any) => {
      console.log(accounts);
    });
    // const walletFromSession = sessionStorage.getItem('walletInstance')

    // // 'walletInstance'에 값이 있으면 caver 지갑에 추가합니다.
    // if (walletFromSession) {
    //   try {
    //     cav.klay.accounts.wallet.add(JSON.parse(walletFromSession))
    //   } catch (e) {
    //     // sessionStorage에 있는 값이 유효하지 않은 지갑 인스턴스이면 sessionStorage에서 제거합니다.
    //     sessionStorage.removeItem('walletInstance')

    //   }
    // }
  },[]);
        return (
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
              </Routes>
        );
}

export default App;