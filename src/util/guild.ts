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

	async getGuilds() {
		return await [{name:"Red Eagles", address:"0xa8f7a8f789698a6f98"}, {name:"Black Knight", address:"0xa8f7a8f789698a6f98"}];
	}
}

const guild = new Guild("0x1234567890123456789012345678901234567890");

export default guild;