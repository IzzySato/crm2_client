import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  params: {
    pageNum: 1,
    length: 10,
    fields: 'firstName lastName email phone _id addresses',
    sortBy: '_id',
    searchBy: '',
  }
};
const customerPageSlice = createSlice({
  name: 'customerPage',
  initialState,
  reducers: {
    setCustomerParams(state, action) {
      state.params = action.payload;
    },
  },
});

export const { setCustomerParams } = customerPageSlice.actions;
export default customerPageSlice.reducer;
