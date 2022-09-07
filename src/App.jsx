import React, {useState } from "react";
import Game from './components/Game'
import {
		wallet
	} from './Utils/wallet';
import {TezosOperationType, ColorMode } from "@airgap/beacon-sdk";



const App = () => {
	const [txn, setTxn] = useState(false);
	const [msg, setMsg] = useState("Click Start Game to pay 3 XTZ and start the game.");
	let myAddress = ""
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
		setMsg("Waitning to accept the Transaction ...")
		const response = await wallet.sendOperations([
		{
			kind: TezosOperationType.TRANSACTION,
			destination: myAddress,
			amount: `${1}`,
		},
		]).then(async(op)=>{
			console.log(op)
			setMsg("Transaction Successful ...")
			setTxn(true)
		}).catch((err)=>{
			console.log(err);
			setMsg("Error in Transaction ... Please Try Again")
		});
		
	}
	
	if (txn === true) {
		return (
			<>
				<Game/>
			</>
		);
	} else {
		return (
			<>
				<div style = {{textAlign: 'center', color: "#fff"}}>
					<h1>Game: The Lords of the Space</h1>
					<h2>Game Fees: 3 XTZ</h2>
					<p>Note: Don't refresh the website after the transaction is done</p>
					<button onClick={async()=>{
						setMsg("Transaction in Process");
						await sendXTZ(3);}}>Start Game</button>
					<p>{msg}</p>
				</div>
			</>
		)
	}
}

export default App;
