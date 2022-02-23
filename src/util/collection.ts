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
		const collection = new window.caver.klay.Contract(KIP17_ABI, this.address);
		const balance = await collection.methods.balanceOf(account).call();
		console.log("balance", balance);

		return balance;
	}

	async getItems(account:string) {
		const collection = new window.caver.klay.Contract(KIP17_ABI, this.address);

		const balance = await collection.methods.balanceOf(account).call();

		const ret = [];
		for(let i=0; i<balance; i++) {
			const nft = await collection.methods.tokenOfOwnerByIndex(account, i).call();
			ret.push(nft);
		}

		return ret;
	}

	async getItem(address:string, id:number) {
		const collection = new window.caver.klay.Contract(KIP17_ABI, address);
		return "";
		// const nft = await collection.methods.getItem(id).call();
		// return nft;
	}
}

const collection = new Collection(config.CollectionNFTAddress);

export default collection;