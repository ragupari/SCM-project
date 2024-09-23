import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './FullLayout.css';

const FullLayout = () => {
  return (
    <div className="pageWrapper">
      {/* Header Area */}
      <div className="headerArea">
        <Header />
      </div>

      <div className="mainLayout">
        {/* Sidebar */}
        <aside className="sidebarArea" id='sidebarArea'>
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <div className="contentArea">
          <div className="container-fluid p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullLayout
