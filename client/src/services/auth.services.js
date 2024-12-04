import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService {
  register(userName, email, passWord, role) {
    return axios.post(API_URL + "/register", {
      userName,
      email,
      passWord,
      role,
    });
  }
  login(email, passWord) {
    return axios.post(API_URL + "/login", { email, passWord });
  }
  logout() {
    localStorage.removeItem("user");
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
