// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import AddCustomerForm from './Components/AddCustomerForm';
import CustomerDetails from './Components/CustomerDetails';
import CustomerList from './Components/CustomerList';
import './styles/App.css'; // Add your global CSS styling here
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import UpdateCustomer from './Components/UpdateCustomer';

const App = () => {
  return (
    <Provider store={Store}>
    <BrowserRouter>
      <Routes>
        <Route path="/add-customer" element={<AddCustomerForm />} />
        <Route path="/edit-customer" element={<AddCustomerForm />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />
        <Route path="/update-customer/:id" element={<UpdateCustomer />} />
        <Route path="/" element={<CustomerList />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
};

export default App;
