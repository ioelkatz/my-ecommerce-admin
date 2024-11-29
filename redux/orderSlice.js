import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "admin",
  initialState: "",
  reducers: {
    getAllOrders(state, action) {
      return action.payload;
    },
    editOrder(state, action) {
      return state.map((admin) => {
        return admin.id === action.payload.id ? action.payload : admin;
      });
    },
    deleteOrder(state, action) {
      return state.filter((admin) => admin.id !== action.payload);
    },
    createOrder(state, action) {
      state.push(action.payload);
    },
  },
});

const { actions, reducer } = orderSlice;
export const { getAllOrders, deleteOrder, editOrder, createOrder } = actions;
export default reducer;
