import axios from "axios";

export default function setAuthToken(token) {
  token
    ? (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`)
    : delete axios.defaults.headers.common["Authorization"];
}
