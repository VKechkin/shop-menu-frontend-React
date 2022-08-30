import React from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import "./style.scss";

const OrderDetail = () => {
  const navigate = useNavigate();

  const order = useSelector((state) => state.shopMenu.order);
  const totalSum = useSelector((state) => state.shopMenu.totalSum);

  const { name, phone, email, method, comments, delivery } = order;

  return (
    <div className="container">
      <div className="detail-wrapper">
        <div className="tab" onClick={() => navigate("/")}>
          Main
        </div>
        <div className="order-wrapper">
          <div className="order-detail-wrapper">
            <div className="order-info-order">Your order:</div>
            <div className="order-info">Name: {name}</div>
            <div className="order-info">Phone: {phone}</div>
            <div className="order-info">Email: {email}</div>
            <div className="order-info">Method: {method}</div>
            <div className="order-info">Comments: {comments}</div>
            <div className="order-info">Shipping: {delivery}</div>
            <div className="order-info">Total sum: {totalSum}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
