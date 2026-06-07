import { Outlet, NavLink, useNavigate } from "react-router";
import {
  Printer, LayoutDashboard, List, Activity,
  PackageCheck, Bell, LogOut, Home, Settings,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Order Queue", path: "/admin/orders", icon: List },
  { label: "Printing Status", path: "/admin/printing", icon: Activity },
  { label: "Collection Verify", path: "/admin/verify", icon: PackageCheck },
  { label: "Notifications", path: "/admin/notifications", icon: Bell },
];

export function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Printer className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">PrintGo</div>
            <div className="text-gray-500 text-xs">Admin Console</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                  <span className="flex-1">{label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-400" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-gray-100 space-y-0.5">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Home className="w-4 h-4 text-gray-400" /> Hub
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4 text-gray-400" /> Settings
          </button>
          <button
            onClick={() => navigate("/admin/login")}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>

        {/* User chip */}
        <div className="mx-3 mb-4 flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            R
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium text-gray-800 truncate">Rajan Print Shop</div>
            <div className="text-xs text-gray-500 truncate">rajan@printgo.in</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
