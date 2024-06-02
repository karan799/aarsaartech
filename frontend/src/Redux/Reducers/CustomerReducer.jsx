const initialState = {
  customers: [],
  customer: null,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CUSTOMERS':
      return {
        ...state,
        customers: action.payload,
      };
    case 'ADD_CUSTOMER':
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };
    case 'DELETE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter((customer) => customer._id !== action.payload),
      };
    case 'FETCH_CUSTOMER_BY_ID':
      return {
        ...state,
        customer: action.payload,
      };
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer._id === action.payload._id ? action.payload : customer
        ),
      };
    default:
      return state;
  }
};

export default customerReducer;
