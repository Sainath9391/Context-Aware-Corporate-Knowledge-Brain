import Layout from "./components/Layout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import roleImg from "./assets/role-select.png"; // ✅ import image



function Main() {
  const { role } = useAuth();

  return (
    <Layout>
      {!role && (
        <div className="role-select-container">
          <img src={roleImg} alt="Select Role" />
        </div>
      )}

      {role === "admin" && <AdminDashboard />}
      {role === "user" && <UserDashboard />}
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}
