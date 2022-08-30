import React from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import DeleteDish from "../DeleteDish";

import dishImg from "../../assets/item-1.jpeg";
import updateIcon from "../../assets/icon/updateIcon.png";
import deleteIcon from "../../assets/icon/deleteIcon.png";

import "./style.scss";

const Dishes = ({
  setIdDish,
  indexDish,
  openDeleteWindow,
  addToCart,
  removeDish,
}) => {
  const navigate = useNavigate();

  const dishes = useSelector((state) => state.shopMenu.dishes);

  const updateDishCard = (id) => {
    setIdDish(id);
    navigate(`/dish/${id}/update`);
  };

  return (
    <>
      <div className="dish-wrapper">
        {dishes.map((item, index) => (
          <div className="card-dish" key={`idx-${index}`}>
            <div className="img-wrapper">
              <img src={dishImg} alt="dish-img" className="card-dish__img" />
            </div>
            <div className="info-wrapper">
              <div className="card-dish__name">{item.title}</div>
              <div className="card-dish__description">{item.desc}</div>
              <div className="bottom-wrapper">
                <div className="price-wrapper">
                  <div className="card-dish__price">{item.price} $</div>
                  <button
                    className="card-dish__btn"
                    onClick={() => addToCart(item)}
                  >
                    Add
                  </button>
                </div>
                <div className="function-wrapper">
                  {item.delete && (
                    <img
                      src={deleteIcon}
                      alt="delete-img"
                      className="card-dish__delete-img"
                      onClick={() => openDeleteWindow(index, item._id)}
                    />
                  )}

                  <img
                    src={updateIcon}
                    alt="update-img"
                    className="card-dish__update-img"
                    onClick={() => updateDishCard(item._id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {indexDish > -1 && (
        <DeleteDish
          indexDish={indexDish}
          openDeleteWindow={openDeleteWindow}
          removeDish={removeDish}
        />
      )}
    </>
  );
};

export default Dishes;
