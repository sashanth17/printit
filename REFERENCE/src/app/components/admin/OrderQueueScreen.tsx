import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Filter, Play, Pause, CheckCircle, Eye, RefreshCw } from "lucide-react";

const orders = [
  { id: "PG-2401", customer: "Arjun Kumar", phone: "+91 98765 43210", pages: 14, type: "B&W · Single", copies: 1, size: "A4", status: "Printing", priority: "normal", time: "2:14 PM" },
  { id: "PG-2399", customer: "Meera Sharma", phone: "+91 87654 32109", pages: 5, type: "Color · Double", copies: 2, size: "A4", status: "Waiting", priority: "high", time: "2:18 PM" },
  { id: "PG-2397", customer: "Rahul Tiwari", phone: "+91 76543 21098", pages: 28, type: "B&W · Double", copies: 1, size: "A3", status: "Waiting", priority: "normal", time: "2:22 PM" },
  { id: "PG-2394", customer: "Priya Nair", phone: "+91 65432 10987", pages: 8, type: "Color · Single", copies: 3, size: "A4", status: "Completed", priority: "normal", time: "2:05 PM" },
  { id: "PG-2390", customer: "Dev Mehta", phone: "+91 54321 09876", pages: 3, type: "B&W · Single", copies: 1, size: "A4", status: "Collected", priority: "normal", time: "1:52 PM" },
  { id: "PG-2388", customer: "Ananya Rao", phone: "+91 43210 98765", pages: 20, type: "B&W · Double", copies: 2, size: "A4", status: "Waiting", priority: "normal", time: "2:30 PM" },
];

const statusConfig: Record<string, { color: string; dot: string }> = {
  Printing: { color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  Waiting: { color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
  Completed: { color: "bg-green-100 text-green-700", dot: "bg-green-500" },
  Collected: { color: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
};

export function OrderQueueScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = orders.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Order Queue</h1>
          <p className="text-gray-500 text-sm">{orders.length} orders today · {orders.filter((o) => o.status === "Waiting").length} waiting</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Filters + Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order ID or customer..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="flex gap-1.5">
          {["All", "Waiting", "Printing", "Completed", "Collected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                filter === f ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50">
          <Filter className="w-4 h-4" /> Sort
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {["Token ID", "Customer", "Pages", "Type", "Size", "Copies", "Status", "Time", "Actions"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const sc = statusConfig[order.status];
              return (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      {order.priority === "high" && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                      <span className="text-xs font-bold text-blue-600">{order.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-xs font-medium text-gray-900">{order.customer}</p>
                    <p className="text-xs text-gray-400">{order.phone}</p>
                  </td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-gray-900">{order.pages}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-700">{order.type}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-700">{order.size}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-700">×{order.copies}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${sc.dot} ${order.status === "Printing" ? "animate-pulse" : ""}`} />
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${sc.color}`}>{order.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">{order.time}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
                        title="View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {order.status === "Waiting" && (
                        <button className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors" title="Print">
                          <Play className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {order.status === "Printing" && (
                        <button className="p-1.5 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition-colors" title="Pause">
                          <Pause className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {(order.status === "Printing" || order.status === "Waiting") && (
                        <button className="p-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors" title="Complete">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">No orders match your filter.</div>
        )}
      </div>
    </div>
  );
}
