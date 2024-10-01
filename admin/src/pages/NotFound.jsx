import React from 'react';

const NotFound = () => {
    return (
        <div className="error-pagecontainer text-center">
            <div className='row'>
            <div className='col align-self-center'>
                
            <h1 className="display-1">404</h1>
            <p className="lead">Oops! Page not found.</p>
            <a href="/" className="btn btn-primary">Go Back Home</a>

            </div>
            </div>
        </div>
    );
};

export default NotFound;
