import "./App.css";
import io from "socket.io-client";
import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ADMIN, DASHBOARD } from "common/constants/paths";
import Dashboard from "screens/Dashboard";
import { Provider } from "react-redux";
import store from "store/store";
import "styles/bootstrap.css";
import "styles/styles.css";

const socket = io.connect("/api");

function App() {
  socket.on("connection");

  const [password, setPassword] = useState("");

  return (
    <Provider store={store}>
      <Router>
        <Route exact path={DASHBOARD}>
          <Dashboard socket={socket} />
        </Route>
        <Route exact path={ADMIN}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-10">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>
          </div>
          <Dashboard
            setPassword={setPassword}
            password={password}
            socket={socket}
          />
        </Route>
      </Router>
    </Provider>
  );
}

export default App;
