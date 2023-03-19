import "./App.css";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";
import Users from "./pages/Users";
import { Fragment, useContext } from "react";
import itemsContext from "./store/items-context";
import withRoot from "./mui-styles/withRoot";

function App() {
  const itemsCtx = useContext(itemsContext);

  return (
    <Fragment>
      {itemsCtx.switchPage ? <Users /> : <Admin />}
      <Footer />
    </Fragment>
  );
}

export default withRoot(App);
