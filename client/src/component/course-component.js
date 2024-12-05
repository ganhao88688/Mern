import React from "react";
import courseService from "../services/course.service";
import { useNavigate } from "react-router-dom";

const CourseComponent = ({ currentUser }) => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
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
      {currentUser && <div className=""></div>}
    </div>
  );
};

export default CourseComponent;
