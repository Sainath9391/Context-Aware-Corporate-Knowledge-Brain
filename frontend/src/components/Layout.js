import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />

      <div className="body">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
