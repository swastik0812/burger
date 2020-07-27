import React from "react";
import NavigationItems from "../Navigationitems/Navigationitems";
import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import Backdrop from "../../Ui/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
