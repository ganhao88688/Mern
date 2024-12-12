import React, { useEffect, useState } from "react";
import courseService from "../services/course.service";
import { useNavigate } from "react-router-dom";

const CourseComponent = ({ currentUser }) => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const [courseData, setCourseData] = useState(null);
  const handleDelete = (index) => {
    courseService.deleteCourse(courseData[index]._id);
    courseData.splice(index, 1);
    setCourseData(courseData); //component不會自動更新 騙我!!!
  };
  useEffect(() => {
    let _id = currentUser.user._id;
    if (currentUser.user.role == "Instructor") {
      // console.log("getCourse from client");
      courseService
        .getCourseFromInstructor(_id)
        .then((data) => {
          setCourseData(data.data.found);
          console.log(data.data.found);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (currentUser.user.role == "Student") {
      courseService
        .getCourseFromStudent(_id)
        .then((data) => setCourseData.log(data.data.found))
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>在獲取您的個人資料之前，您必須先登錄。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            回到登入畫面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "Instructor" && (
        <div>
          <h1>歡迎來到講師頁面</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "Student" && (
        <div>
          <h1>歡迎來到學生頁面</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {courseData.map((course, index) => {
              return (
                <div
                  className="card"
                  style={{ width: "18rem", margin: "1rem" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">課程名稱: {course.title}</h5>
                    <p style={{ margin: "0.5rem 0rem" }}>
                      {course.description}
                    </p>
                    <p style={{ argin: "0.5rem 0rem" }}>
                      學生人數: {course.students.length}
                    </p>
                    <p style={{ argin: "0.5rem 0rem" }}>價格: {course.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleDelete(index);
                      }}
                    >
                      刪除課程
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
