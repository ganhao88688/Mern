import axios from "axios";

const API_URL = "http://localhost:8080/api/courses";
class courseService {
  post(title, description, price) {
    let token = "";
    let tokenInSession = localStorage.getItem("user").token;
    if (tokenInSession) token = JSON.parse(tokenInSession);
    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  get(_id) {
    let token = "";
    let tokenInSession = localStorage.getItem("user").token;
    if (tokenInSession) token = JSON.parse(tokenInSession);

    return axios.get(API_URL + "/instructor/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new courseService();
