import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { setOrderItems, setTotalSum } from "../../store/shopMenuSlice.js";

import dishImg from "../../assets/item-1.jpeg";
import closeIcon from "../../assets/icon/closeIcon.png";

import "./style.scss";

const ShopCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderItems = useSelector((state) => state.shopMenu.orderItems);
  const totalSum = useSelector((state) => state.shopMenu.totalSum);

  const updateTotal = (value, item) => {
    const { title, desc, price, _id } = item;

    const itemsForOrder = orderItems.filter((item) => item._id !== _id);

    const sum = value * price;

    dispatch(
      setOrderItems([
        ...itemsForOrder,
        { _id, count: value, sum, title, desc, price },
      ])
    );
    dispatch(setTotalSum(0));
  };

  useEffect(() => {
    dispatch(setTotalSum(0));
    const initValue = 0;
    const sum =
      Math.floor(
        orderItems.reduce(
          (accumulator, value) => accumulator + value.sum,
          initValue
        ) * 100
      ) / 100;
    dispatch(setTotalSum(sum));
  }, [orderItems, dispatch, navigate]);

  const deleteFromOrder = (id) => {
    const items = orderItems.filter((item) => item._id !== id);
    dispatch(setOrderItems(items));
    dispatch(setTotalSum(0));
  };

  return (
    <div className="container">
      <div className="height-wrapper">
        <div className="dish-wrapper">
          {!totalSum && <div>Please add the dishes to the cart</div>}
          {orderItems.map((item) => (
            <div className="card-dish" key={`idx-${item._id}`}>
              <div className="img-wrapper">
                <img src={dishImg} alt="dish-img" className="card-dish__img" />
              </div>
              <div className="dish">
                <div className="info">
                  <div className="card-dish__name">{item.title}</div>
                  <div className="card-dish__description">{item.desc}</div>
                  <div className="bottom-wrapper">
                    <div className="price-wrapper">
                      <div className="card-dish__price">{item.price}</div>
                      <div className="card-dish__total">Total</div>
                      <input
                        onKeyPress={(e) => (e.target.value = "")}
                        id="pyat"
                        type="number"
                        name="newCountDish"
                        value={item.count}
                        min="0"
                        max="10"
                        className="card-dish__count"
                        onChange={(event) =>
                          updateTotal(event.target.value, item)
                        }
                        onBlur={() =>
                          item.count < 1 ? deleteFromOrder(item._id) : null
                        }
                      />
                      <div className="card-dish__sumForDish">Total amount:</div>
                      <div className="card-dish__sumForDish">
                        {item.count > 0 ? Math.floor(item.sum * 100) / 100 : 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="delete-img-wrapper">
                <img
                  src={closeIcon}
                  alt="delete-img"
                  className="card-dish__delete-img"
                  onClick={() => deleteFromOrder(item._id)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="header-order">
          <div className="order" onClick={() => navigate("/order")}>
            To order
          </div>
          <div className="total-sum">
            Total sum:
            {totalSum}
          </div>
          <div className="btn-close" onClick={() => navigate("/")}>
            Go menu
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCart;
