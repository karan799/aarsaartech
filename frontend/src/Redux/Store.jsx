
import customerReducer from './Reducers/CustomerReducer';

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {customerReducer},
})

