import config from './config';
import { Guild_ABI } from './ABI';

declare global {
    interface Window {
        klaytn:any;
        caver:any;
    }
}

export class Guild {
	address:string;

	constructor(address:string) {
		this.address = address;
	}

	async setGuildName(name:string) {
		const guild = new window.caver.klay.Contract(Guild_ABI, config.GuildContractAddress);
		let account = await window.caver.klay.getAccounts();
		account = account[0];
		console.log(account);
		guild.methods.setGuildName(name).send({from:account, gas:3000000});
	}

	async getGuilds() {
		const guild = new window.caver.klay.Contract(Guild_ABI, config.GuildContractAddress);
		const name = await guild.methods.guildName().call();

		return [{name:name, address:config.GuildContractAddress}, {name:"Black Knight", address:"0xa8f7a8f789698a6f98"}];
	}
}

const guild = new Guild("0x1234567890123456789012345678901234567890");

export default guild;