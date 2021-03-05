/*
 * SPDX-License-Identifier: Apache-2.0
 */

//RUN INSTRUCTION:
//TERMINAL COMMAND: node create_user.js keshav Org1MSP client org1.department1
'use strict';

//Outside main function because async main cannot run sync methods
const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');
const config = require('./config.json');
const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-org1.json');


async function main() {
	
    try{
        var userName = process.argv[2];
        var orgName = process.argv[3];
        var userRole = process.argv[4];
        var orgAffiliation = process.argv[5];


        const walletPath = path.join(process.cwd(), config.Common.Wallet);
        const wallet = new FileSystemWallet(walletPath);
       // console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists(config.adminEnroll.adminIdentity);
        if (!adminExists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: config.adminEnroll.adminIdentity, discovery: { enabled: true, asLocalhost: true } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();
        
        // Register the user, enroll the user, and import the new identity into the wallet.

        const secret = await ca.register({ affiliation: orgAffiliation, enrollmentID: userName, role: userRole}, adminIdentity);
        const enrollment = await ca.enroll({ enrollmentID: userName, enrollmentSecret: secret});
        const userIdentity = X509WalletMixin.createIdentity(orgName, enrollment.certificate, enrollment.key.toBytes());
        await wallet.import(userName, userIdentity);
        console.log('Successfully registered and enrolled admin user ' + userName + ' and imported it into the wallet');

    } catch (error){
        console.log(`Failed to register user:  ${error}`);
        process.exit(1);
    } 
}

main();
