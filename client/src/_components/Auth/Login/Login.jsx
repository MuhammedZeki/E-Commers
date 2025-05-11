import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInpuChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      if (!email || !password) {
        alert("Please fill in all fielsds.");
        return;
      }
      const res = await axios.post(`http://localhost:3000/auth/login`, {
        email,
        password,
      });
      console.log(res.data);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        if (res.data.user.role === "admin") {
          window.location.href = "/admin";
        } else {
          navigate("/");
        }
        alert("Login Successful!");
        setFormData({ email: "", password: "" });
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.message || error.response.data.message);
    }
  };
  return (
    <div className="account-column">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>
              Email address <span className="required">*</span>
            </span>
            <input
              type="text"
              name="email"
              onChange={handleInpuChange}
              value={formData.email}
            />
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input
              type="password"
              name="password"
              onChange={handleInpuChange}
              value={formData.password}
            />
          </label>
        </div>
        <p className="remember">
          <label>
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <button className="btn btn-sm" type="submit">
            Login
          </button>
        </p>
        <a href="#" className="form-link">
          Lost your password?
        </a>
      </form>
    </div>
  );
};

export default Login;
