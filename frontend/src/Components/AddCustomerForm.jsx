import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer } from '../Redux/actions/customerActions';
import '../styles/addCustomer.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCustomerForm = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    alternatePhone: '',
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customerReducer.customers);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!customer.firstName) newErrors.firstName = 'First name is required';
    if (!customer.lastName) newErrors.lastName = 'Last name is required';
    if (!customer.email) newErrors.email = 'Email is required';
    if (!customer.phone) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Check if email already exists
      const emailExists = customers.some((cust) => cust.email === customer.email);
      if (emailExists) {
        toast.error('Email already used');
      } else {
        dispatch(addCustomer(customer));
        toast.success('Customer added successfully');
        navigate('/');
      }
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <div className="actions">
        <button className="view-all-button" onClick={() => navigate('/')}>View All Customers</button>
        <button className="add-customer-button" onClick={() => navigate('/add-customer')}>Add Customer</button>
      </div>
      <div className="header">
        <h2>Add Customer</h2>
      </div>
      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={customer.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
              required
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={customer.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error' : ''}
              required
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={customer.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={customer.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              required
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="alternatePhone">Alternate Phone</label>
            <input
              type="text"
              id="alternatePhone"
              name="alternatePhone"
              placeholder="Alternate Phone"
              value={customer.alternatePhone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="submit-row">
          <button type="submit" className="submit-button">Add Customer</button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomerForm;
