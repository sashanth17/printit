import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Printer, FileText, User, Phone, Clock, CheckCircle, Play } from "lucide-react";

export function OrderDetailsScreen() {
  const navigate = useNavigate();
  const { id = "PG-2401" } = useParams();

  const order = {
    id,
    customer: "Arjun Kumar",
    phone: "+91 98765 43210",
    email: "arjun.k@college.edu",
    files: [
      { name: "Project_Report.pdf", pages: 12, size: "2.4 MB" },
      { name: "Resume_2024.pdf", pages: 2, size: "0.8 MB" },
    ],
    config: {
      type: "Black & White",
      side: "Single Side",
      copies: 1,
      paperSize: "A4",
      binding: "No Binding",
      pageRange: "All pages (14)",
    },
    amount: "₹38",
    token: "A-47",
    status: "Printing",
    placed: "2:14 PM, 3 Jun 2026",
  };

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/orders")}
          className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-gray-900">Order {order.id}</h1>
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> {order.status}
            </span>
          </div>
          <p className="text-gray-500 text-sm">Placed at {order.placed} · Token {order.token}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm px-4 py-2 rounded-xl hover:bg-gray-50">
            <Play className="w-4 h-4 text-blue-600" /> Reprint
          </button>
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-5 py-2 rounded-xl hover:opacity-90 shadow-lg shadow-blue-200"
          >
            <Printer className="w-4 h-4" /> Print Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* PDF Preview Panel */}
        <div className="col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">Document Preview</p>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
          </div>
          {/* PDF Mock Preview */}
          <div className="bg-gray-100 flex items-center justify-center" style={{ minHeight: "420px" }}>
            <div className="flex gap-4 p-6">
              {[1, 2].map((page) => (
                <div key={page} className="w-40 h-52 bg-white rounded-xl shadow-md flex flex-col p-4 gap-2">
                  <div className="h-2 bg-gray-300 rounded-full w-full" />
                  <div className="h-2 bg-gray-200 rounded-full w-3/4" />
                  <div className="h-2 bg-gray-200 rounded-full w-full" />
                  <div className="h-2 bg-gray-300 rounded-full w-5/6" />
                  <div className="h-16 bg-gray-100 rounded-lg mt-2" />
                  <div className="h-2 bg-gray-200 rounded-full w-full" />
                  <div className="h-2 bg-gray-200 rounded-full w-4/5" />
                  <div className="h-2 bg-gray-200 rounded-full w-full" />
                  <div className="h-2 bg-gray-200 rounded-full w-2/3" />
                  <div className="mt-auto text-center text-xs text-gray-400">Page {page}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-600">Project_Report.pdf · 12 pages</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <button className="px-2.5 py-1 bg-gray-100 rounded-lg hover:bg-gray-200">◀</button>
              <span>1 / 2 files</span>
              <button className="px-2.5 py-1 bg-gray-100 rounded-lg hover:bg-gray-200">▶</button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-2 space-y-4">
          {/* Customer Info */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Customer</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{order.customer}</p>
                <p className="text-xs text-gray-500">{order.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              {order.phone}
            </div>
          </div>

          {/* Files */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Files ({order.files.length})</p>
            <div className="space-y-2">
              {order.files.map((f) => (
                <div key={f.name} className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl">
                  <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{f.name}</p>
                    <p className="text-xs text-gray-500">{f.pages} pages · {f.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Print Specs */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Print Specifications</p>
            <div className="space-y-2">
              {Object.entries(order.config).map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-500 capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                  <span className="text-xs font-semibold text-gray-800">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-4 text-white">
            <p className="text-xs text-blue-200">Amount Paid</p>
            <p className="text-2xl font-black mt-0.5">{order.amount}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs text-blue-200">Payment confirmed via UPI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
