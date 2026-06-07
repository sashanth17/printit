import { useState } from "react";
import { AlertTriangle, Info, CheckCircle, X, Bell, Printer, Droplets, FileWarning, WifiOff, Users } from "lucide-react";

type AlertLevel = "critical" | "warning" | "info" | "success";

interface Alert {
  id: number;
  level: AlertLevel;
  title: string;
  message: string;
  time: string;
  icon: React.ReactNode;
  category: string;
  read: boolean;
}

const initialAlerts: Alert[] = [
  {
    id: 1, level: "critical", title: "Printer 1 Offline",
    message: "Printer 1 (HP LaserJet Pro M404n) is not responding. 3 jobs are queued and waiting.",
    time: "Just now", icon: <WifiOff className="w-4 h-4" />, category: "Printer", read: false,
  },
  {
    id: 2, level: "warning", title: "Paper Low — Printer 2",
    message: "Printer 2 paper tray is at 12%. Estimated capacity for ~6 more orders. Please refill.",
    time: "5 min ago", icon: <FileWarning className="w-4 h-4" />, category: "Printer", read: false,
  },
  {
    id: 3, level: "warning", title: "Ink / Toner Running Low",
    message: "Printer 1 toner cartridge is at 18%. Order replacement cartridge to avoid disruption.",
    time: "18 min ago", icon: <Droplets className="w-4 h-4" />, category: "Printer", read: false,
  },
  {
    id: 4, level: "critical", title: "Payment Failed",
    message: "Order PG-2385 payment of ₹62 failed via UPI. Customer has been notified to retry.",
    time: "32 min ago", icon: <AlertTriangle className="w-4 h-4" />, category: "Payment", read: true,
  },
  {
    id: 5, level: "warning", title: "High Queue Depth",
    message: "6 orders currently waiting in queue. Consider increasing priority or notifying customers.",
    time: "45 min ago", icon: <Users className="w-4 h-4" />, category: "Queue", read: true,
  },
  {
    id: 6, level: "info", title: "Printer 2 Back Online",
    message: "Printer 2 (Canon LBP6030B) reconnected successfully after brief downtime.",
    time: "1 hr ago", icon: <Printer className="w-4 h-4" />, category: "Printer", read: true,
  },
  {
    id: 7, level: "success", title: "Daily Revenue Target Reached",
    message: "Today's revenue crossed ₹4,000. Congratulations! You're 108% of today's target.",
    time: "2 hrs ago", icon: <CheckCircle className="w-4 h-4" />, category: "Business", read: true,
  },
  {
    id: 8, level: "info", title: "System Maintenance Scheduled",
    message: "Scheduled maintenance on 5 June 2026, 2:00 AM – 3:00 AM IST. Brief downtime expected.",
    time: "3 hrs ago", icon: <Info className="w-4 h-4" />, category: "System", read: true,
  },
];

const levelConfig: Record<AlertLevel, { bg: string; border: string; icon: string; badge: string }> = {
  critical: { bg: "bg-red-50", border: "border-red-200", icon: "text-red-600", badge: "bg-red-100 text-red-700" },
  warning: { bg: "bg-yellow-50", border: "border-yellow-200", icon: "text-yellow-600", badge: "bg-yellow-100 text-yellow-700" },
  info: { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
  success: { bg: "bg-green-50", border: "border-green-200", icon: "text-green-600", badge: "bg-green-100 text-green-700" },
};

const levelLabel: Record<AlertLevel, string> = {
  critical: "Critical",
  warning: "Warning",
  info: "Info",
  success: "Success",
};

export function NotificationsScreen() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState<"all" | "unread" | AlertLevel>("all");

  const unreadCount = alerts.filter((a) => !a.read).length;

  const filtered = alerts.filter((a) => {
    if (filter === "unread") return !a.read;
    if (filter === "all") return true;
    return a.level === filter;
  });

  const dismiss = (id: number) => setAlerts((prev) => prev.filter((a) => a.id !== id));
  const markRead = (id: number) => setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, read: true } : a));
  const markAllRead = () => setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>
        <button onClick={markAllRead} className="text-sm text-blue-600 font-medium hover:underline">
          Mark all as read
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-3">
        {(["critical", "warning", "info", "success"] as AlertLevel[]).map((level) => {
          const count = alerts.filter((a) => a.level === level).length;
          const cfg = levelConfig[level];
          return (
            <button
              key={level}
              onClick={() => setFilter(level === filter ? "all" : level)}
              className={`bg-white rounded-2xl border p-3 text-left transition-all hover:shadow-md ${
                filter === level ? `${cfg.border} border-2` : "border-gray-200"
              }`}
            >
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                {levelLabel[level]}
              </span>
              <p className="text-2xl font-black text-gray-900 mt-2">{count}</p>
              <p className="text-xs text-gray-500">alerts</p>
            </button>
          );
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "unread"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors capitalize ${
              filter === f ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {f === "all" ? `All (${alerts.length})` : `Unread (${unreadCount})`}
          </button>
        ))}
      </div>

      {/* Alert List */}
      <div className="space-y-2">
        {filtered.map((alert) => {
          const cfg = levelConfig[alert.level];
          return (
            <div
              key={alert.id}
              onClick={() => markRead(alert.id)}
              className={`relative flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                alert.read ? "bg-white border-gray-200" : `${cfg.bg} ${cfg.border}`
              }`}
            >
              {/* Unread dot */}
              {!alert.read && (
                <div className="absolute top-4 right-10 w-2 h-2 rounded-full bg-blue-600" />
              )}

              {/* Icon */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                alert.read ? "bg-gray-100 text-gray-500" : `${cfg.bg} ${cfg.icon}`
              }`}>
                {alert.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className={`text-sm font-semibold ${alert.read ? "text-gray-700" : "text-gray-900"}`}>{alert.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${cfg.badge}`}>
                        {alert.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{alert.message}</p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Bell className="w-3 h-3" /> {alert.time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dismiss */}
              <button
                onClick={(e) => { e.stopPropagation(); dismiss(alert.id); }}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Bell className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No notifications in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
