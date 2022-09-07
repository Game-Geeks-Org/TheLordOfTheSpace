import React, {useState } from "react";
import Game from './components/Game'
import {
	sendXTZ
  } from './Utils/wallet';


const App = () => {
	const [txn, setTxn] = useState(false);
	const [msg, setMsg] = useState("Click Start Game to pay 3 XTZ and start the game.");

	
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
						const trans = await sendXTZ(3)
						console.log(trans)
						if (trans === true) {
							setMsg("Transaction Successful");
							setTxn(true);
						} else {
							setMsg("Transaction Failed ... Try Again")
						}
						;}}>Start Game</button>
					<p>{msg}</p>
				</div>
			</>
		)
	}
}

export default App;
