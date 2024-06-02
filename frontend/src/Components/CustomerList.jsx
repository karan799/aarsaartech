import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, deleteCustomer } from '../Redux/actions/customerActions';
import '../styles/CustomerList.css';
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customerReducer.customers || []);
  const [searchTermName, setSearchTermName] = useState('');
  const [searchTermMobile, setSearchTermMobile] = useState('');
  const [searchTermEmail, setSearchTermEmail] = useState('');
  const [searchTermDate, setSearchTermDate] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleDelete = (id) => {
    setCustomerToDelete(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    dispatch(deleteCustomer(customerToDelete));
    setShowConfirmDelete(false);
    setCustomerToDelete(null);
  };

  const filteredList = customers.filter((customer) => {
    const nameSearchString = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    const mobileSearchString = customer.phone.toLowerCase();
    const emailSearchString = customer.email.toLowerCase();
    const dateSearchString = customer.createdAt && customer.createdAt.toLowerCase();

    return (
      nameSearchString.includes(searchTermName.toLowerCase()) &&
      mobileSearchString.includes(searchTermMobile.toLowerCase()) &&
      emailSearchString.includes(searchTermEmail.toLowerCase()) &&
      (!searchTermDate || dateSearchString.includes(searchTermDate.toLowerCase()))
    );
  });

  return (
    <div>
      <div className="actions">
        <button className="view-all-button" onClick={() => navigate('/')}>View All Customers</button>
        <button className="add-customer-button" onClick={() => navigate('/add-customer')}>Add Customer</button>
      </div>
      <div className="search-bar">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTermName}
            onChange={(e) => setSearchTermName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by mobile number..."
            value={searchTermMobile}
            onChange={(e) => setSearchTermMobile(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by email..."
            value={searchTermEmail}
            onChange={(e) => setSearchTermEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by date..."
            value={searchTermDate}
            onChange={(e) => setSearchTermDate(e.target.value)}
          />
        </div>
      </div>
      <table className="customer-list">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.length > 0 ? (
            filteredList.map((customer, index) => (
              <tr key={customer._id}>
                <td>{index + 1}</td>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <div className="action-icons">
                    <button className="edit-icon" title="Edit"><i className="fas fa-pencil-alt" onClick={() => { navigate(`/update-customer/${customer._id}`) }}></i></button>
                    <button className="view-icon" title="View"><i className="fas fa-eye" onClick={() => { navigate(`/customers/${customer._id}`) }}></i></button>
                    <button className="delete-icon" title="Delete" onClick={() => handleDelete(customer._id)}><i className="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-customers">No customers found</td>
            </tr>
          )}
        </tbody>
      </table>
      {showConfirmDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this customer?</p>
            <button className="confirm-button" onClick={confirmDelete}>Yes</button>
            <button className="cancel-button" onClick={() => setShowConfirmDelete(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
