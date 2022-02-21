import config from './config';
import { Guild_ABI } from './ABI';

import { useRecoilValue } from 'recoil';
import { accountState } from '../recoil/atoms'

export class Guild {
	address:string;
	// account:string;
	// account = useRecoilValue(accountState);

	constructor(address:string) {
		this.address = address;
	}

	async getGuilds() {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const name = await guild.methods.guildName().call();

		return [{name:name, address:config.GuildContractAddress}, {name:"Black Knight", address:"0x2745a300B5014985185cc817db7E2374088010BF"}];
	}

	async getGuildRevenue() {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const revenue = await guild.methods.getGuildRevenue().call();

		return revenue;
	}

	async getMemberRevenue(account:string) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const revenue = await guild.methods.getMemberRevenue(account).call();

		return revenue;
	}

	async setGuildName(name:string) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		guild.methods.setGuildName(name).send({from:account, gas:3000000});
	}

	async proposeSupplyNFT(hash:string, NFTContract:string, NFTId:number) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		guild.methods.proposeSupplyNFT(hash, NFTContract, NFTId).send({from:account, gas:3000000});
	}

	async proposeDisposeNFT(hash:string, NFTContract:string, NFTId:number) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		guild.methods.proposeDisposeNFT(hash, NFTContract, NFTId).send({from:account, gas:3000000});
	}

	async vote(id:number, votes:boolean) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		guild.methods.vote(id, votes).send({from:account, gas:3000000});
	}

	async getNFTProposals() {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const proposals = await guild.methods.getNFTproposals().call();

		return proposals;
	}
}

const guild = new Guild(config.GuildContractAddress);

export default guild;