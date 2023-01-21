import React, { useState, useEffect } from "react";
import Game from './Game'
import { wallet, getActiveAccount, disconnectWallet, connectWallet } from '../Utils/wallet';
import logo from '../assets/Img/logo.png'
import lord from '../assets/Img/lord_logo.png'
import { Container, Row, Col } from 'reactstrap'
import image from '../assets/Img/images.png'
import imag2 from '../assets/Img/score.png'
import imag3 from '../assets/Img/top.png'
import imag4 from '../assets/Img/head.png'
import tez from '../assets/Img/tez.png'
import { TezosToolkit } from "@taquito/taquito";
import {useSnackbar } from 'notistack';
// import axios from 'axios';

function getRndInteger(min, max) {
		return Math.floor(Math.random() * (max - min) ) + min;
}
const gameId = getRndInteger(1000000,10000000)


const Info = () => {
	const [txn, setTxn] = useState(false);
	const [wallets, setWallet] = useState(null)
	const [disconnect, showDisconnect] =useState(false)
	// const [geekyHeadMsg, setGeekyHeadMsg] = useState("")
	const { enqueueSnackbar } = useSnackbar();
	let myAddress = ""
	const tezos = new TezosToolkit("https://rpc.ghostnet.teztnets.xyz/");
	tezos.setWalletProvider(wallet);
	const CONTRACT_ADDRESS = 'KT1FT9LCQK4uscCELH9DfMppcrYtPsafrrWy';
	


	const sendXTZ = async () => {
		// Check if we are connected. If not, do a permission request first.
		const activeAccount = await wallet.client.getActiveAccount();
		if (!activeAccount) {
			const permissions = await wallet.client.requestPermissions();
			myAddress = permissions.address;
		} else {
			myAddress = activeAccount.address;
		}
		// const platinum = await axios.get(`https://api.tzkt.io/v1/bigmaps/284795/keys/{"address":"${myAddress}","nat":"0"}`)
		// const gold = await axios.get(`https://api.tzkt.io/v1/bigmaps/284795/keys/{"address":"${myAddress}","nat":"1"}`)
		// const silver = await axios.get(`https://api.tzkt.io/v1/bigmaps/284795/keys/{"address":"${myAddress}","nat":"2"}`)
		// if ((platinum.data.value > 0) || (gold.data.value > 0) || (silver.data.value > 0)) {
		enqueueSnackbar('Transaction in process', {variant : "info"});
		const contract = await tezos.wallet.at(CONTRACT_ADDRESS);
		
		await contract.methods.addGame(gameId).send({ amount: 0, mutez: false,
		}).then(async (op) => {
			enqueueSnackbar("Transaction Successful", {variant : "success"})
			setTxn(true)
		}).catch((err) => {
			enqueueSnackbar("Error in Transaction", {variant : "error"})
		});	
		// } else {
		// 	setGeekyHeadMsg(<a style={{textDecorationColor:"None", color:"white"}} href="www.gamegeeks.online/dashboard">"Only GeekyHeads can play the Game. Click here to know more"</a>)
		// 	enqueueSnackbar("Not a GeekyHead.", {variant : "error"})
		// }
	}


	// WALLET CONNECTION
	const handleConnectWallet = async () => {
        const { wallet } = await connectWallet();
        setWallet(wallet);
      };
	  console.log(handleConnectWallet())

	  const handleDisconnectWallet = async () => {
        const { wallet } = await disconnectWallet();
        setWallet(wallet);

      };

	  console.log(handleDisconnectWallet())
	  
	  useEffect(() => {
        const func = async () => {
          const account = await getActiveAccount();
          if (account) {
            setWallet(account.address);
          }
        };
        func();
      }, []);
	  //WALLET CONNECTION END


	if (txn === true) {
		return (
			<>
				<div style={{height: '100vh', width: '100%'}}>\
					<Game gameId = {gameId}/>
				</div>
			</>
		);
	} else {
		return (
			<>
				<section className="container game_section">
					<div className=" d-flex align-items-center justify-content-center gap-5 wrapper">
						<div className="">
							<img src={logo} className='logo' alt="img" />
						</div>
						<p className="sect_title">Presents</p>
					</div>
					<Container>
						<Row>
							<div className="hero_wrapper d-flex">
								<Col lg='6' md='6'>
									<div className="hero_content">
										<div className="desc_1">
											<p className="text-white">Let the fight begin to become</p>
										</div>
										<div className="desc_2">
											<p className="text-white">The <span>Lord</span> Of </p>
											<p className="text-white" style={{ fontSize: "135%" }}>The <span>Space</span></p>
										</div>
										<p className="text-white">This is the <b>Beta version</b> of the game. Do share your feedback <a style={{color:"white"}} href="https://bit.ly/tlots-feedback" target="_blank" rel="noreferrer">here</a></p>
									</div>
								</Col>
								<Col lg='6' md='6'>
									<div className="hero-img mt-5">
										<img src={lord} alt='hero' className='' />
									</div>
								</Col>
							</div>
						</Row>
					</Container>
					<div className="game_mode_section">
						<div className="game_mode_title">
							<div className="d-flex justify-content-between">
								<div>
								<p className="">Game Modes </p>
								</div>
								<div>
								{
								wallets ? (
								<div className='wallet_connection_wrapper' 
								onMouseEnter={() => showDisconnect(true)}
								onMouseLeave={() =>showDisconnect(false)}>

                            <div className='wallet_btn'>
                              <span className=''>
                              {`tz${wallets.slice(
                                    2,
                                    3
                                  )}...${wallets.slice(
                                    wallets.length - 4,
                                    wallets.length
                                  )}`}</span>
                            </div>
                            {
                              disconnect && (
                                <div className='disconnect_btn'>
                                <span className='disconnect' onClick={handleDisconnectWallet}>Disconnect<i class="ri-edit-circle-line"></i></span>
                                </div>
                              )
                            }

								</div>

									):(
									<button className='wallet_btn' onClick={handleConnectWallet}>
										Connect Wallet
									</button>
									)
								}

								</div>
							</div>
							
							<div style={{ borderTop: "2px solid #BF1E2E", marginLeft: 5, marginRight: 15 }}></div>
						</div>

					</div>
					<div className="container-lg">
						<div className="game_mode_wrapper">
							<div className="row gy-4 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4">
							
								<div className="single_img_wrapper col">
									<div className="single_img">
										<img src={image} width='180px' alt="img" />
									</div>
									<p className="single-img_desc">Play to <span>Earn</span></p>
									<button className="pay_btn" onClick={async () => { await sendXTZ() }}>
										Play on Testnet

									</button>

								</div>
								<div className="single_img_wrapper col">
									<div className="single_img">
										<img src={imag2} width='180px' alt="img" />
									</div>
									<p className="single-img_desc">Beat my <span>Score</span></p>
									<p className="img_status">Coming Soon</p>
								</div>
								<div className="single_img_wrapper col">
									<div className="single_img">
										<img src={imag3} width='180px' alt="img" />
									</div>
									<p className="single-img_desc">Top of The <span>Game</span></p>
									<p className="img_status">Coming Soon</p>
								</div>
								<div className="single_img_wrapper col">
									<div className="single_img">
										<img src={imag4} width='180px' alt="img" />
									</div>
									<p className="single-img_desc">Lets get <span>Head On</span></p>
									<p className="img_status">Coming Soon</p>
								</div>

							</div>
						</div>


					</div>

				</section>




				{/* <div style = {{textAlign: 'center', color: "#fff"}}>
					<h1>Game: The Lords of the Space</h1>
					<h2>Game Fees: 3 XTZ</h2>
					<p>Note: Don't refresh the website after the transaction is done</p>
					{isActive ? <><button onClick={async()=>{
						setMsg("Transaction in Process");
						await sendXTZ(3);}}>Start Game</button> &nbsp; 
					<button onClick={async()=>{
						await disconnectWallet();
						setIsActive(false);
						}}>Disconnect Wallet</button>
					<p>{msg}</p> </>:  <button onClick={async()=>{
						await connectWallet();
						setIsActive(true);
						}}>Connect Wallet</button>}
				</div> */}
			</>
		)
	}
}

export default Info;
