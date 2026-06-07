import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ShieldCheck, ChevronRight, CreditCard, Landmark } from "lucide-react";

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className={`flex-1 h-1.5 rounded-full transition-colors ${s <= current ? "bg-blue-600" : "bg-gray-200"}`} />
      ))}
      <span className="text-xs text-gray-500 ml-1 whitespace-nowrap">Step {current}/4</span>
    </div>
  );
}

const upiOptions = [
  { id: "gpay", name: "Google Pay", handle: "@okaxis", color: "#4285F4", initial: "G" },
  { id: "phonepe", name: "PhonePe", handle: "@ybl", color: "#5F259F", initial: "P" },
  { id: "paytm", name: "Paytm", handle: "@paytm", color: "#00BAF2", initial: "P" },
];

export function PaymentScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("gpay");

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Nav */}
      <div className="flex items-center gap-2 px-4 pt-3 bg-white">
        <button onClick={() => navigate("/customer/bill")} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-900 text-sm">Payment</span>
      </div>
      <div className="bg-white">
        <StepBar current={4} />
      </div>

      <div className="flex-1 px-4 overflow-y-auto space-y-3 py-3 pb-4">
        {/* Amount */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Amount to Pay</p>
            <p className="text-xl font-black text-gray-900">₹38</p>
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            <span className="text-xs text-green-700 font-semibold">Secure</span>
          </div>
        </div>

        {/* UPI */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">UPI</p>
          </div>
          {upiOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0 transition-colors ${
                selected === opt.id ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: opt.color }}
              >
                {opt.initial}
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs font-semibold text-gray-900">{opt.name}</p>
                <p className="text-xs text-gray-500">{opt.handle}</p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selected === opt.id ? "border-blue-600" : "border-gray-300"
              }`}>
                {selected === opt.id && <div className="w-2 h-2 rounded-full bg-blue-600" />}
              </div>
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Debit / Credit Card</p>
          </div>
          <button
            onClick={() => setSelected("card")}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${selected === "card" ? "bg-blue-50" : "hover:bg-gray-50"}`}
          >
            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-semibold text-gray-900">Add New Card</p>
              <p className="text-xs text-gray-500">Visa, Mastercard, RuPay</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        {/* Net Banking */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Net Banking</p>
          </div>
          <button
            onClick={() => setSelected("netbanking")}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${selected === "netbanking" ? "bg-blue-50" : "hover:bg-gray-50"}`}
          >
            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Landmark className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-semibold text-gray-900">All Banks</p>
              <p className="text-xs text-gray-500">SBI, HDFC, ICICI & more</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
          256-bit SSL encrypted · Powered by Razorpay
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-2 pt-2 border-t border-gray-200 bg-white">
        <button
          onClick={() => navigate("/customer/success")}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg shadow-blue-200"
        >
          Pay Now · ₹38
        </button>
      </div>
    </div>
  );
}
