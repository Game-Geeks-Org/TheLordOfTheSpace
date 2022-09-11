import React from "react";
import './App.css'
import { SnackbarProvider } from 'notistack';
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
