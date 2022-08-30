import React from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import InputMask from "react-input-mask";

import { createOrder, setOrderItems } from "../../store/shopMenuSlice.js";

import closeImg from "../../assets/icon/closeIcon.png";

import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  delivery: "",
  method: "credit card",
  comments: "",
};

const orderSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я\s]+$/, "There should be only letters")
    .required("name is required")
    .max(35, "name is too long - should be max 35 characters"),
  phone: Yup.string()
    .required("phone is required")
    .matches(
      /^(\+7|7|8)?[\s]?\(?[0-9]{3}\)?[\s]?[0-9]{3}[\s]?[0-9]{2}[\s]?[0-9]{2}$/,
      "Enter the phone number in full"
    ),
  email: Yup.string().email("Must be a valid email"),
  delivery: Yup.string().max(
    150,
    "delivery is too long - should be max 150 characters"
  ),
  comments: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я0-9]/, "There should be only letters")
    .max(500, "delivery is too long - should be max 500 characters"),
});

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={orderSchema}
        onSubmit={(values) => {
          dispatch(createOrder(values));
          dispatch(setOrderItems([]));
          navigate("/order/detail");
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
                      onClick={() => navigate("/cart")}
                    />
                  </div>
                  <label htmlFor="text">Name:</label>
                  <Field
                    type="text"
                    name="name"
                    className="form-field"
                    placeholder="Enter the name"
                  />
                  <ErrorMessage name="name" component="div" className="error" />
                  <label htmlFor="text">Phone number:</label>
                  <Field
                    id="phone"
                    type="text"
                    name="phone"
                    render={({ field }) => (
                      <InputMask
                        {...field}
                        className="form-field"
                        mask="+7 (999) 999 9999"
                        placeholder="Enter your phone number"
                        type="text"
                        onChange={(e) => {
                          setFieldValue("phone", e.target.value);
                        }}
                      />
                    )}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                  <label htmlFor="text">Email:</label>
                  <Field
                    type="email"
                    name="email"
                    className="form-field"
                    placeholder="Enter the email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                  <label htmlFor="text">Shipping address:</label>
                  <Field
                    type="text"
                    name="delivery"
                    className="form-field"
                    placeholder="Enter the delivery address"
                  />
                  <ErrorMessage
                    name="delivery"
                    component="div"
                    className="error"
                  />
                  <label htmlFor="text">Payment method:</label>
                  <Field
                    name="method"
                    as="select"
                    className="form-field form-field-metod"
                  >
                    <option value="credit card">credit card</option>
                    <option value="cash">cash</option>
                    <option value="ApplePay">ApplePay</option>
                    <option value="GooglePay">GooglePay</option>
                  </Field>
                  <ErrorMessage
                    name="method"
                    component="div"
                    className="error"
                  />
                  <label htmlFor="text">Comments:</label>
                  <Field
                    type="text"
                    name="comments"
                    className="form-field"
                    placeholder="Enter the comments"
                  />
                  <ErrorMessage
                    name="comments"
                    component="div"
                    className="error"
                  />
                  <div>
                    <button type="submit" className="form-btn">
                      Make an order
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

export default Order;
