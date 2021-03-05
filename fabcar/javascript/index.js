
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();
const { exec } = require("child_process");
/**const { Wallets } = require('fabric-network');
var fs = require('fs');
async function main() {
    const { FileSystemWallet, Gateway } = require('fabric-network');
    const path = require('path');
    const fs = require('fs');
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
 
    const walletPath = path.join(process.cwd(), 'wallet');
   const wallet =await Wallets.newFileSystemWallet(walletPath);
   // const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
        

     const adminExists = await wallet.get("admin");
        if (!adminExists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        } 

    
    const gateway = new Gateway();
    await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });
    
  //  await gateway.connect(ccpPath, { wallet, identity: 'appUser', discovery: { enabled: true, //asLocalhost: true } });

    const network = await gateway.getNetwork('mychannel');

    const contract = network.getContract('fabcar');

    const app = express();
    const port = 5003;

    app.use(cors());
    app.use(bodyParser.json());

    app.post('/createModel', async (req, res) => {
	
        let data = {
            ...req.body
		
        };
console.log(data)
       try {
            await contract.submitTransaction('createModel', JSON.stringify(data));
            res.status(201).json({success: true});
        } catch (error) {
            res.status(500).send('Unable to submit transaction');
        } 
	console.log(data)
    });

    app.post('/addPCtoModel', async (req, res) => {
        let modelId = req.body['ModelId'];
        let data = {
            ...req.body
        };

        try {
            await contract.submitTransaction('AddPCToModel', modelId, JSON.stringify(data));
            res.status(201).json({success: true});
        } catch (error) {
            res.status(500).send('Unable to submit transaction');
        }
    });

    app.get('/queryModel', async (req, res) => {
        let id = req.query['ModelId'];

        try {
            const result = await contract.evaluateTransaction('queryModel', id);
            res.json({result: result.toString()});
        } catch (error) {
            res.status(500).send('Unable to submit transaction');
        }
    });

    app.get('/queryComponent', async (req, res) => {
        let id = req.query['ComponentId'];

        try {
            const result = await contract.evaluateTransaction('QueryComponentByModel', id);
            res.json({result: result.toString()});
        } catch (error) {
            res.status(500).send('Unable to submit transaction');
        }
    });
	
	app.post('/modifyComponent', async (req, res) => {
        let id = req.query['id'];
        let field = req.query['field'];
        let val = req.query['val'];
        //debug
        console.log(id,field,val);
       
        try {
            const result = await contract.submitTransaction('modifyComponent', id, field, val);
              console.log(result.toString());
              res.json({result: result.toString()});
              console.log("\nSuccess\n");
        } catch (error) {
            console.error(error);
            res.status(500).send('Unable to submit transaction');
        }
    });

	app.post('/AddUser', (req,res) => {
    let username = req.body['username'];
    let organization = req.body['organizationname'];
    let role = req.body['role'];
    let department = req.body['department']
    console.log(username, organization, role, department)
   try{
        exec(`node create_user ${username} ${organization} ${role} ${department}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.send({error});
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            res.send({stdout});
        });
    }catch(e){
        console.log(e)
        res.send(e);
    }
})	

 app.post('/SelectUser', (req,res) =>{
    
    var files = fs.readdirSync('wallet/');
	var mod_files = [];
	console.log(mod_files)
	for(var i=0; i<files.length; i++){
		if(files[i]!='admin'&&files[i]!='.gitkeep'){
			mod_files.push(files[i])
			console.log(mod_files)
		}		
	}

   // for(var i = files.length-1; i--;){
     //   if (files[i] === 'admin') files.splice(i,1);
    //}
    console.log(mod_files);
    res.send({'files' : mod_files});
})

    app.listen(port, () => console.log(`App listening on localhost:${port}`));
}

main();



*/


'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');




    const app = express();
    const port = 5003;

    app.use(cors({origin : true}));
    app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
    app.post('/createModel', async (req, res) => {
	
	
       let data = {
            ...req.body
		
        };
console.log(data)
       try {
       	await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');
        console.log('Transaction has been submitted');
            //await contract.submitTransaction('createModel', JSON.stringify(data));
            res.status(201).json({success: true});
        } catch (error) {
       // console.log(error);
            res.status(500).send('Unable to submit transaction');
        } 
	
    });

    app.post('/addPCtoModel', async (req, res) => {
        let modelId = req.body['ModelId'];
        let data = {
            ...req.body
        };

        try {
            await contract.submitTransaction('AddPCToModel', modelId, JSON.stringify(data));
            res.status(201).json({success: true});
        } catch (error) {
            res.status(500).send('Unable to submit transaction');
        }
    });

    app.get('/queryModel', async (req, res) => {
        let id = req.query['ModelId'];

        try {
            const result = await contract.evaluateTransaction('queryModel', id);
            res.json({result: result.toString()});
        } catch (error) {
            res.status(500).send('Unable to submit transaction');
        }
    });

    app.get('/queryComponent', async (req, res) => {
        let id = req.query['ComponentId'];

        try {
            const result = await contract.evaluateTransaction('QueryComponentByModel', id);
            res.json({result: result.toString()});
        } catch (error) {
            res.status(500).send('Unable to submit transaction');
        }
    });
	
	app.post('/modifyComponent', async (req, res) => {
        let id = req.query['id'];
        let field = req.query['field'];
        let val = req.query['val'];
        //debug
        console.log(id,field,val);
       
        try {
            const result = await contract.submitTransaction('modifyComponent', id, field, val);
              console.log(result.toString());
              res.json({result: result.toString()});
              console.log("\nSuccess\n");
        } catch (error) {
            console.error(error);
            res.status(500).send('Unable to submit transaction');
        }
    });

	app.post('/AddUser', (req,res) => {
    let username = req.body['username'];
    let organization = req.body['organizationname'];
    let role = req.body['role'];
    let department = req.body['department']
    console.log(username, organization, role, department)
   try{
        exec(`node create_user ${username} ${organization} ${role} ${department}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.send({error});
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            res.send({stdout});
        });
    }catch(e){
        console.log(e)
        res.send(e);
    }
})	

 app.post('/SelectUser', (req,res) =>{
    
    var files = fs.readdirSync('wallet/');
	var mod_files = [];
	console.log(mod_files)
	for(var i=0; i<files.length; i++){
		if(files[i]!='admin'&&files[i]!='.gitkeep'){
			mod_files.push(files[i])
			console.log(mod_files)
		}		
	}

   // for(var i = files.length-1; i--;){
     //   if (files[i] === 'admin') files.splice(i,1);
    //}
    console.log(mod_files);
    res.send({'files' : mod_files});
})

    app.listen(port, () => console.log(`App listening on localhost:${port}`));

       // await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
