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
		console.log("collection:getBalance");
		console.log(account);
		const collection = new window.caver.klay.Contract(KIP17_ABI, this.address);
		console.log("a");
		const balance = await collection.methods.balanceOf(account).call();
		console.log("b", balance);

		return balance;
	}
}

const collection = new Collection(config.CollectionNFTAddress);

export default collection;