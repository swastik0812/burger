import React from "react";

import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NaviggationItems from "../Navigationitems/Navigationitems";
import DrawerToogle from "../SideDrawer/DrawerToogle/DrawerToogle";

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToogle clicked={props.sideDrawerControler} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NaviggationItems />
      </nav>
    </header>
  );
};

export default toolbar;
