import axios from 'axios';

export const fetchCustomers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${window.location.origin}/api/customers`);
    dispatch({ type: 'FETCH_CUSTOMERS', payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const addCustomer = (customer) => async (dispatch) => {
  try {
    const response = await axios.post(`${window.location.origin}/api/customers`, customer);
    dispatch({ type: 'ADD_CUSTOMER', payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCustomer = (id) => async (dispatch) => {
  try {
    await axios.delete(`${window.location.origin}/api/customers/${id}`);
    dispatch({ type: 'DELETE_CUSTOMER', payload: id });
  } catch (error) {
    console.log(error);
  }
};

// Action to fetch a customer by ID
export const getCustomerById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${window.location.origin}/api/customers/${id}`);
    dispatch({ type: 'FETCH_CUSTOMER_BY_ID', payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

// Action to update a customer
export const updateCustomer = (id, customerData) => async (dispatch) => {
  try {
    console.log(customerData);
    const response = await axios.patch(`${window.location.origin}/api/customers/${id}`, customerData);
    dispatch({ type: 'UPDATE_CUSTOMER', payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

