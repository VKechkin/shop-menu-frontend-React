import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { updateDish, getAllDishes } from "../../store/shopMenuSlice.js";

import closeImg from "../../assets/icon/closeIcon.png";

import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

const updateDishSchema = Yup.object().shape({
  title: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я\s]+$/, "There should be only letters")
    .required("Title is required")
    .max(50, "Title is too long - should be max 50 letters"),
  price: Yup.string()
    .matches(
      /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/,
      "Must be a positive number with two decimal places"
    )
    .required("price is required")
    .max(11, "the price is too long - there should be no more than 10 numbers"),
  desc: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я0-9]/, "There should be only letters")
    .required("description is required")
    .max(250, "description is too long - should be max 250 characters"),
});

const UpdateDish = () => {
  const { id } = useParams();

  const menu = useSelector((state) => state.shopMenu.menu);
  const dish = menu.filter((el) => el._id === id);

  const [infoForUpdate, setInfoForUpdate] = useState(dish[0]);
  const [сategories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeUpdateDishCard = () => {
    dispatch(getAllDishes());
    navigate("/");
  };

  const handleChangeData = (inputName, value, setFieldValue) => {
    setFieldValue(inputName, value);
    setInfoForUpdate({
      ...infoForUpdate,
      [inputName]: value,
    });
  };

  useEffect(() => {
    menu.forEach((item) => {
      if (!сategories.includes(item.category)) {
        setCategories([...сategories, item.category]);
      }
    });
  }, [menu, сategories]);

  const showСategories = () =>
    сategories.map((el) => (
      <option key={`idx-${v4()}`} value={el}>
        {el}
      </option>
    ));

  const initialValues = {
    title: infoForUpdate.title,
    category: infoForUpdate.category,
    price: infoForUpdate.price,
    desc: infoForUpdate.desc,
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={updateDishSchema}
        onSubmit={(values) => {
          dispatch(updateDish({ values, id, menu }));
          navigate("/");
        }}
      >
        {({ setFieldValue }) => (
          <Form className="form">
            <div className="update-form">
              <div className="form-border">
                <div className="form-wrapper">
                  <div className="img-wrapper">
                    <img
                      src={closeImg}
                      alt="close"
                      className="close-img"
                      onClick={() => closeUpdateDishCard()}
                    />
                  </div>
                  <label htmlFor="email">Title:</label>
                  <Field
                    type="text"
                    name="title"
                    className="form-field"
                    value={infoForUpdate.title || ""}
                    onChange={(e) =>
                      handleChangeData(
                        e.target.name,
                        e.target.value,
                        setFieldValue
                      )
                    }
                    placeholder="Enter the title of the dish"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="error"
                  />
                  <label htmlFor="text">Category:</label>
                  <Field
                    name="category"
                    as="select"
                    className="form-field form-field-metod"
                    value={infoForUpdate.category || ""}
                    onChange={(e) =>
                      handleChangeData(
                        e.target.name,
                        e.target.value,
                        setFieldValue
                      )
                    }
                  >
                    {showСategories()}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="error"
                  />
                  <label htmlFor="email">Price:</label>
                  <Field
                    type="number"
                    name="price"
                    className="form-field"
                    value={infoForUpdate.price || ""}
                    onChange={(e) =>
                      handleChangeData(
                        e.target.name,
                        e.target.value,
                        setFieldValue
                      )
                    }
                    placeholder="Enter the price of the dish"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="error"
                  />
                  <label htmlFor="email">Description:</label>
                  <Field
                    type="text"
                    name="desc"
                    className="form-field"
                    value={infoForUpdate.desc || ""}
                    onChange={(e) =>
                      handleChangeData(
                        e.target.name,
                        e.target.value,
                        setFieldValue
                      )
                    }
                    placeholder="Enter the description of the dish"
                  />
                  <ErrorMessage name="desc" component="div" className="error" />
                  <div>
                    <button type="submit" className="form-btn">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateDish;
