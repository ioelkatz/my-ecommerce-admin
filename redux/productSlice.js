import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: "",
  reducers: {
    getAllProducts(state, action) {
      return action.payload;
    },
    editProduct(state, action) {
      return state.map((car) => {
        return car.id === action.payload.id ? action.payload : car;
      });
    },
    deleteProduct(state, action) {
      return state.filter((car) => car.id !== action.payload);
    },
    createProduct(state, action) {
      state.push(action.payload);
    },
  },
});

const { actions, reducer } = productSlice;
export const { getAllProducts, deleteProduct, editProduct, createProduct } = actions;
export default reducer;
