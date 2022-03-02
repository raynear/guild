import config from './config';
import { KIP17_ABI,Guild_ABI } from './ABI';

import { useRecoilValue } from 'recoil';
import { accountState } from '../recoil/atoms'

import membership from './membership';
import token from './token';
import collection from './collection';

export class Guild {
	address:string;
	// account:string;
	// account = useRecoilValue(accountState);

	constructor(address:string) {
		this.address = address;
	}

	async getGuildName() {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const name = await guild.methods.guildName().call();

		return name;
	}

	async getGuilds() {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const name = await guild.methods.guildName().call();
		// const membershipAddress = await guild.methods.membership().call();

		return [{name:name, address:config.GuildContractAddress}, {name:"Black Knight", address:"0x0000000000000000000000000000000000000000"}];
	}

	async getGuildRevenue() {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const revenue = await guild.methods.getGuildRevenue().call();

		return revenue;
	}

	async getMemberRevenue() {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const revenue = await guild.methods.getMemberRevenue().call();

		return revenue;
	}

	async setGuildName(name:string) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		await guild.methods.setGuildName(name).send({from:account, gas:3000000});
	}

	async proposeSupplyNFT(NFTContract:string, NFTId:number, price:number) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];

		// await collection.approve(account, this.address, NFTId);
		await guild.methods.proposeSupplyNFT("Buy", NFTContract, NFTId, window.caver.utils.toPeb(1)).send({from:account, gas:3000000});
	}

	async rentNFT(NFTContract:string, nftId:number) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		await token.approve(account, this.address, window.caver.utils.toPeb(2));
		await guild.methods.rentNFT(NFTContract, nftId).send({from:account, gas:3000000});
	}

	async returnNFT(nftId:number) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		await guild.methods.returnNFT(config.CollectionNFTAddress, nftId).send({from:account, gas:3000000});
	}

	async proposeDisposeNFT(NFTContract:string, NFTId:number, price:number) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		await guild.methods.proposeDisposeNFT("Sell", NFTContract, NFTId, window.caver.utils.toPeb(1)).send({from:account, gas:3000000});
	}

	async supplyNFT(proposalId:number) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];

		await guild.methods.supplyNFT(proposalId).send({from:account, gas:3000000});
	}

	async disposeNFT(proposalId:number) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		await guild.methods.disposeNFT(proposalId).send({from:account, gas:3000000});
	}

	async vote(id:number, votes:boolean) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		await guild.methods.vote(id, votes).send({from:account, gas:3000000});
	}

	async getProposals() {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const proposals = await guild.methods.getProposals().call();

		return proposals;
	}

	async getProposal(id:number) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const proposal = await guild.methods.getProposal(id).call();

		return proposal;
	}

	async getMembershipAddress() {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const membership = await guild.methods.membership().call();

		return membership;
	}

	async getCollectionAddress() {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const collection = await guild.methods.collection().call();

		return collection;
	}

	async isRentedNFT(NFTContract:string, NFTId:number) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		return await guild.methods.isRentedNFT(NFTContract, NFTId).call();
	}

	async getRentedNFTs(account:string) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const items = await collection.getItems(account);
		const ret = [];
		// console.log(items);
		for(let item of items) {
			const res = await guild.methods.isRentedNFT(config.CollectionNFTAddress, parseInt(item)).call();
			// console.log(res);
			if(res) {
				const i = await collection.getItem(config.CollectionNFTAddress, parseInt(item));
				// console.log(i.replaceAll("'", '"'));
				const i2 = JSON.parse(i.replaceAll("'", '"'));
				i2['id'] = item;
				ret.push(i2);
			}
		}

		return ret;
	}

	async dividend() {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		await guild.methods.dividend().send({from:account, gas:3000000});
	}

	async getRentableNFTs() {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const items = await collection.getItems(this.address);
		return items;
		// for(let item of items) {
		// 	const rented = guild.isRentedNFT(config.CollectionNFTAddress, item).call();
		// 	if(rented) {

		// 	}
		// 	// const uri = await collection.getItem(this.address, i);
		// }

		// return items;
	}
}

const guild = new Guild(config.GuildContractAddress);

export default guild;