import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8080/api", // or your backend URL
  headers: { "Content-type": "application/json" }
});
