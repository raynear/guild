import React, {useEffect, useState} from 'react';


const Home = () => {
	const [account, setAccount] = useState('init');

	useEffect( () => {
		window.caver.klay.getAccounts().then((accounts:any) => {
			console.log(accounts);
			setAccount(accounts[0]);
		});

	// 	if(typeof window.klaytn !== undefined) {
	// 		const klaytn = window['klaytn']

	// 		klaytn.on('accountsChanged', (accounts:any) => {
	// 			setAccount(accounts[0]);
	// 		  });

	// 		if(klaytn._kaikas.isEnabled() === false) {
	// 			try {
	// 				klaytn.enable().then((accounts:any) => {
	// 					setAccount(accounts[0]);

	// 					console.log(cav.account);

	// 					// caver.wallet.signMessage(accounts[0], 'test', caver.wallet.keyring.role.roleTransactionKey).then((signature:any) => {
	// 					// 	console.log(signature);
	// 					// });
	// 				})
	// 			  } catch (error) {
	// 				console.error(error)
	// 			  }
	// 		}
	// 	}
	}, [account]);
    return (
        <div>
            <h2>
                {account}
            </h2>
        </div>
    );
};

export default Home;