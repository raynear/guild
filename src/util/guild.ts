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

	async setGuildName(name:string) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		// const account = useRecoilValue(accountState);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		guild.methods.setGuildName(name).send({from:account, gas:3000000});
	}

	async getGuilds() {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const name = await guild.methods.guildName().call();

		return [{name:name, address:config.GuildContractAddress}, {name:"Black Knight", address:"0xa8f7a8f789698a6f98"}];
	}

	async getMemberRevenue(account:string) {
		const guild = new window.caver.klay.Contract(Guild_ABI, this.address);
		const revenue = await guild.methods.getMemberRevenue(account).call();

		return revenue;
	}
}

const guild = new Guild(config.GuildContractAddress);

export default guild;