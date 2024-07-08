import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './navbar/NavBar';
import AllCustomers from './components/AllCustomers';
import SimDetails from './components/SimDetails';
import ValidateCustomers from './components/ValidateCustomers';
import ValidateCustomerDetail from './components/ValidateCustomerDetail';
import ValidateIdProof from './components/ValidateIdProof';
import PageNotFound from './components/PageNotFound';
import ShowSpecialOffers from './components/ShowSpecialOffers';
import ThankYou from './components/ThankYou';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
              <Route path='/' element={<NavBar />}>

              <Route index element={<AllCustomers />} />
              <Route path="c2" element={<SimDetails/>} />
              <Route path="c3" element={<ValidateCustomers />} />
              <Route path="c4" element={<ValidateCustomerDetail />} />
              <Route path="c5" element={<ValidateIdProof />} />
              <Route path="c6" element={<ShowSpecialOffers />} />
              
              </Route>
              <Route path="t" element={<ThankYou />} />
              <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
