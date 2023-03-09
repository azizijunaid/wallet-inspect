const http = require('http');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const TronWeb = require('tronweb');
const privateKey =
  'tourist evil detail awful snack clap gate clump ball normal any oak';
const ONE_SUN = 0.000001;

// Web3.eth.sendTransaction({
//   from: account.address,
//   to: '0x1234567890123456789012345678901234567890',
//   value: Web3.utils.toWei('1', 'ether'),
// })
// .then(receipt => {
//   console.log(`Transaction hash: ${receipt.transactionHash}`);
// })
// .catch(error => {
//   console.error(error);
// });

http
  .createServer(async (request, response) => {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    //    let provider = new HDWalletProvider({
    //     mnemonic: {
    //       phrase: privateKey
    //     },
    //     providerOrUrl: "https://mainnet.infura.io/v3/c729cc48c1eb40ba8752614757dac8bb"
    //   });

    // const web3 = new Web3(provider);

    // const accounts = web3.eth.getAccounts().then(data => {

    //     console.log("🚀 ~ file: index.js:5 ~ account:", data)
    // });

    // const account = tronWeb.mnemonic.toAccount(privateKey);

    // const balance = await tronWeb.trx.getBalance(account.address);
    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
    });

    const account = tronWeb.fromMnemonic(privateKey);
    setInterval(async () => {
        const balance = await tronWeb.trx.getBalance(account.address);
        const totalTrx = ONE_SUN * balance;
        if (totalTrx >= 10) {
            try {
                const txObject = await tronWeb.transactionBuilder.sendTrx(
                    account.address,
                    balance,
                    'TD2ut1BqfThnbmhr1PiBvn91j6cpQeB1gv',
                    1
                );
                const signedTx = await tronWeb.trx.sign(txObject, privateKey);
                const result = await tronWeb.trx.sendRawTransaction(signedTx);
                console.log(result);
            }catch(error) {
                console.log('error', error)
            }
        }
    },2000);
    

    // console.log(ONE_SUN * balance);
    

    //   console.log('aaa', )
    // tronWeb.contract().at(account.address).Transfer().watch((err, eventResult) => {
    //     if (err) {
    //         console.error('Error while watching for events:', err);
    //         return;
    //     }

    //     console.log('New transfer event received:', eventResult);
    // });

    response.writeHead(200, { 'Content-Type': 'text/plain' });

    response.end('Hello World\n');
  })
  .listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
