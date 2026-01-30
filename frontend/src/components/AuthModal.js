import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signupUser, loginUser } from "../services/api";


export default function AuthModal({ selectedRole, close }) {
  const { login } = useAuth();

  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isSignup) {
      await signupUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: selectedRole
      });

      alert("Account created! Please login.");
      setIsSignup(false);
      return;
    }

    const res = await loginUser({
      email: form.email,
      password: form.password,
      role: selectedRole
    });

    if (res.token) {
      login(res.token, res.role, res.name);
    } else {
      alert(res.msg || "Login failed");
    }

  } catch (err) {
    alert("Server error");
  }
};


  return (
  <div className="modal-overlay">

    <div className="auth-card">

      {/* Header */}
      <div className="auth-header">
        <span className={`auth-role ${selectedRole}`}>
          {selectedRole.toUpperCase()}
        </span>

        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
        <p>
          {isSignup
            ? "Start using your AI assistant today"
            : "Login to continue"}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="auth-form">

        {isSignup && (
          <input
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />
        )}

        <input
          name="email"
          type="email"
          placeholder="Email address"
          required
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <button className="primary-btn">
          {isSignup ? "Create Account" : "Login"}
        </button>
      </form>

      {/* Toggle */}
      <p className="toggle-text">
        {isSignup ? "Already have an account?" : "Don't have an account?"}
        <span onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? " Login" : " Sign Up"}
        </span>
      </p>

      {/* Cancel */}
      <button className="cancel-btn" onClick={close}>
        Cancel
      </button>

    </div>
  </div>
);

}
