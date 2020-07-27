import React from "react";
import classes from "./Navigationitems.css";
import Navigationitem from "./NavigationItem/Navigationitem";
const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <Navigationitem link="/" exact>
        Burger Builder
      </Navigationitem>
      <Navigationitem link="/orders">Orders</Navigationitem>
    </ul>
  );
};

export default navigationItems;
