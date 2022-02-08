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
		return await ["Red Eagles", "Black Knight"];
	}
}

const guild = new Guild("0x1234567890123456789012345678901234567890");

export default guild;