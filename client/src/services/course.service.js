import axios from "axios";
const API_URL = "http://localhost:8080/api/courses";

class CourseService {
  newCourse(title, description, price) {
    let token = "";
    let tokenInSession = localStorage.getItem("user");
    if (tokenInSession) token = JSON.parse(tokenInSession).token;
    console.log(`token:${token}, course:${title},${description},${price}`);
    return axios.post(
      API_URL + "/createCourse",
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  getAllCourses() {
    let token = "";
    let tokenInSession = localStorage.getItem("user");
    if (tokenInSession) token = JSON.parse(tokenInSession).token;
    return axios.get(API_URL, {
      headers: {
        Authorization: token,
      },
    });
  }
  getCourseFromStudent(_id) {
    let token = "";
    let tokenInSession = localStorage.getItem("user");
    if (tokenInSession) token = JSON.parse(tokenInSession).token;

    return axios.get(API_URL + "/student/" + _id, {
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
    return axios.get(API_URL + "/fcwii/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
  getCoursesByName(name) {
    if (typeof name !== "string") return console.error("course name不為字串");
    let token = "";
    let tokenInSession = localStorage.getItem("user");
    if (tokenInSession) token = JSON.parse(tokenInSession).token;

    return axios.get(API_URL + "/fcwn/" + name, {
      headers: {
        Authorization: token,
      },
    });
  }
  deleteCourse(courseId) {
    let token = JSON.parse(localStorage.getItem("user"));
    if (token.user.role == "Instructor") {
      //delete course with course id
      return axios.delete(API_URL + "/deleteCourse/" + courseId, {
        headers: { Authorization: token.token },
      });
    } else if (token.user.role == "Student") {
      //find the students of vourse and update
      let course = axios
        .get(API_URL + "/student/" + token.user._id, {
          headers: {
            Authorization: token.token,
          },
        })
        .then((data) => {
          console.log(data);
        })
        .exec();
      course.students.splice(
        course.students.findIndex((student) => student == token._id),
        1
      );
      return axios.patch(API_URL + "/patch/" + courseId, course, {
        headers: { Authorization: token.token },
      });
    }
  }
  enroll(_id) {
    let token = "";
    let tokenInSession = localStorage.getItem("user");
    if (tokenInSession) token = JSON.parse(tokenInSession).token;
    return axios.patch(
      API_URL + "/patch/" + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new CourseService();
