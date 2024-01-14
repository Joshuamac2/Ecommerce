import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


function AdminLogin({ setAuth }) {
    const [inputs, setInputs] = useState({
        admin_email: "",
        admin_password: "",
    });

    const { admin_email, admin_password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { admin_email, admin_password };

            const response = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const parseRes = await response.json();

            if (parseRes.jwtToken) {
                localStorage.setItem("token", parseRes.jwtToken);

                setAuth(true);
                toast.success("Login successful!", {style:{whiteSpace: 'nowrap'}})
            } else {
                setAuth(false)
                toast.error(parseRes, {style:{whiteSpace: 'nowrap'}})
            }           
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h1 className="text-center my-5">Login as a Admin user</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="email"
                    name="admin_email"
                    placeholder="Email"
                    className="form-control my-3"
                    value={admin_email}
                    onChange={(e) => onChange(e)}
                />
                <input
                    type="password"
                    name="admin_password"
                    placeholder="Password"
                    className="form-control my-3"
                    value={admin_password}
                    onChange={(e) => onChange(e)}
                />
                <button className="btn-block">Submit</button>
                <Link to="/adminregister">Register</Link>
            </form>
        </div>
    );
}

export default AdminLogin;
