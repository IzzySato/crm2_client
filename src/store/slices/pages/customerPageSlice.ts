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
    setParams(state, action) {
      state.params = action.payload;
    },
  },
});

export const { setParams } = customerPageSlice.actions;
export default customerPageSlice.reducer;
