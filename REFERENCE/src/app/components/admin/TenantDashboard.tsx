import { useNavigate } from "react-router";
import { Clock, CheckCircle2, Printer, TrendingUp, AlertTriangle, Eye, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const recentOrders = [
  { id: "PG-2401", customer: "Arjun K.", pages: 14, type: "B&W", status: "Printing", statusColor: "bg-blue-100 text-blue-700" },
  { id: "PG-2399", customer: "Meera S.", pages: 5, type: "Color", status: "Waiting", statusColor: "bg-yellow-100 text-yellow-700" },
  { id: "PG-2397", customer: "Rahul T.", pages: 28, type: "B&W", status: "Completed", statusColor: "bg-green-100 text-green-700" },
  { id: "PG-2394", customer: "Priya N.", pages: 8, type: "Color", status: "Completed", statusColor: "bg-green-100 text-green-700" },
  { id: "PG-2390", customer: "Dev M.", pages: 3, type: "B&W", status: "Collected", statusColor: "bg-gray-100 text-gray-600" },
];

const chartData = [
  { time: "9AM", orders: 12 },
  { time: "10AM", orders: 24 },
  { time: "11AM", orders: 18 },
  { time: "12PM", orders: 32 },
  { time: "1PM", orders: 28 },
  { time: "2PM", orders: 38 },
  { time: "3PM", orders: 22 },
  { time: "Now", orders: 15 },
];

const alerts = [
  { icon: "🖨️", msg: "Printer 2 paper low", level: "warning" },
  { icon: "💰", msg: "₹4,280 collected today", level: "info" },
  { icon: "⚠️", msg: "Queue depth: 6 orders", level: "warning" },
];

export function TenantDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm">Wednesday, 3 June 2026 · Campus Gate Station</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-green-700 font-medium">Station Online</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Orders Waiting", value: "6", icon: Clock, iconBg: "bg-yellow-100", iconColor: "text-yellow-600", delta: "+2 since last hr" },
          { label: "Currently Printing", value: "2", icon: Printer, iconBg: "bg-blue-100", iconColor: "text-blue-600", delta: "1 page left" },
          { label: "Completed Today", value: "47", icon: CheckCircle2, iconBg: "bg-green-100", iconColor: "text-green-600", delta: "↑ 12% from yesterday" },
          { label: "Revenue Today", value: "₹4,280", icon: TrendingUp, iconBg: "bg-purple-100", iconColor: "text-purple-600", delta: "↑ 8% from yesterday" },
        ].map(({ label, value, icon: Icon, iconBg, iconColor, delta }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
            <p className="text-xs text-gray-400 mt-1">{delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Chart */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800">Orders Today</h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">247 total</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={chartData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
              <Bar dataKey="orders" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-800">Alerts</h3>
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="space-y-2">
            {alerts.map((a, i) => (
              <div key={i} className={`flex items-center gap-2.5 p-2.5 rounded-xl ${a.level === "warning" ? "bg-yellow-50 border border-yellow-100" : "bg-blue-50 border border-blue-100"}`}>
                <span>{a.icon}</span>
                <p className="text-xs font-medium text-gray-800">{a.msg}</p>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/admin/notifications")} className="mt-3 w-full text-xs text-blue-600 font-medium flex items-center justify-center gap-1 hover:underline">
            View all alerts <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-gray-800">Recent Orders</h3>
          <button onClick={() => navigate("/admin/orders")} className="text-xs text-blue-600 font-medium flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Order ID", "Customer", "Pages", "Type", "Status", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-semibold text-blue-600">{order.id}</td>
                  <td className="px-4 py-3 text-xs text-gray-800">{order.customer}</td>
                  <td className="px-4 py-3 text-xs text-gray-800">{order.pages}</td>
                  <td className="px-4 py-3 text-xs text-gray-800">{order.type}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${order.statusColor}`}>{order.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
