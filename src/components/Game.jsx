import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { wallet, getActiveAccount, disconnectWallet, connectWallet } from '../Utils/wallet';
import { MichelsonMap, TezosToolkit } from "@taquito/taquito";
import { InMemorySigner, importKey } from "@taquito/signer";
import {useSnackbar } from 'notistack';



const Tezos = new TezosToolkit("https://rpc.ghostnet.teztnets.xyz/");
Tezos.setWalletProvider(wallet);


function Game(props) {
const [isGameOver, setIsGameOver] = useState(false);
const [score, setScore] = useState(0);
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
		.at("KT1FT9LCQK4uscCELH9DfMppcrYtPsafrrWy")
		.then((contract) => {
			contract.methods.updateScore(game_id, score).send();
			enqueueSnackbar('Score Recorded', {variant : "info"});
			enqueueSnackbar(`You will get ${score/100} GaGe tokens`, {variant : "success"});

		})
		.catch((error) => {window.alert("Error");});
	Tezos.setWalletProvider(wallet);
}
};

const {
	unityProvider,
	isLoaded,
	unload,
	loadingProgression,
	addEventListener,
	removeEventListener,
	sendMessage
} = useUnityContext({
	loaderUrl: "SSBuild/Build/web.loader.js",
	dataUrl: "SSBuild/Build/web.data",
	frameworkUrl: "SSBuild/Build/web.framework.js",
	codeUrl: "SSBuild/Build/web.wasm",
});
const gameId = props.gameId;

const handleGameOver = useCallback( async (score) => {
	setIsGameOver(true);
	setScore(score);
	const transaction = await sendScore(gameId, score)
}, []);

useEffect(() => {
	addEventListener("GameOver", handleGameOver);
	return () => {
	unload();
	removeEventListener("GameOver", handleGameOver);
	};
}, [addEventListener, removeEventListener, unload, handleGameOver]);

return (
	
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
);
}

export default Game