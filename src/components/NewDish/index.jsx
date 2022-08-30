import React from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { createDish } from "../../store/shopMenuSlice.js";

import closeImg from "../../assets/icon/closeIcon.png";

import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

const initialValues = { title: "", category: "", price: "", desc: "" };

const newDishSchema = Yup.object().shape({
  title: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я\s]+$/, "There should be only letters")
    .required("Title is required")
    .max(50, "Title is too long - should be max 50 letters"),
  category: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я\s]+$/, "There should be only letters")
    .required("category is required")
    .max(30, "category is too long - should be max 30 characters"),
  price: Yup.string()
    .matches(
      /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/,
      "Must be a positive number with two decimal places"
    )
    .min(1)
    .required("price is required")
    .max(11, "the price is too long - there should be no more than 10 numbers"),
  desc: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я0-9]/, "There should be only letters")
    .required("description is required")
    .max(250, "description is too long - should be max 250 characters"),
});

const NewDish = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const menu = useSelector((state) => state.shopMenu.menu);

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={newDishSchema}
        onSubmit={(values, actions) => {
          dispatch(createDish({ values, menu }));
          actions.resetForm();
          navigate("/");
        }}
      >
        <Form className="form">
          <div className="update-form">
            <div className="form-border">
              <div className="form-wrapper">
                <div className="img-wrapper">
                  <img
                    src={closeImg}
                    alt="close"
                    className="close-img"
                    onClick={() => navigate("/")}
                  />
                </div>

                <label htmlFor="email">Title:</label>
                <Field
                  type="text"
                  name="title"
                  className="form-field"
                  placeholder="Enter the title of the dish"
                />
                <ErrorMessage name="title" component="div" className="error" />
                <label htmlFor="email">Category:</label>
                <Field
                  type="text"
                  name="category"
                  className="form-field"
                  placeholder="Enter the category of the dish"
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="error"
                />
                <label htmlFor="email">Price:</label>
                <Field
                  type="text"
                  name="price"
                  className="form-field"
                  placeholder="Enter the price of the dish"
                />
                <ErrorMessage name="price" component="div" className="error" />
                <label htmlFor="email">Description:</label>
                <Field
                  type="text"
                  name="desc"
                  className="form-field"
                  placeholder="Enter the description of the dish"
                />
                <ErrorMessage name="desc" component="div" className="error" />
                <div>
                  <button type="submit" className="form-btn">
                    Add a new dish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NewDish;
