/**
 * caver-js 라이브러리는 Klaytn 노드에 연결하게 해줍니다.
 * 'rpcURL' 값을 변경하여 특정 Klaytn 노드에 연결할 수 있습니다.
 * Klaytn 풀노드를 운용 중이라면 rpcURL을 운용 중인 풀노드의 URL로 설정하세요.
 * ex) rpcURL: 'http://localhost:8551'
 */
// import Caver from 'caver-js'

 export const config = {
   rpcURL: 'https://api.baobab.klaytn.net:8651'
 }


export var cav:any;

if(typeof window.klaytn !== undefined) {
  const klaytn = window['klaytn']

  if(klaytn._kaikas.isEnabled() === false) {
    try {
      klaytn.enable().then((accounts:any) => {

        //cav = new Caver(klaytn);
        cav = window['caver'];
        cav.klay.getAccounts().then((accounts:any) => {
        console.log(accounts);
        });

        // caver.wallet.signMessage(accounts[0], 'test', caver.wallet.keyring.role.roleTransactionKey).then((signature:any) => {
        // 	// console.log(signature);
        // });
      });
    } catch (error) {
      console.error(error)
    }
  }
}

export default cav;