'use strict';

//RUN INSTRUCTION:
//TERMINAL COMMAND: node modify.js <JSON filePATH>


const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs')
const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-org1.json');
const jsonString = fs.readFileSync(process.argv[2])  //JSON file input through command line

async function main() {
    try {

        const walletPath = path.join(process.cwd(), config.Common.Wallet);
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

       
        const userExists = await wallet.exists(config.regisUser.userIdentity);
        if (!userExists) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

 
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: config.regisUser.userIdentity, discovery: { enabled: true, asLocalhost: true } });

       
        const network = await gateway.getNetwork(config.Common.network_channel);

       
        const contract = network.getContract(config.Common.smartContract);

        var obj = JSON.parse(jsonString);
        var result = await contract.submitTransaction('modifyApprovalStatus', obj.CompId, obj.ApprovalStatus, obj.Approver, obj.ApprovalTime);
     
       
        console.log('Transaction has been submitted'); 
        //console.log(`Query result is: ${result.toString()}`);
       

        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
