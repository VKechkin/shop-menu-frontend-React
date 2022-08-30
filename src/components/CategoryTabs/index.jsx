import React from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { v4 } from "uuid";

import { setDishes } from "../../store/shopMenuSlice.js";

import "./style.scss";

const CategoryTabs = ({ btnColor, setBtnColor, showAll, сategoryDishes }) => {
  const menu = useSelector((state) => state.shopMenu.menu);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeCategory = (name) => {
    navigate(`/category/${name}`);
    setBtnColor(`tab+${name}`);
    dispatch(setDishes(menu.filter((item) => item.category === name)));
  };

  return (
    <div className="tabs-wrapper">
      <div
        className={btnColor === "main" ? "pressed-tab" : "tab"}
        onClick={() => showAll()}
      >
        Main
      </div>
      {сategoryDishes.map((item) => (
        <div
          name={item}
          className={btnColor === `tab+${item}` ? "pressed-tab" : "tab"}
          key={`id-${v4()}`}
          onClick={(e) => changeCategory(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default CategoryTabs;
