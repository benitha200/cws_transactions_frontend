import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import { Bars3Icon, XCircleIcon } from '@heroicons/react/24/outline';
import { LayoutDashboard, Receipt,FileInput, NotebookPen, FileSpreadsheet, FileArchive } from 'lucide-react';
import AddTransaction from './components/Transactions/AddTransaction';
import FinancialReport from './components/Reports/FinancialReport';
import UploadFarmers from './components/Farmers/UploadFarmers';
import Dashboard from './components/Dashboard/Dashboard';
import DPR from './components/Reports/DPR';
import Sidebar, { SidebarItem } from './components/Header/Sidebar';
import { Transactions } from './components/Transactions/Transactions';

function App() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Router>
        <div className='flex'>
          <button
            className="lg:hidden text-gray-500"
            onClick={() => setIsOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div
            className={`bg-white p-4 flex flex-col absolute lg:relative w-64 min-h-screen transition-all duration-300 transform lg:transform-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <button
              className="lg:hidden text-gray-500 mb-4"
              onClick={() => setIsOpen(false)}
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
            <Sidebar>
              <SidebarItem
                icon={<LayoutDashboard size={20} />}
                text="Dashboard"
                alert
                component={Link}
                to="/"
              />
              <SidebarItem
                icon={<NotebookPen size={20} />}
                text="Add Transactions"
                alert
                component={Link}
                to="/add-transactions"
              />
              <SidebarItem
                icon={<FileInput size={20} />}
                text="Upload Farmer"
                alert
                component={Link}
                to="/upload-farmer"
              />
              
              <SidebarItem
                icon={<FileSpreadsheet size={20} />}
                text="Financial Report"
                alert
                component={Link}
                to="/financial-report"
              />
              <SidebarItem
                icon={<FileArchive size={20} />}
                text="DPR"
                alert
                component={Link}
                to="/dpr"
              />
            </Sidebar> 
            {/* <Sidebar/>*/}
          </div>

          <div className="flex-1 p-4">
            {/* Display the route content here */}
            <Outlet />
            {/* <Transactions/> */}
          </div>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload-farmer" element={<UploadFarmers/>} />
          <Route path="/add-transactions" element={<AddTransaction />} />
          <Route path="/financial-report" element={<FinancialReport />} />
          <Route path="/dpr" element={<DPR />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
