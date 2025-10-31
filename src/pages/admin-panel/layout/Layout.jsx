// AdminLayout.jsx
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useSidebar } from "./contexts/SidebarContext";

export function AdminLayout({ children, title = "Panel Administrativo" }) {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header
        title={title}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />
      <Sidebar isOpen={isSidebarOpen} />

      <main
        className={`pt-[73px] transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
        style={{ minHeight: "calc(100vh - 73px)" }}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
