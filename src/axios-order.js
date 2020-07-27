import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-97109.firebaseio.com/",
});

export default instance;
