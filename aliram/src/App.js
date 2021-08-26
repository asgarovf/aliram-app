import "./App.css";
import io from "socket.io-client";
import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DASHBOARD } from "common/constants/paths";
import Dashboard from "screens/Dashboard";
import { Provider } from "react-redux";
import store from "store/store";
import "styles/bootstrap.css";
import "styles/styles.css";

const socket = io.connect();

function App() {
  socket.on("connection");
  return (
    <Provider store={store}>
      <Router>
        <Route exact path={DASHBOARD}>
          <Dashboard socket={socket} />
        </Route>
      </Router>
    </Provider>
  );
}

export default App;
