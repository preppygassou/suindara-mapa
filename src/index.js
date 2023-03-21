import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { ScenarioProvider } from 'services/business';
import { PasswordlessProvider, usePasswordless } from 'services/auth';
import awsconfig from 'assets/awsconfig';
import GIS from 'components/pages/GIS';
import GlobalStyle from 'assets/styles/global';
import Login from 'components/pages/Login';

function App() {
	const { token } = usePasswordless();

	return (
        <>
            {/* { !token && <Login awsconfig={awsconfig} /> } */}
            {/* {  token && <GIS /> } */}
             <GIS /> 
        </>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <PasswordlessProvider>
            <ScenarioProvider>
                <Router>
                    <App />
                    <GlobalStyle />
                </Router>
            </ScenarioProvider>
        </PasswordlessProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
