import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { CheckCircle, Copy, MapPin } from "lucide-react";
import confetti from "canvas-confetti";

export function PaymentSuccessScreen() {
  const navigate = useNavigate();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 }, colors: ["#2563EB", "#7C3AED", "#10B981"] });
  }, []);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Success Hero */}
      <div className="flex-1 flex flex-col items-center px-5 overflow-y-auto pb-4">
        {/* Checkmark */}
        <div className="mt-6 mb-4 relative">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs">
            🎉
          </div>
        </div>

        <h2 className="text-gray-900 text-center">Payment Successful!</h2>
        <p className="text-gray-500 text-xs text-center mt-1">Your print order is confirmed and queued.</p>

        {/* Token Card */}
        <div className="w-full mt-5 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-5 text-white">
          <p className="text-xs text-blue-200 text-center mb-1">Your Collection Token</p>
          <p className="text-4xl font-black text-center tracking-widest">A-47</p>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <p className="text-xs text-blue-200">Show this at the vending station</p>
          </div>
        </div>

        {/* Order Info */}
        <div className="w-full mt-3 bg-gray-50 rounded-2xl p-4 space-y-2.5">
          {[
            { label: "Order ID", value: "PG-2401-0047" },
            { label: "Amount Paid", value: "₹38" },
            { label: "Estimated Ready", value: "~8 minutes" },
            { label: "Station", value: "Campus Gate PrintGo" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{label}</span>
              <span className="text-xs font-semibold text-gray-900">{value}</span>
            </div>
          ))}
        </div>

        {/* Status timeline mini */}
        <div className="w-full mt-3 bg-white border border-gray-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-gray-700 mb-3">Order Progress</p>
          <div className="flex items-center gap-0">
            {[
              { label: "Received", done: true },
              { label: "Verified", done: true },
              { label: "Printing", done: false, active: true },
              { label: "Ready", done: false },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step.done ? "bg-green-500" : step.active ? "bg-blue-600 animate-pulse" : "bg-gray-200"
                  }`}>
                    {step.done ? "✓" : step.active ? "•" : ""}
                  </div>
                  <span className={`text-xs mt-1 ${step.active ? "text-blue-600 font-semibold" : step.done ? "text-green-600" : "text-gray-400"}`}>
                    {step.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className={`h-0.5 flex-1 mb-4 ${step.done ? "bg-green-400" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Copy token */}
        <button className="mt-3 flex items-center gap-2 text-xs text-blue-600 font-medium">
          <Copy className="w-3.5 h-3.5" /> Copy Order ID: PG-2401-0047
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 pb-2 pt-2 border-t border-gray-100 space-y-2">
        <button
          onClick={() => navigate("/customer/tracking")}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg shadow-blue-200"
        >
          Track Order
        </button>
        <button
          onClick={() => navigate("/customer")}
          className="w-full py-2.5 text-gray-600 text-xs font-medium"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
