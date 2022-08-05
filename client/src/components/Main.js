import React from "react";
import { Routes, Route, Router } from "react-router-dom";

import ViewItems from "./ViewItems";
import InputItem from "./InputItem";

const Main = () => {
  return (
    // <ViewItems />

    <Router>
      <Route path="/" component={ViewItems} />
      <Route path="/create" />
      <Route path="/view" component={ViewItems} />
    </Router>
  );
};

export default Main;
