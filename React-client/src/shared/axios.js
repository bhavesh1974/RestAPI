import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/restapi",
  headers: { Authorization: "Bearer " + sessionStorage.getItem("token") }
});

export default instance;
