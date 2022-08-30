import React from "react";
import { useRoutes } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Routes from "./Routes";

const App = () => {
  const routes = useRoutes(Routes);

  return (
    <>
      <Header />
      {routes}
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
