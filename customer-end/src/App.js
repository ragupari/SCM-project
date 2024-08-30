import React from 'react';
import Routes from './Routes';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:9000/';

function App() {
    return (
        <div>
            <Routes />
        </div>
    );
}

export default App;