const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');

// capture network variables from config.json
const configPath = path.join(process.cwd(), "./hackathon10_employeeverfification_profile.json");
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);

var connection_file = config.connection_file;
console.log(connection_file);
var appAdmin = config.appAdmin;
var appAdminSecret = config.appAdminSecret;
var orgMSPID = config.orgMSPID;
var caName = config.caName;

const ccpPath = path.join(configPath);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);


async function main() {
    try {

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities["173.193.75.61:30450"].url;
        console.log(caURL);
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists("admin");
        if (adminExists) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: "admin", enrollmentSecret: "adminpw" });
        const identity = X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes());
        wallet.import("admin", identity);
        console.log('msg: Successfully enrolled admin user ' + "admin" + ' and imported it into the wallet');

    } catch (error) {
        console.error('Failed to enroll admin user ' + "admin" + ': ${error}');
        process.exit(1);
    }
}

main();