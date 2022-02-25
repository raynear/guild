import config from './config';
import { KIP7_ABI,Guild_ABI } from './ABI';

import { useRecoilValue } from 'recoil';
import { accountState } from '../recoil/atoms'

import membership from './membership';
import collection from './collection';

export class Token {
	address:string;
	// account:string;
	// account = useRecoilValue(accountState);

	constructor(address:string) {
		this.address = address;
	}

	async approve(from:string, spender:string, amount:number) {
		const token = new window.caver.klay.Contract(KIP7_ABI, this.address);
		const name = await token.methods.approve(spender, amount).send({from:from, gas:3000000});

		return name;
	}

	async getBalance(account:string) {
		const token = new window.caver.klay.Contract(KIP7_ABI, this.address);
		return await token.methods.balanceOf(account).call();
	}
}

const token = new Token(config.TokenContractAddress);

export default token;