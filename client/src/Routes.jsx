import React from "react";
import {
  BrowserRouter,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Alarms from "./pages/Alarms";
import Prisoners from "./pages/Prisoners";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" Component={Home} />
        <Route path="/alarms" Component={Alarms} />
        <Route path="/prisoners" Component={Prisoners} />
        <Route path="*" Component={() => <Navigate to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
