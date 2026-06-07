import { useNavigate } from "react-router";
import { ChevronLeft, FileText, Info } from "lucide-react";

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

const orderItems = [
  { file: "Project_Report.pdf", pages: 12, type: "B&W Single Side", copies: 1, cost: 18 },
  { file: "Resume_2024.pdf", pages: 2, type: "Color Single Side", copies: 1, cost: 10 },
];

function Row({ label, value, sub }: { label: string; value: string; sub?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2 ${sub ? "border-b border-gray-100" : ""}`}>
      <span className={`text-xs ${sub ? "text-gray-500" : "text-gray-700 font-medium"}`}>{label}</span>
      <span className={`text-xs font-semibold ${sub ? "text-gray-600" : "text-gray-900"}`}>{value}</span>
    </div>
  );
}

export function BillEstimationScreen() {
  const navigate = useNavigate();
  const printingCost = 28;
  const serviceCharge = 5;
  const gst = Math.round((printingCost + serviceCharge) * 0.18);
  const total = printingCost + serviceCharge + gst;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Nav */}
      <div className="flex items-center gap-2 px-4 pt-3 bg-white">
        <button onClick={() => navigate("/customer/config")} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-900 text-sm">Bill Estimate</span>
      </div>

      <div className="bg-white">
        <StepBar current={3} />
      </div>

      <div className="flex-1 px-4 overflow-y-auto space-y-3 py-3 pb-4">
        {/* File Cards */}
        {orderItems.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate">{item.file}</p>
                <p className="text-xs text-gray-500">{item.pages} pages · {item.type} · {item.copies} copy</p>
              </div>
              <span className="text-xs font-bold text-gray-900">₹{item.cost}</span>
            </div>
          </div>
        ))}

        {/* Cost Breakdown */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-800 mb-2 pb-2 border-b border-gray-100">Cost Breakdown</p>
          <Row label="Printing Cost (14 pages)" value={`₹${printingCost}`} sub />
          <Row label="Service Charge" value={`₹${serviceCharge}`} sub />
          <Row label="GST (18%)" value={`₹${gst}`} sub />
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
            <Info className="w-3 h-3" />
            <span>Prices inclusive of all taxes</span>
          </div>
        </div>

        {/* Total Card */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-4 text-white shadow-lg shadow-blue-200">
          <p className="text-xs text-blue-200 mb-0.5">Grand Total</p>
          <p className="text-3xl font-black">₹{total}</p>
          <div className="flex items-center gap-4 mt-3">
            <div>
              <p className="text-xs text-blue-300">Total Pages</p>
              <p className="text-sm font-bold">14 pages</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-xs text-blue-300">Print Type</p>
              <p className="text-sm font-bold">Mixed</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-xs text-blue-300">Copies</p>
              <p className="text-sm font-bold">1 each</p>
            </div>
          </div>
        </div>

        {/* Station */}
        <div className="bg-green-50 rounded-2xl p-3 border border-green-100 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
          <p className="text-xs text-green-800">Station: <span className="font-semibold">Campus Gate PrintGo</span> · Ready in ~8 min</p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-2 pt-2 border-t border-gray-200 bg-white">
        <button
          onClick={() => navigate("/customer/payment")}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg shadow-blue-200"
        >
          Proceed to Payment · ₹{total}
        </button>
      </div>
    </div>
  );
}
