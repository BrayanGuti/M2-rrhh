import { Outlet } from "react-router-dom";
import { AdminLayout } from "../../pages/admin-panel/layout/Layout.jsx";

export function AdminLayoutRoute() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
