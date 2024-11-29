import { createSlice } from "@reduxjs/toolkit";

const brandSlice = createSlice({
  name: "brand",
  initialState: "",
  reducers: {
    getAllBrands(state, action) {
      return action.payload;
    },
    editBrand(state, action) {
      return state.map((brand) => {
        return brand.id === action.payload.id ? action.payload : brand;
      });
    },
    deleteBrand(state, action) {
      return state.filter((brand) => brand.id !== action.payload);
    },
    createBrand(state, action) {
      state.push(action.payload);
    },
  },
});

const { actions, reducer } = brandSlice;
export const { getAllBrands, deleteBrand, editBrand, createBrand } = actions;
export default reducer;
