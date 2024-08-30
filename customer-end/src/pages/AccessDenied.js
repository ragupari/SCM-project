import React from 'react';

const AccessDenied = () => {
  const handleLoginAgain = () => {
    window.location.href = '/signin';
  };

  return (
    <div className="container text-center mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="display-4 text-danger">Access Denied</h1>
          <p className="lead">You do not have permission to access this page.</p>
          <button className="btn btn-primary" onClick={handleLoginAgain}>
            Login Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
