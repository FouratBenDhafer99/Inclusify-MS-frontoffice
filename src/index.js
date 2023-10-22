import React, {
  Component,
  Suspense,
  createContext,
  useState,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
import "./main.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import InclusifyRoutes from "./router/InclusifyRoutes";
import Load from "./components/Load";
// import "../node_modules/font-awesome/css/font-awesome.min.css";
import Auth from "./router/Auth";

export const UserContext = createContext(null);
const Root = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    Auth.toUpdateCurrentUser().then((res) => setCurrentUser(res));
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter basename={"/"}>
        <Suspense fallback={<Load />}>
          <InclusifyRoutes />
        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.register();
