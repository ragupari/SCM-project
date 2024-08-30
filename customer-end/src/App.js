import React from 'react';
import Routes from './Routes';
import axios from 'axios';
import data from './data.json'; 

const path = data.backend;

axios.defaults.baseURL = 'http://localhost:9000/';

function App() {
    return (
        <div>
            <Routes />
        </div>
    );
}

export default App;