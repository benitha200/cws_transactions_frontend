import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import { Bars3Icon, HomeModernIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { LayoutDashboard, Receipt, FileInput, NotebookPen, FileSpreadsheet, FileArchive, PersonStandingIcon, FileArchiveIcon, SquareUserRound, BookUser, CircleUserRound, CoinsIcon, Truck, Briefcase, Home, LucideHome, Edit3, PenBox, BoxIcon, CombineIcon } from 'lucide-react';
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
import Price from './components/Price/Price';
import "./App.css";
import PricingInfo from './components/Price/PricingInfo';
import ReceiveHarvest from './components/CwsTransactions/ReceiveHarvest';
import ReceiveHarvestForm from './components/CwsTransactions/RerceiveHarvestForm';
import ReceivedHarvest from './components/CwsTransactions/ReceivedHarvest';
import StartProcessingForm from './components/CwsTransactions/StartProcessingForm';
import BagOff from './components/CwsTransactions/BagOff';
import BagOffForm from './components/CwsTransactions/BagOffForm';
import Transfer from './components/CwsTransactions/Transfer';
import BatchReport from './components/Reports/BatchReport';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [refreshtoken, setRefreshtoken] = useState(null);
  const [role, setRole] = useState(null);
  const [cwsname, setCwsname] = useState(null);
  const [cwscode, setCwscode] = useState(null);
  const [cws, setCws] = useState(null);
  // const [cwscode, setCwscode] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshtoken');
    const storedRole = localStorage.getItem('role');
    const storedCwsname = localStorage.getItem('cwsname');
    const storedCwscode = localStorage.getItem('cwscode');
    const storedCws=localStorage.getItem('cws')

    if (storedToken) {
      setToken(storedToken);
      setRefreshtoken(storedRefreshToken);
      setRole(storedRole);
      setCwsname(storedCwsname);
      setCwscode(storedCwscode);
      setCws(cws);
    }
  }, []);

  if (token) {
    return (
      <div>
        <Router>
          <div className='flex flex-row w-100'>
            <button
              className="lg:hidden text-gray-500"
              onClick={() => setIsOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
  
            <div
              className={`container-1 bg-white p-2 flex flex-col absolute lg:relative w-100 min-h-screen transition-all duration-300 transform lg:transform-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
              <button
                className="lg:hidden text-gray-500 mb-4"
                onClick={() => setIsOpen(false)}
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
              <Sidebar>
                <div className='d-flex flex-column justify-content-between'>
                 {role === 'CWS Manager' ? ( 
            
  
                    <>
                      <SidebarItem
                        icon={<NotebookPen size={20} />}
                        text="Add Transactions"
                        alert
                        component={Link}
                        to="/add-transaction"
                      />
                      <SidebarItem
                        icon={<FileSpreadsheet size={20} />}
                        text="Daily Report"
                        alert
                        component={Link}
                        to="/"
                      />
                      <SidebarItem
                        icon={<BoxIcon size={20} />}
                        text="Receive Harvest"
                        alert
                        component={Link}
                        to="/receive-harvest"
                      />
                      <SidebarItem
                        icon={<Home size={20} />}
                        text="Processing"
                        alert
                        component={Link}
                        to="/processing
                        "
                      />
                      <SidebarItem
                        icon={<Briefcase size={20} />}
                        text="Bagging Off"
                        alert
                        component={Link}
                        to="/bag-off"
                      />
                      <SidebarItem
                        icon={<Truck size={20} />}
                        text="ReadyTo Transfer"
                        alert
                        component={Link}
                        to="/transfer"
                      />
                      <SidebarItem
                        icon={<CombineIcon size={20} />}
                        text="Batch Report"
                        alert
                        component={Link}
                        to="/batchreport"
                      />
                    </>
                  ) : (
                    <>
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
                        to="/"
                      />
                      <SidebarItem
                        icon={<FileArchive size={20} />}
                        text="DPR"
                        alert
                        component={Link}
                        to="/dpr"
                      />
                      <SidebarItem
                        icon={<BookUser className='' size={20} />}
                        text="Register User"
                        component={Link}
                        to="/register-user"
                      />
                    
                    <SidebarItem
                    icon={<CoinsIcon className='' size={20} />}
                    text="Station Pricing"
                    component={Link}
                    to="/price"
                  />
                  <SidebarItem
                    icon={<CoinsIcon className='' size={20} />}
                    text="Pricing Info"
                    component={Link}
                    to="/price-info"
                  />
                </>
                  )}
                  <div className="bg-slate-400 mt-9 text-white rounded-lg">
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
            </div>
  
            <div className="container-2 p-4 w-full mx-auto">
              <Outlet />
              <Routes>
                
                <Route path="/upload-farmer" element={<UploadFarmers />} />
                <Route path="/add-transaction" element={<AddTransaction token={token} setToken={setToken} refreshtoken={refreshtoken} role={role} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} cws={cws} />} />
                <Route path="/" element={<FinancialReportContainer token={token}/>} />
                <Route path="/dpr" element={<DprContainer />} />
                <Route path='/register-user' element={<RegisterUsers token={token} />} />
                <Route path='/price' element={<Price token={token} />} />
                <Route path='/login' element={<Login token={token} setToken={setToken} refreshtoken={refreshtoken} setRefreshtoken={setRefreshtoken} role={role} setRole={setRole} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} cws={cws} setCws={setCws}/>}/>
                <Route path='/price-info' element={<PricingInfo token={token} />} />
                <Route path='/receive-harvest' element={<ReceiveHarvest token={token} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} cws={cws}/>} />
                <Route path='/receive-harvest-form' element={<ReceiveHarvestForm/>} />
                <Route path='/start-processing-form' element={<StartProcessingForm/>} />
                <Route path='/bag-off-form' element={<BagOffForm/>} />
                <Route path="/logout" element={<Logout token={token} setToken={setToken} refreshtoken={refreshtoken} role={role} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} />} />
                <Route path='/processing' element={<ReceivedHarvest token={token} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} cws={cws}/>} />
                <Route path='/bag-off' element={<BagOff token={token} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} cws={cws}/>} />
                <Route path='/transfer' element={<Transfer token={token} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} cws={cws}/>} />
                <Route path='/batchreport' element={<BatchReport token={token} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} cws={cws}/>} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    );
   
  }
  else{
      return (
    <div>
      <Router>
        <div className='flex flex-row w-100'>
          <button
            className="lg:hidden text-gray-500"
            onClick={() => setIsOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div
            className={`container-1 bg-white p-2 flex flex-col absolute lg:relative w-100 min-h-screen transition-all duration-300 transform lg:transform-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <button
              className="lg:hidden text-gray-500 mb-4"
              onClick={() => setIsOpen(false)}
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
            <Sidebar>
              <div className='d-flex flex-column justify-content-between'>
               {/* {role !== 'CWS Manager' ? (  */}
          

                  <>
                    <SidebarItem
                      icon={<Home size={20} />}
                      text="Dashboard"
                      alert
                      component={Link}
                      to="/dashboard"
                    />
                    <SidebarItem
                      icon={<NotebookPen size={20} />}
                      text="Add Transactions"
                      alert
                      component={Link}
                      to="/add-transaction"
                    />
                    <SidebarItem
                      icon={<FileSpreadsheet size={20} />}
                      text="Daily Report"
                      alert
                      component={Link}
                      to="/"
                    />
                    <SidebarItem
                      icon={<BoxIcon size={20} />}
                      text="Receive Harvest"
                      alert
                      component={Link}
                      to="/receive-harvest"
                    />
                    <SidebarItem
                      icon={<Home size={20} />}
                      text="Processing"
                      alert
                      component={Link}
                      to="/processing
                      "
                    />
                    <SidebarItem
                      icon={<Briefcase size={20} />}
                      text="Bagging Off"
                      alert
                      component={Link}
                      to="/bag-off"
                    />
                    <SidebarItem
                      icon={<Truck size={20} />}
                      text="ReadyTo Transfer"
                      alert
                      component={Link}
                      to="/transfer"
                    />
                    <SidebarItem
                      icon={<CombineIcon size={20} />}
                      text="Batch Report"
                      alert
                      component={Link}
                      to="/batchreport"
                    />
                  </>
                {/* ) : ( */}
                  <>
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
                      to="/"
                    />
                    <SidebarItem
                      icon={<FileArchive size={20} />}
                      text="DPR"
                      alert
                      component={Link}
                      to="/dpr"
                    />
                    <SidebarItem
                      icon={<BookUser className='' size={20} />}
                      text="Register User"
                      component={Link}
                      to="/register-user"
                    />
                  
                  <SidebarItem
                  icon={<CoinsIcon className='' size={20} />}
                  text="Station Pricing"
                  component={Link}
                  to="/price"
                />
                <SidebarItem
                  icon={<CoinsIcon className='' size={20} />}
                  text="Pricing Info"
                  component={Link}
                  to="/price-info"
                />
              </>
                {/* )} */}
                <div className="bg-slate-400 mt-9 text-white rounded-lg">
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
          </div>

          <div className="container-2 p-4 w-full mx-auto">
            <Outlet />
            <Routes>
              
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload-farmer" element={<UploadFarmers />} />
              <Route path="/add-transaction" element={<AddTransaction token={token} setToken={setToken} refreshtoken={refreshtoken} role={role} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} cws={cws} />} />
              <Route path="/" element={<FinancialReportContainer token={token}/>} />
              <Route path="/dpr" element={<DprContainer />} />
              <Route path='/register-user' element={<RegisterUsers token={token} />} />
              <Route path='/price' element={<Price token={token} />} />
              <Route path='/login' element={<Login token={token} setToken={setToken} refreshtoken={refreshtoken} setRefreshtoken={setRefreshtoken} role={role} setRole={setRole} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} cws={cws} setCws={setCws}/>}/>
              <Route path='/price-info' element={<PricingInfo token={token} />} />
              <Route path='/receive-harvest' element={<ReceiveHarvest token={token} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} cws={cws}/>} />
              <Route path='/receive-harvest-form' element={<ReceiveHarvestForm/>} />
              <Route path='/start-processing-form' element={<StartProcessingForm/>} />
              <Route path='/bag-off-form' element={<BagOffForm/>} />
              <Route path="/logout" element={<Logout token={token} setToken={setToken} refreshtoken={refreshtoken} role={role} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} />} />
              <Route path='/processing' element={<ReceivedHarvest token={token} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} cws={cws}/>} />
              <Route path='/bag-off' element={<BagOff token={token} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} cws={cws}/>} />
              <Route path='/transfer' element={<Transfer token={token} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} cws={cws}/>} />
              <Route path='/batchreport' element={<BatchReport token={token} cwsname={cwsname} setCwscode={setCwscode} setCwsname={setCwsname} cwscode={cwscode} cws={cws}/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
  }


}

export default App;

