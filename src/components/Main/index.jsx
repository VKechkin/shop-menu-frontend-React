import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import CategoryTabs from "../CategoryTabs";
import Dishes from "../Dishes";

import {
  setOrderItems,
  getAllDishes,
  deleteDish,
  setDishes,
  setMenu,
} from "../../store/shopMenuSlice.js";

import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menu = useSelector((state) => state.shopMenu.menu);
  const orderItems = useSelector((state) => state.shopMenu.orderItems);
  const dishes = useSelector((state) => state.shopMenu.dishes);

  const [indexDish, setIndexDish] = useState(-1);
  const [dishCategory, setDishCategory] = useState("");
  const [idDish, setIdDish] = useState("");
  const [сategoryDishes, setCategoryDishes] = useState([]);

  menu.forEach((item) =>
    !сategoryDishes.includes(item.category)
      ? setCategoryDishes([...сategoryDishes, item.category])
      : null
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setDishes(menu));
    navigate("/");
  }, [menu, dispatch]);

  useEffect(() => {
    dispatch(getAllDishes());
  }, [dispatch]);

  const openDeleteWindow = (index, id) => {
    setIdDish(id);
    setIndexDish(index);
  };

  const [btnColor, setBtnColor] = useState("main");

  const dishToDelete = menu.find((el) => el._id === idDish);

  const newMenu = menu.filter((el) => el._id !== idDish);

  const newDishes = dishes.filter((item) => item._id !== idDish);

  const removeDish = () => {
    setIndexDish(-1);

    dispatch(setMenu(newMenu));
    dispatch(deleteDish({ idDish, newDishes }));

    const newCategory = сategoryDishes.filter(
      (item) => item !== dishToDelete.category
    );

    if (!newDishes.length) {
      const newCategories = сategoryDishes.filter(
        (el) => el !== dishToDelete.category
      );
      setCategoryDishes(newCategories);
      setBtnColor("main");
      setDishCategory("");
    }
    if (newDishes) {
      setCategoryDishes(newCategory);
    }
  };

  const showAll = () => {
    navigate("/");
    dispatch(setDishes(menu));
    setBtnColor("main");
  };

  const addToCart = (item) => {
    const { title, desc, price, _id } = item;
    const count = 1;

    if (!orderItems.length) {
      dispatch(setOrderItems([{ _id, count, sum: price, title, desc, price }]));
    } else {
      // const repeatDish = orderItems.find((el) => el._id === _id);

      orderItems.forEach((el) => {
        if (el._id === _id) {
          const dishesForOrder = orderItems.filter(
            (dish) => dish._id !== el._id
          );
          console.log("dishesForOrder", dishesForOrder);
          dispatch(
            setOrderItems([
              ...dishesForOrder,
              {
                _id,
                count: el.count + 1,
                sum: el.sum + price,
                title,
                desc,
                price,
              },
            ])
          );
        } else {
          dispatch(
            setOrderItems([
              ...orderItems,
              { _id, count, sum: price, title, desc, price },
            ])
          );
        }
      });
    }

    toast.success("Dish added", { position: "bottom-right", autoClose: 10 });
  };

  const goToCart = () => {
    navigate("/cart");
    dispatch(getAllDishes());
  };

  return (
    <main>
      <div className="header">
        <div className="dish" onClick={() => navigate("/dish/new")}>
          New dish
        </div>
        <div className="cart" onClick={() => goToCart()}>
          Go to cart
        </div>
      </div>
      {!menu.length && (
        <Box className="progress" sx={{ display: "flex" }}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      {menu.length > 0 && (
        <CategoryTabs
          setDishCategory={setDishCategory}
          btnColor={btnColor}
          setBtnColor={setBtnColor}
          showAll={showAll}
          сategoryDishes={сategoryDishes}
        />
      )}
      <Dishes
        setIdDish={setIdDish}
        indexDish={indexDish}
        openDeleteWindow={openDeleteWindow}
        addToCart={addToCart}
        removeDish={removeDish}
        dishCategory={dishCategory}
      />
    </main>
  );
};

export default Main;
