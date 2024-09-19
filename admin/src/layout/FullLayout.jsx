import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const FullLayout = () => {
  return (
    <div className="pageWrapper d-lg-flex">
      {/* Sidebar */}
      <aside className="sidebarArea shadow" id="sidebarArea">
        <Sidebar />
      </aside>
      {/* Content Area */}
      <div className="contentArea">
        <Header />
        {/* Main Content */}
        <div className="container-fluid p-4 wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default FullLayout
