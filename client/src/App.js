import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import HomeComep from "./component/home-component";
import RegisterComp from "./component/register-component";
import LoginComp from "./component/login-component";
import ProfileComp from "./component/profile-component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeComep />} />
          <Route path="register" element={<RegisterComp />} />
          <Route path="login" element={<LoginComp />} />
          {/* <Route path="profile" element={<ProfileComp props={ currentUser, setCurrentUser } />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
