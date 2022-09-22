import React from "react";
import './App.css'
import { SnackbarProvider } from 'notistack';
import Info from './components/Info'


const App = () => {

		return (
			<>
			<SnackbarProvider maxSnack={5} autoHideDuration={5000}>
				<div>
					<Info/>
				</div>
			</SnackbarProvider>	
			</>);

}



export default App;
