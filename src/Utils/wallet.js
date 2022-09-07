
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {TezosOperationType, ColorMode } from "@airgap/beacon-sdk";

const preferredNetwork = "ghostnet";
const options = {
name: "Game Geeks: The Lords of the Space", 
preferredNetwork: preferredNetwork,
};
const rpcURL = "https://rpc.ghostnet.teztnets.xyz/";
const Tezos = new TezosToolkit(rpcURL);
const wallet = new BeaconWallet(options);
  

Tezos.setWalletProvider(wallet);


let myAddress = ""

const getActiveAccount = async () => {
return await wallet.client.getActiveAccount();
};

const connectWallet = async () => {
await wallet.client.setColorMode(ColorMode.DARK);
let account = await wallet.client.getActiveAccount();

if (!account) {
	await wallet.requestPermissions({
	network: { type: preferredNetwork },
	});
	account = await wallet.client.getActiveAccount();
}
return { success: true, wallet: account.address };
};

const disconnectWallet = async () => {
await wallet.clearActiveAccount();
return { success: true, wallet: null };
};

const checkIfWalletConnected = async (wallet) => {
try {
	const activeAccount = await wallet.client.getActiveAccount();
	if (!activeAccount) {
	await wallet.client.requestPermissions({
		type: { network: preferredNetwork },
	});
	}
	return {
	success: true,
	};
} catch (error) {
	return {
	success: false,
	error,
	};
}
};
const tezos = new TezosToolkit(rpcURL)
tezos.setWalletProvider(wallet)

const sendXTZ = async (amount) => {
	await wallet.client.setColorMode(ColorMode.DARK);
	// Check if we are connected. If not, do a permission request first.
	const activeAccount = await wallet.client.getActiveAccount();
	if (!activeAccount) {
	const permissions = await wallet.client.requestPermissions();
	console.log("New connection:", permissions.address);
	myAddress = permissions.address;
	} else {
	myAddress = activeAccount.address;
	}

	// At this point we are connected to an account.
	// Let's send a simple transaction to the wallet that sends 1 mutez to ourselves.
	const response = await wallet.sendOperations([
	{
		kind: TezosOperationType.TRANSACTION,
		destination: myAddress, // Send to ourselves
		amount: `${amount*1000000}`, // Amount in mutez, the smallest unit in Tezos
	},
	]).then(async(op)=>{
		console.log(op)
		await op.confirmations();
		return true;
	}).catch((err)=>{
		console.log(err);
		return false
	});
	

	
}

export{
	connectWallet,
	disconnectWallet,
	getActiveAccount,
	checkIfWalletConnected,
	sendXTZ,
	wallet,
	Tezos
}


