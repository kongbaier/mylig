import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Map from "../components/Map/Map";
import MapNavigator from "../components/MapNavigator/MapNavigator";
import Notice from "../components/Notice/Notice";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Map />,
      },
      {
        path: "map",
        element: <MapNavigator />,
      },
      {
        path: "notice",
        element: <Notice />,
      },
    ],
  },
]);

export default Router;
