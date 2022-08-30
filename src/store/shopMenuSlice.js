import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const URI = process.env.REACT_APP_BACKEND_URI;

const notifyDelete = () =>
  toast.success("Dish removed", { position: "bottom-right", autoClose: 1000 });
const notifySuccess = () =>
  toast.success("New dish added", {
    position: "bottom-right",
    autoClose: 1000,
  });
const notifyUpdate = () =>
  toast.success("Dish updated", { position: "bottom-right", autoClose: 1000 });

export const getAllDishes = createAsyncThunk(
  "shopMenu/getAllDishes",
  async (_, { rejectWhithValue, dispatch }) => {
    await axios
      .get(`${URI}/dishes/list`)
      .then((res) => {
        const { data } = res.data;
        dispatch(setMenu(data));
      })
      .catch((error) =>
        toast.error(error, { position: "bottom-right", autoClose: 1000 })
      );
  }
);

export const createDish = createAsyncThunk(
  "shopMenu/createDish",
  async ({ values, menu }, { rejectWhithValue, dispatch }) => {
    await axios
      .post(`${URI}/dishes/new`, {
        title: values.title,
        category: values.category,
        price: values.price,
        desc: values.desc,
        delete: true,
      })
      .then((res) => {
        const { data } = res.data;
        dispatch(setMenu([...menu, data]));
        notifySuccess();
      })
      .catch((error) =>
        toast.error(error, { position: "bottom-right", autoClose: 1000 })
      );
  }
);

export const deleteDish = createAsyncThunk(
  "shopMenu/deleteDish",
  async ({ idDish, newDishes }, { rejectWhithValue, dispatch }) => {
    await axios
      .delete(`${URI}/dishes/${idDish}`)
      .then(() => {
        dispatch(setDishes([...newDishes]));
        notifyDelete();
      })
      .catch((error) =>
        toast.error(error, { position: "bottom-right", autoClose: 1000 })
      );
  }
);

export const updateDish = createAsyncThunk(
  "shopMenu/updateDish",
  async ({ values, id, menu }, { rejectWhithValue, dispatch }) => {
    await axios
      .patch(`${URI}/dishes/${id}`, {
        _id: id,
        title: values.title,
        category: values.category,
        price: values.price,
        desc: values.desc,
      })
      .then((res) => {
        dispatch(
          setMenu([
            ...menu,
            {
              _id: id,
              title: values.title,
              category: values.category,
              price: values.price,
              desc: values.desc,
            },
          ])
        );
        notifyUpdate();
      })
      .catch((error) =>
        toast.error(error.message, {
          position: "bottom-right",
          autoClose: 1000,
        })
      );
  }
);

export const createOrder = createAsyncThunk(
  "shopMenu/createOrder",
  async (values, { rejectWhithValue, dispatch }) => {
    await axios
      .post(`${URI}/orders/new`, {
        name: values.name,
        phone: values.phone,
        email: values.email || "",
        delivery: values.delivery || "",
        method: values.method,
        comments: values.comments || "",
      })
      .then((res) => {
        const { data } = res.data;
        dispatch(setOrder(data));
        toast.success("Order placed");
      })
      .catch((error) =>
        toast.error(error.message, {
          position: "bottom-right",
          autoClose: 1000,
        })
      );
  }
);

const shopMenuSlice = createSlice({
  name: "shopMenu",
  initialState: {
    menu: [],
    orderItems: [],
    order: [],
    dishes: [],
    totalSum: 0,
  },
  reducers: {
    setMenu(state, action) {
      state.menu = action.payload;
    },
    setOrderItems(state, action) {
      state.orderItems = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    setDishes(state, action) {
      state.dishes = action.payload;
    },
    setTotalSum(state, action) {
      state.totalSum = action.payload;
    },
  },
  extraReducers: {
    [getAllDishes.rejected]: () => new Error("Error getting all dishes!"),
    [createDish.rejected]: () => new Error("Error adding new dish!"),
    [deleteDish.rejected]: () => new Error("This dish was not found!"),
    [updateDish.rejected]: () => new Error("Dish data update error!"),
    [createOrder.rejected]: () => new Error("Error adding new order!"),
  },
});

export default shopMenuSlice.reducer;

export const { setMenu, setOrderItems, setOrder, setDishes, setTotalSum } =
  shopMenuSlice.actions;
