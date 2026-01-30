import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

export default function Sidebar() {
  const { role } = useAuth();
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <>
      <div className="sidebar">

        {/* Title */}
        <h3 className="sidebar-title">Select Role</h3>

        {/* Admin Card */}
        <div
          className={`role-option ${role ? "disabled" : ""}`}
          onClick={() => !role && setSelectedRole("admin")}
        >
          <div className="role-icon">👨‍💼</div>
          <div>
            <h4>Admin</h4>
            <p>Manage PDFs & system</p>
          </div>
        </div>

        {/* User Card */}
        <div
          className={`role-option ${role ? "disabled" : ""}`}
          onClick={() => !role && setSelectedRole("user")}
        >
          <div className="role-icon">👨‍🎓</div>
          <div>
            <h4>User</h4>
            <p>Chat with documents</p>
          </div>
        </div>

        {/* Footer info */}
        <div className="sidebar-footer">
          🟢 AI Online
        </div>

      </div>

      {selectedRole && (
        <AuthModal
          selectedRole={selectedRole}
          close={() => setSelectedRole(null)}
        />
      )}
    </>
  );
}
