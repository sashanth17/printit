import { useNavigate } from "react-router";
import { Printer, Smartphone, Monitor, ArrowRight, ChevronRight, Zap } from "lucide-react";

const customerScreens = [
  { name: "Welcome / Landing", path: "/customer", desc: "App entry & CTA", step: 1 },
  { name: "Upload Documents", path: "/customer/upload", desc: "File upload flow", step: 2 },
  { name: "Print Configuration", path: "/customer/config", desc: "Print settings", step: 3 },
  { name: "Bill Estimation", path: "/customer/bill", desc: "Cost summary", step: 4 },
  { name: "Payment Selection", path: "/customer/payment", desc: "Choose payment method", step: 5 },
  { name: "Payment Success", path: "/customer/success", desc: "Order confirmed", step: 6 },
  { name: "Order Tracking", path: "/customer/tracking", desc: "Live print status", step: 7 },
  { name: "Collection", path: "/customer/collection", desc: "Token & QR pickup", step: 8 },
];

const adminScreens = [
  { name: "Tenant Login", path: "/admin/login", desc: "Shop owner auth", step: 9 },
  { name: "Dashboard", path: "/admin/dashboard", desc: "Operations center", step: 10 },
  { name: "Order Queue", path: "/admin/orders", desc: "Manage incoming orders", step: 11 },
  { name: "Order Details", path: "/admin/orders/PG-2401", desc: "Print & review", step: 12 },
  { name: "Printing Status", path: "/admin/printing", desc: "Monitor active prints", step: 13 },
  { name: "Collection Verify", path: "/admin/verify", desc: "Token handover", step: 14 },
  { name: "Notifications", path: "/admin/notifications", desc: "Alerts & events", step: 15 },
];

export function HubPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Printer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl text-white">PrintGo</h1>
              <p className="text-blue-200 text-sm">Vending-based Smart Print Service</p>
            </div>
          </div>
          <p className="text-blue-100 max-w-xl">
            Complete prototype wireframe with 15 screens — 8 customer mobile screens and 7 tenant dashboard screens.
          </p>
          <div className="flex gap-3 mt-5">
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-sm px-3 py-1.5 rounded-full">
              <Smartphone className="w-3.5 h-3.5" /> 8 Customer Screens
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-sm px-3 py-1.5 rounded-full">
              <Monitor className="w-3.5 h-3.5" /> 7 Admin Screens
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Customer Flow */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Customer Mobile Flow</h2>
              <p className="text-gray-500 text-sm">Upload → Configure → Pay → Collect</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {customerScreens.map((screen) => (
              <button
                key={screen.step}
                onClick={() => navigate(screen.path)}
                className="group bg-white border border-gray-200 rounded-2xl p-4 text-left hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                    {screen.step}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <h3 className="text-gray-900 text-sm mb-0.5">{screen.name}</h3>
                <p className="text-gray-500 text-xs">{screen.desc}</p>
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate("/customer")}
            className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Zap className="w-4 h-4" /> Start Customer Flow
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        {/* Admin Flow */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
              <Monitor className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Tenant Dashboard Flow</h2>
              <p className="text-gray-500 text-sm">Login → Manage Orders → Verify Collection</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {adminScreens.map((screen) => (
              <button
                key={screen.step}
                onClick={() => navigate(screen.path)}
                className="group bg-white border border-gray-200 rounded-2xl p-4 text-left hover:border-purple-400 hover:shadow-lg hover:shadow-purple-100 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
                    {screen.step}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500 transition-colors" />
                </div>
                <h3 className="text-gray-900 text-sm mb-0.5">{screen.name}</h3>
                <p className="text-gray-500 text-xs">{screen.desc}</p>
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate("/admin/login")}
            className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Monitor className="w-4 h-4" /> Open Admin Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        <footer className="text-center text-gray-400 text-xs py-4 border-t border-gray-200">
          PrintGo Prototype · 15 Screens · Built with React + Tailwind
        </footer>
      </div>
    </div>
  );
}
