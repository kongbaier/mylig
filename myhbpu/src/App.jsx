import "./App.css";
import TemporaryDrawer from "./components/Drawer/Drawer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div id="body1">
      <TemporaryDrawer />
      <Outlet />
    </div>
  );
}

export default App;
