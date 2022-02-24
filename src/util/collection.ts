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
			console.log("nft", nft);
			const uri = await collection.methods.tokenURI(nft).call();
			console.log("uri", uri);
			ret.push(nft);
		}

		return ret;
	}

	async hasMethod(contractAddress:string, signature:string) {
		const code = await window.caver.klay.getCode(contractAddress);
		const functionSignature = window.caver.klay.abi.encodeFunctionSignature(signature);
		// remove "0x" prefixed in 0x<4bytes-selector>
		return code.indexOf(functionSignature.slice(2, 34)) > 0;
	}

	async getItem(address:string, id:number) {
		const collection = new window.caver.klay.Contract(KIP17_ABI, address);
		// const nftId = await collection.methods.tokenOfOwnerByIndex(address, id).call();
		// const exist = await this.hasMethod(address, 'tokenURI(uint256)');
		// console.log(exist);
		// if(exist) {
			const nftInfo = await collection.methods.tokenURI(id).call();
			console.log("nftInfo", nftInfo);
			return nftInfo;
		// }
		// else {
		// 	return {};
		// }
		// const nft = await collection.methods.getItem(id).call();
		// return nft;
	}

	async approve(sender:string, address:string, nftId:number) {
		const collection = new window.caver.klay.Contract(KIP17_ABI, this.address);
		collection.methods.approve(address, nftId).send({from:sender, gas:3000000});
	}

	async ownerOf(address:string, nftId:number) {
		const collection = new window.caver.klay.Contract(KIP17_ABI, this.address);
		return collection.methods.ownerOf(nftId).call();
	}
}

const collection = new Collection(config.CollectionNFTAddress);

export default collection;