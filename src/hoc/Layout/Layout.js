import React, { useState } from "react";
import Aux from "../Aux/Aux";
import style from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [sideDrawIsVisible, setSideDrawIsVisible] = useState(false);

  const sideDrawToggleHandler = () => {
    setSideDrawIsVisible(!sideDrawIsVisible);
  };

  return (
    <Aux>
      <Toolbar />
      <SideDrawer open={sideDrawIsVisible} closed={sideDrawToggleHandler} />
      <main className={style.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
