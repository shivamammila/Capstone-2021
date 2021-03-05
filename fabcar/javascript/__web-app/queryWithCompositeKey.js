'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs')
const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-org1.json');
//const jsonString = fs.readFileSync('./selectors.json')
const config = require('./config.json');

//RUN INSTRUCTION:
//TERMINAL COMMAND: node queryWithCompositekey.js <FUNC NAME eg:queryComponentbyId> <UUID: CompId>


async function main() {
    try {

        
        const walletPath = path.join(process.cwd(), config.Common.Wallet);
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        
        const userExists = await wallet.exists(config.regisUser.userIdentity);
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: config.regisUser.userIdentity, discovery: { enabled: true, asLocalhost: true } });

        
        const network = await gateway.getNetwork(config.Common.network_channel);

      
        const contract = network.getContract(config.Common.smartContract);

	    var result = await contract.evaluateTransaction(process.argv[2], process.argv[3]);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();


