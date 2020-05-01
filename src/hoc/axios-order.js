import axios from "axios";

const instance = axios.create({
  baseURL: "https://tamsucuadev.firebaseio.com/",
});

export default instance;
