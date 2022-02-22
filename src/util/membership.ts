import config from './config';
import { KIP17_ABI } from './ABI';

import { useRecoilValue } from 'recoil';
import { accountState } from '../recoil/atoms'

export class Membership{
	address:string;
	// account = useRecoilValue(accountState);

	constructor(address:string) {
		this.address = address;
	}

	async getBalance(account:string) {
		const membership = new window.caver.klay.Contract(KIP17_ABI, this.address);
		console.log("raynear");
		const balance = await membership.methods.balanceOf(account).call();
		console.log(balance);

		return balance;
	}
}

const membership = new Membership(config.MembershipNFTAddress);

export default membership;