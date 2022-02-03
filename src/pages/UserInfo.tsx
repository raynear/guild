import React, { useEffect, useState } from 'react';

const UserInfo = () => {
	const [account, setAccount] = useState('');

	useEffect( () => {
		window.caver.klay.getAccounts().then((accounts:any) => {
			setAccount(accounts[0]);
		})
	})

    return (
		<div>
			<div>
				<h2>
					{account}
				</h2>
				<h4>
					user balance
				</h4>
			</div>
		</div>
    );
};

export default UserInfo;