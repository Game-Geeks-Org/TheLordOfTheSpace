import React, { useCallback, useEffect,useState} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { wallet } from '../Utils/wallet';
import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";
import {useSnackbar } from 'notistack';



const Tezos = new TezosToolkit("https://rpc.ghostnet.teztnets.xyz/");
Tezos.setWalletProvider(wallet);


function Game(props) {
	const { enqueueSnackbar } = useSnackbar();
let txn = 0

const sendScore = async (game_id, score) => {
	if (txn === 0) {
	txn += 1
	enqueueSnackbar('Game Over', {variant : "error"});
	Tezos.setProvider({
	signer: new InMemorySigner(process.env.REACT_APP_PVT_KEY),
	});
	
	await Tezos.contract
		// Ghostnet: KT1FT9LCQK4uscCELH9DfMppcrYtPsafrrWy
		// Mainnet Address: KT1SL5fbzHfBcD9pyTAskCLqzJnKxZP7GW2v 
		.at("KT1FT9LCQK4uscCELH9DfMppcrYtPsafrrWy") 
		.then((contract) => {
			contract.methods.updateScore(game_id, score).send();
			enqueueSnackbar('Score Recorded', {variant : "info"});
			enqueueSnackbar(`You will get ${score/100} GaGe tokens`, {variant : "success"});
			enqueueSnackbar(`You can go back to Home Screen Now`, {variant : "info"});

		})
		.catch((error) => {window.alert("Error");});
	Tezos.setWalletProvider(wallet);
}
};

const {
	unityProvider,
	sendMessage,
	unload,
	isLoaded,
	addEventListener,
	removeEventListener,
} = useUnityContext({
	loaderUrl: "SSBuild/Build/web.loader.js",
	dataUrl: "SSBuild/Build/web.data",
	frameworkUrl: "SSBuild/Build/web.framework.js",
	codeUrl: "SSBuild/Build/web.wasm",
});
const gameId = props.gameId;



// LOADING FUNCTION
const [isPlaying, setIsPlaying] = useState(false);
const handleStart =  () =>{
	if (isLoaded === false || isPlaying === true) {
		return;
	  }
	  setIsPlaying(true);
	  sendMessage("PlayerDataStorage","ReceiveID", 'Rare1');
}

if(isLoaded){
handleStart()
} 








const handleGameOver = useCallback( async (score) => {
	await sendScore(gameId, score)
}, []);


useEffect(() => {
	addEventListener("GameOver", handleGameOver);
	return () => {
	unload();
	removeEventListener("GameOver", handleGameOver);
	};
}, [addEventListener, removeEventListener, unload, handleGameOver,]);

	return (
		<>
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
			
			<Unity
				className="unity"
				unityProvider={unityProvider}
				style={{
				width: "100%",
				aspectRatio: "16:9",
				overflow: "hidden",
				}}

				
			/>

			</div>
		</>
	);
}

export default Game