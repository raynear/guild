import config from './config';
import { KIP17_ABI } from './ABI';

import { useRecoilValue } from 'recoil';
import { accountState } from '../recoil/atoms'

export class Collection {
	address:string;
	// account = useRecoilValue(accountState);

	constructor(address:string) {
		this.address = address;
	}

	async setCollectionName(account:string, name:string) {
		const collection = new window.caver.klay.Contract(KIP17_ABI, config.CollectionNFTAddress);
		collection.methods.setGuildName(name).send({from:account, gas:3000000});
	}

	async getBalance(account:string) {
		console.log(account);
		const membership = new window.caver.klay.Contract(KIP17_ABI, this.address);
		const balance = await membership.methods.balanceOf(account).call();

		return balance;
	}
}

const collection = new Collection(config.CollectionNFTAddress);

export default collection;