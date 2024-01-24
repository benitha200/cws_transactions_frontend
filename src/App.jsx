import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import { Bars3Icon, FaceFrownIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { LayoutDashboard, Receipt,FileInput, NotebookPen, FileSpreadsheet, FileArchive, PersonStandingIcon, FileArchiveIcon, SquareUserRound, BookUser, CircleUserRound } from 'lucide-react';
import AddTransaction from './components/Transactions/AddTransaction';
import FinancialReport from './components/Reports/FinancialReport';
import UploadFarmers from './components/Farmers/UploadFarmers';
import Dashboard from './components/Dashboard/Dashboard';
import DPR from './components/Reports/DPR';
import Sidebar, { SidebarItem } from './components/Header/Sidebar';
import Transactions from './components/Transactions/Transactions';
import Login from './components/Login/Login';
import FinancialReportContainer from './components/Reports/FinancialReportContainer';
import DprContainer from './components/Reports/DprContainer';
import Logout from './components/Login/Logout';
import RegisterUsers from './components/Login/RegisterUsers';

function App() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [refreshtoken,setRefreshtoken]=useState(null)
  const [role, setRole] = useState(null);
  const [cwsname,setCwsname]=useState(null)
  const [cwscode, setCwscode] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshtoken');
    const storedRole = localStorage.getItem('role');
    const storedCwsname = localStorage.getItem('cwsname');
    const storedCwscode = localStorage.getItem('cwscode');
  
    if (storedToken) {
      setToken(storedToken);
      setRefreshtoken(storedRefreshToken);
      setRole(storedRole);
      setCwsname(storedCwsname);
      setCwscode(storedCwscode);
    }
  }, []);
  
  if (!token) {
    return <Login token={token} setToken={setToken} refreshtoken={refreshtoken} setRefreshtoken={setRefreshtoken} role={role} setRole={setRole} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode}/>;
  }

  else{
      return (
      <>
        <Router>
          <div className='flex flex-row'>
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
                <div className='d-flex flex-column justify-content-between'>
                <div>
                    <SidebarItem
                    icon={<NotebookPen size={20} />}
                    text="Add Transactions"
                    alert
                    component={Link}
                    to="/"
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
                    text="Daily Report"
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
                  <SidebarItem
                      icon={<BookUser className='' size={20}/>}
                      text="Register User"
                      component={Link}
                      to="/register-user"
                  />
                </div>
               
                <div className="bg-teal-500 mt-9 text-white rounded-lg">
                  <SidebarItem
                  icon={<CircleUserRound size={20} />}
                  text="Logout"
                  alert
                  component={Link}
                  to="/logout"
                />
                </div> 
              </div>
              </Sidebar>
                
                
              {/* <Sidebar/>*/}
            </div>

            <div className="flex-1 p-4">
              {/* Display the route content here */}
              <Outlet />
              <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/upload-farmer" element={<UploadFarmers/>} />
            <Route path="/" element={<AddTransaction token={token} setToken={setToken} refreshtoken={refreshtoken} role={role} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode}/>} />
            <Route path="/financial-report" element={<FinancialReportContainer />} />
            <Route path="/dpr" element={<DprContainer />} />
            <Route path='/register-user' element={<RegisterUsers/>}/>
            <Route path="/logout" element={<Logout token={token} setToken={setToken} refreshtoken={refreshtoken} role={role} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} />} />

          </Routes>
      
                    {/* <Transactions/> */}
                  </div>
                </div>
        </Router>
                {/* Routes */}
          
      </>
    );
  }

  
}

export default App;
