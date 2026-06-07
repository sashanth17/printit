import { useState } from "react";
import { Search, QrCode, CheckCircle, User, Phone, FileText, Package } from "lucide-react";

const mockVerified = {
  token: "A-47",
  orderId: "PG-2401",
  customer: "Arjun Kumar",
  phone: "+91 98765 43210",
  email: "arjun.k@college.edu",
  pages: 14,
  type: "B&W · Single Side",
  paid: "₹38",
  files: ["Project_Report.pdf", "Resume_2024.pdf"],
  status: "Ready",
};

export function CollectionVerificationScreen() {
  const [tokenInput, setTokenInput] = useState("");
  const [verified, setVerified] = useState<typeof mockVerified | null>(null);
  const [scanMode, setScanMode] = useState(false);
  const [delivered, setDelivered] = useState(false);

  const handleVerify = () => {
    if (tokenInput.trim().toUpperCase() === "A-47" || tokenInput.trim() !== "") {
      setVerified(mockVerified);
    }
  };

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-gray-900">Collection Verification</h1>
        <p className="text-gray-500 text-sm">Verify customer token and hand over documents</p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Left: Verification input */}
        <div className="space-y-4">
          {/* Toggle: Token / QR */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-1.5 flex">
            <button
              onClick={() => setScanMode(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${!scanMode ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-800"}`}
            >
              <Search className="w-4 h-4" /> Token Entry
            </button>
            <button
              onClick={() => setScanMode(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${scanMode ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-800"}`}
            >
              <QrCode className="w-4 h-4" /> QR Scan
            </button>
          </div>

          {!scanMode ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <p className="text-sm font-semibold text-gray-800 mb-3">Enter Collection Token</p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="e.g. A-47"
                  className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-lg font-bold text-gray-900 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-center tracking-widest placeholder:text-gray-300 placeholder:font-normal placeholder:text-base"
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                />
              </div>
              <button
                onClick={handleVerify}
                className="mt-3 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Verify Token
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">Type any token and click Verify to demo</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col items-center">
              <p className="text-sm font-semibold text-gray-800 mb-4">QR Scanner</p>
              <div className="w-48 h-48 border-2 border-dashed border-blue-300 rounded-2xl bg-blue-50 flex flex-col items-center justify-center gap-3 relative">
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-blue-600 rounded-tl-lg" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-blue-600 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-blue-600 rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-blue-600 rounded-br-lg" />
                <QrCode className="w-12 h-12 text-blue-400" />
                <p className="text-xs text-blue-600 font-medium">Point camera at QR code</p>
                <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-blue-500/60 rounded-full animate-pulse" />
              </div>
              <button
                onClick={() => { setScanMode(false); setVerified(mockVerified); }}
                className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:opacity-90"
              >
                Simulate Scan
              </button>
            </div>
          )}

          {/* Recent Verifications */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Recent Handovers</p>
            <div className="space-y-2">
              {[
                { token: "B-22", name: "Rohit V.", time: "2:05 PM" },
                { token: "C-08", name: "Kavya L.", time: "1:48 PM" },
                { token: "A-41", name: "Sanjay P.", time: "1:32 PM" },
              ].map((r) => (
                <div key={r.token} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="text-xs font-semibold text-gray-800">Token {r.token}</p>
                      <p className="text-xs text-gray-500">{r.name}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{r.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Customer card */}
        <div>
          {!verified ? (
            <div className="h-full bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 text-gray-300 p-8">
              <Package className="w-12 h-12" />
              <p className="text-sm text-center">Enter a token or scan a QR code to see customer details</p>
            </div>
          ) : delivered ? (
            <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-8 flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-gray-900">Delivered!</h2>
              <p className="text-gray-500 text-sm">Token <span className="font-bold">{verified.token}</span> marked as collected.</p>
              <button
                onClick={() => { setVerified(null); setDelivered(false); setTokenInput(""); }}
                className="mt-3 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700"
              >
                Next Customer
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-5 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-blue-200">Collection Token</span>
                  <span className="text-xs bg-green-400/30 text-green-100 px-2.5 py-0.5 rounded-full font-semibold">{verified.status}</span>
                </div>
                <p className="text-4xl font-black tracking-widest">{verified.token}</p>
                <p className="text-xs text-blue-200 mt-1">Order {verified.orderId}</p>
              </div>

              <div className="p-4 space-y-4">
                {/* Customer */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {verified.customer[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <p className="text-sm font-semibold text-gray-900">{verified.customer}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <p className="text-xs text-gray-500">{verified.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { l: "Pages", v: verified.pages },
                    { l: "Type", v: verified.type },
                    { l: "Amount", v: verified.paid },
                    { l: "Files", v: `${verified.files.length} files` },
                  ].map(({ l, v }) => (
                    <div key={l} className="bg-gray-50 rounded-xl p-2.5">
                      <p className="text-xs text-gray-500">{l}</p>
                      <p className="text-xs font-bold text-gray-900 mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>

                {/* Files */}
                <div className="space-y-1.5">
                  {verified.files.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <FileText className="w-3.5 h-3.5 text-red-500" />
                      {f}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setDelivered(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-sm hover:opacity-90 shadow-lg shadow-green-200"
                >
                  ✓ Mark as Delivered
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
