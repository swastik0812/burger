import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClassHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerClassHandlerOpen = () => {
    this.setState({ showSideDrawer: true });
  };
  render() {
    return (
      <Aux>
        <Toolbar sideDrawerControler={this.sideDrawerClassHandlerOpen} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClassHandler}
        />
        <main className={Classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
