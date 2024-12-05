import React, { useState } from "react";
import AuthService from "../services/auth.services";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    setUserName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(userName, email, passWord, role)
      .then(() => {
        window.alert("註冊成功，重新導向到登入頁面");
        //重新導向
        navigate("/");
      })
      .catch((e) => {
        // console.log(e);
        setErrMessage(e.response.data);
      });
  };
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {errMessage && <div className="alert alert-danger">{errMessage}</div>}
        <div>
          <label htmlFor="username">用戶名稱:</label>
          <input
            onChange={handleChangeUsername}
            type="text"
            className="form-control"
            name="userame"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">電子信箱：</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
            placeholder="長度至少超過6個英文或數字"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">身份：</label>
          <input
            onChange={handleChangeRole}
            type="text"
            className="form-control"
            placeholder="只能填入Student或是Instructor這兩個選項其一"
            name="role"
          />
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>註冊會員</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
