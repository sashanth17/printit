import { useNavigate } from "react-router";
import { ChevronLeft, Clock, MapPin, Printer } from "lucide-react";

const stages = [
  { id: 1, label: "Order Received", desc: "Order placed & payment captured", icon: "📥", done: true, active: false, time: "2:14 PM" },
  { id: 2, label: "Payment Verified", desc: "Transaction confirmed via UPI", icon: "✅", done: true, active: false, time: "2:14 PM" },
  { id: 3, label: "Printing Started", desc: "Your documents are being printed", icon: "🖨️", done: false, active: true, time: "Est. 2:18 PM" },
  { id: 4, label: "Printing Completed", desc: "All pages printed successfully", icon: "📄", done: false, active: false, time: "" },
  { id: 5, label: "Ready for Collection", desc: "Collect with your token A-47", icon: "📦", done: false, active: false, time: "" },
];

export function OrderTrackingScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Nav */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-3 bg-white border-b border-gray-100">
        <button onClick={() => navigate("/customer/success")} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-900 text-sm flex-1">Track Order</span>
        <span className="text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full">Live</span>
      </div>

      <div className="flex-1 px-4 overflow-y-auto space-y-3 py-4 pb-6">
        {/* Order Card */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-4 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-blue-200">Order ID</p>
              <p className="text-sm font-bold">PG-2401-0047</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-200">Token</p>
              <p className="text-2xl font-black tracking-wider">A-47</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-200" />
              <span className="text-xs text-blue-100">Ready in ~5 min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-200" />
              <span className="text-xs text-blue-100">Campus Gate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5 text-blue-200" />
              <span className="text-xs text-blue-100">14 pages</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-xs font-bold text-gray-700 mb-4">Order Progress</p>
          <div className="space-y-0">
            {stages.map((stage, i) => (
              <div key={stage.id} className="flex gap-3">
                {/* Line + Dot */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0 border-2 ${
                    stage.done
                      ? "bg-green-500 border-green-500"
                      : stage.active
                      ? "bg-blue-600 border-blue-600 ring-4 ring-blue-100"
                      : "bg-white border-gray-200"
                  }`}>
                    {stage.done ? (
                      <span className="text-white text-xs">✓</span>
                    ) : stage.active ? (
                      <span className="text-sm">{stage.icon}</span>
                    ) : (
                      <span className="text-sm opacity-40">{stage.icon}</span>
                    )}
                  </div>
                  {i < stages.length - 1 && (
                    <div className={`w-0.5 flex-1 my-1 ${stage.done ? "bg-green-400" : "bg-gray-200"}`} style={{ minHeight: "28px" }} />
                  )}
                </div>
                {/* Content */}
                <div className={`pb-4 ${i === stages.length - 1 ? "pb-0" : ""}`}>
                  <div className="flex items-center gap-2">
                    <p className={`text-xs font-semibold ${
                      stage.active ? "text-blue-700" : stage.done ? "text-gray-900" : "text-gray-400"
                    }`}>
                      {stage.label}
                    </p>
                    {stage.active && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">In Progress</span>
                    )}
                  </div>
                  <p className={`text-xs mt-0.5 ${stage.done || stage.active ? "text-gray-500" : "text-gray-300"}`}>
                    {stage.desc}
                  </p>
                  {stage.time && (
                    <p className={`text-xs mt-0.5 font-medium ${stage.active ? "text-blue-600" : "text-gray-400"}`}>
                      {stage.time}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification opt-in */}
        <div className="bg-blue-50 rounded-2xl p-3 flex items-center gap-3">
          <span className="text-xl">🔔</span>
          <div className="flex-1">
            <p className="text-xs font-semibold text-blue-800">Get notified when ready</p>
            <p className="text-xs text-blue-600">We'll send a notification when documents are ready.</p>
          </div>
          <button className="text-xs text-blue-700 font-semibold border border-blue-300 px-2.5 py-1 rounded-lg">
            Enable
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-2 pt-2 border-t border-gray-100 bg-white">
        <button
          onClick={() => navigate("/customer/collection")}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg shadow-blue-200"
        >
          View Collection Details
        </button>
      </div>
    </div>
  );
}
