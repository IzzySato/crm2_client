import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  params: {
    pageNum: 1,
    length: 10,
    fields: '',
    sortBy: '_id',
    searchBy: '',
  }
};
const productPageSlice = createSlice({
  name: 'productPage',
  initialState,
  reducers: {
    setProductParams(state, action) {
      state.params = action.payload;
    },
  },
});

export const { setProductParams } = productPageSlice.actions;
export default productPageSlice.reducer;