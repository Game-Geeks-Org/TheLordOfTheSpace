import React, { useState, useEffect } from "react";
import Game from './components/Game'
import { wallet, getActiveAccount, disconnectWallet, connectWallet } from './Utils/wallet';
import './App.css'
import logo from './assets/Img/logo.png'
import lord from './assets/Img/lord_logo.png'
import { Container, Row, Col } from 'reactstrap'
import image from './assets/Img/images.png'
import imag2 from './assets/Img/score.png'
import imag3 from './assets/Img/top.png'
import imag4 from './assets/Img/head.png'
import tez from './assets/Img/tez.png'
import { TezosToolkit } from "@taquito/taquito";
import Snackbar from '@mui/material/Snackbar';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Info from './components/Info'


const App = () => {

		return (
			<>
			<SnackbarProvider maxSnack={3} autoHideDuration={3000}>
				<div>
					<Info/>
				</div>
			</SnackbarProvider>	
			</>);

}

export default App;
