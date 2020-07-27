import React, { Component } from "react";
import Modal from "../../component/Ui/Modal/Modal";
import Aux from "../Aux";

const witherrorHandler = (WrapedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      console.log("inside the componentMount");
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => {
          return res;
        },
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    componentWillUnmount() {
      console.log("componentwillunmount");
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.resInterceptor);
    }

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modelClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default witherrorHandler;
