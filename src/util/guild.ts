import config from './config';
import { KIP17_ABI,Guild_ABI } from './ABI';

import { useRecoilValue } from 'recoil';
import { accountState } from '../recoil/atoms'
import membership from './membership';

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

		return [{name:name, address:config.GuildContractAddress}, {name:"Black Knight", address:"0x0000000000000000000000000000000000000001"}];
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
		guild.methods.setGuildName(name).send({from:account, gas:3000000});
	}

	async proposeSupplyNFT(NFTContract:string, NFTId:number, price:number) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];

		guild.methods.proposeSupplyNFT("buy", NFTContract, NFTId, price).send({from:account, gas:3000000});
	}

	async proposeDisposeNFT(NFTContract:string, NFTId:number, price:number) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		guild.methods.proposeDisposeNFT("sell", NFTContract, NFTId, price).send({from:account, gas:3000000});
	}

	async supplyNFT(NFTContract:string, NFTId:number, price:number) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];

		guild.methods.supplyNFT(NFTId).send({from:account, gas:3000000});
	}

	async disposeNFT(NFTContract:string, NFTId:number, price:number) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		guild.methods.disposeNFT(NFTId).send({from:account, gas:3000000});
	}

	async vote(id:number, votes:boolean) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		guild.methods.vote(id, votes).send({from:account, gas:3000000});
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

	async getRentedNFTs(account:string) {
		return [0,1];
	}
}

const guild = new Guild(config.GuildContractAddress);

export default guild;