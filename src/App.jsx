import React, { useState, useEffect } from "react";
import Game from './components/Game'
import { wallet, getActiveAccount, disconnectWallet, connectWallet } from './Utils/wallet';
import { TezosOperationType, ColorMode } from "@airgap/beacon-sdk";
import './App.css'
import logo from './assets/Img/logo.png'
import lord from './assets/Img/lord_logo.png'
import { Container, Row, Col } from 'reactstrap'
import image from './assets/Img/images.png'
import imag2 from './assets/Img/score.png'
import imag3 from './assets/Img/top.png'
import imag4 from './assets/Img/head.png'
import tez from './assets/Img/tez.png'




const App = () => {
	const [txn, setTxn] = useState(false);
	const [msg, setMsg] = useState("Click Start Game to pay 3 XTZ and start the game.");
	const [wallet, setWallet] = useState(null)
	const [disconnect, showDisconnect] =useState(false)
	const [isActive, setIsActive] = useState(false)
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
				amount: `${amount}`,
			},
		]).then(async (op) => {
			console.log(op)
			setMsg("Transaction Successful ...")
			setTxn(true)
		}).catch((err) => {
			console.log(err);
			setMsg("Error in Transaction ... Please Try Again")
		});

	}

	const getHistory = async () => {
		const address = await getActiveAccount()
		if (address) {
			setIsActive(true)
		}

	}

	

	useEffect(() => {
		const interval = setInterval(() => {
			getHistory();
		}, 1000);
		return () => clearInterval(interval);
	}, []);



	// WALLET CONNECTION
	const handleConnectWallet = async () => {
        const { wallet } = await connectWallet();
        setWallet(wallet);
      };

	  const handleDisconnectWallet = async () => {
        const { wallet } = await disconnectWallet();
        setWallet(wallet);
      };

	  
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
				<Game />
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
								wallet ? (
								<div className='wallet_connection_wrapper' 
								onMouseEnter={() => showDisconnect(true)}
								onMouseLeave={() =>showDisconnect(false)}>

                            <div className='wallet_btn'>
                              <span className=''>
                              {`tz${wallet.slice(
                                    2,
                                    3
                                  )}...${wallet.slice(
                                    wallet.length - 4,
                                    wallet.length
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
									<button className="pay_btn" onClick={async () => { await sendXTZ(3) }}>
										Pay 3<img src={tez} alt="" />

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

export default App;
