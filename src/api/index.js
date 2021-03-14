import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
     "Accept": "application/json",
  },
});