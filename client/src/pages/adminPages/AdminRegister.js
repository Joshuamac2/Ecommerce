import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function AdminRegister() {
  const [inputs, setInputs] = useState({
    reg_username: "",
    reg_email: "",
    reg_password: "",
  });

  const { reg_username, reg_email, reg_password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { reg_username, reg_email, reg_password };

      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const parseRes = await response.json();
        toast.success("Admin approval pending", {style:{whiteSpace: 'nowrap'}})
        console.log(parseRes);
      } else {
        toast.error("Error", {style:{whiteSpace: 'nowrap'}})
        throw new Error(`Registration failed: ${response.statusText}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/adminregistrationconfirmation');
  };

  return (
    <div>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="reg_username"
          placeholder="Username"
          className="form-control my-3"
          value={reg_username}
          onChange={(e) => onChange(e)}
        />
        <input
          type="email"
          name="reg_email"
          placeholder="Email"
          className="form-control my-3"
          value={reg_email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="reg_password"
          placeholder="Password"
          className="form-control my-3"
          value={reg_password}
          onChange={(e) => onChange(e)}
        />
        <button type="submit" className="btn-block" onClick={handleRedirect}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminRegister;
