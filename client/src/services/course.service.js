import axios from "axios";
const API_URL = "http://localhost:8080/api/courses";

class CourseService {
  newCourse(title, description, price) {
    let token = "";
    let tokenInSession = localStorage.getItem("user");
    if (tokenInSession) token = JSON.parse(tokenInSession).token;
    return axios.post(
      API_URL + "createCource",
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  getCourseFromStudent(_id) {
    let token = "";
    let tokenInSession = localStorage.getItem("user");
    if (tokenInSession) token = JSON.parse(tokenInSession).token;

    return axios.post(API_URL + "/student/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  getCourseFromInstructor(_id) {
    let token = "";
    let tokenInSession = localStorage.getItem("user");
    if (tokenInSession) token = JSON.parse(tokenInSession).token;
    // console.log(`_id:${_id}, token=${token}`);
    return axios.get(API_URL + "/instructor/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new CourseService();
