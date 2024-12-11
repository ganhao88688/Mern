import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import HomeComep from "./component/home-component";
import RegisterComp from "./component/register-component";
import LoginComp from "./component/login-component";
import ProfileComp from "./component/profile-component";
import { useState } from "react";
import AuthServices from "./services/auth.services";
import CourseComponent from "./component/course-component";
import PostCourseComponent from "./component/postCourse-component";

function App() {
  const [currentUser, setCurrentUser] = useState(AuthServices.getCurrentUser());
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route index element={<HomeComep />} />
          <Route path="register" element={<RegisterComp />} />
          <Route
            path="login"
            element={<LoginComp setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="profile"
            element={<ProfileComp currentUser={currentUser} />}
          />
          <Route
            path="course"
            element={<CourseComponent currentUser={currentUser} />}
          />
          <Route
            path="postCourse"
            element={
              <PostCourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
