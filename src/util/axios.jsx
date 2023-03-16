import axios from "axios";

const Axios = axios.create({
  // Configuration
  baseURL: "http://localhost:8084",
  timeout: 2000,
});

export default Axios;
