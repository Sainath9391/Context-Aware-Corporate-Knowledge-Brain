import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo-clean.png";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { role, user, logout } = useAuth();
  const [time, setTime] = useState("");

  /* live clock */
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      );

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <img src={logo} alt="Logo" className="nav-logo" />

        <h1 className="project-title">
          Context-Aware Knowledge Brain
        </h1>

        <span className="ai-status">🟢 AI Online</span>
      </div>


      {/* RIGHT */}
      <div className="nav-right">

        {/* ⭐ ALWAYS VISIBLE CLOCK */}
        <span className="clock">🕒 {time}</span>

        {/* only after login */}
        {role && (
          <>
            <span className="user-name">Hi {user}</span>

            <span className={`role-badge ${role}`}>
              {role.toUpperCase()}
            </span>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}

      </div>

    </header>
  );
}
