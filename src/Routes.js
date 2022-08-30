import React from "react";
import { Navigate } from "react-router-dom";

import Main from "./components/Main";
import Order from "./components/Order";
import Dishes from "./components/Dishes";
import NewDish from "./components/NewDish";
import ShopCart from "./components/ShopCart";
import UpdateDish from "./components/UpdateDish";
import OrderDetail from "./components/OrderDetail";

const Routes = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/dish/new",
    element: <NewDish />,
  },
  {
    path: "/cart",
    element: <ShopCart />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/order/detail",
    element: <OrderDetail />,
  },
  {
    path: "/dish/:id/update",
    element: <UpdateDish />,
  },
  {
    path: "/category/:type",
    element: (
      <Main>
        <Dishes />
      </Main>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default Routes;
