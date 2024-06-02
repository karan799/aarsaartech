// CustomerDetails.jsx
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/CustomerDetails.css';
import { getCustomerById } from '../Redux/actions/customerActions';

const CustomerDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate()

  console.log(id);
  const customer = useSelector((state) => state.customerReducer.customer);
  useEffect(() => {
    dispatch(getCustomerById(id));
  }, [dispatch, id]);

  if (!customer) return <div className="not-found">Customer not found</div>;

  return (
    <div className="form-container">
      <div className="actions">
        <button className="view-all-button" onClick={() => navigate('/')}>View All Customers</button>
        <button className="add-customer-button" onClick={() => navigate('/add-customer')}>Add Customer</button>
      </div>
      <div className="header">
        <h2>Customer Details</h2>
      </div>
      <div className="customer-details-card">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <span>{customer.firstName}</span>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <span>{customer.lastName}</span>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <span>{customer.email}</span>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <span>{customer.phone}</span>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="alternatePhone">Alternate Phone:</label>
            <span>{customer.alternatePhone || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
