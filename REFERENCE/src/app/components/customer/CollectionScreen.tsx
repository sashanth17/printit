import { useNavigate } from "react-router";
import { ChevronLeft, MapPin, Clock, CheckCircle } from "lucide-react";

function QRCode() {
  const size = 100;
  const cells = 21;
  const cell = size / cells;

  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1,0,0],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,1,1,1,0,1,1,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1,0,0],
    [1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,0,1,0,1,1,0,1,0,1,1,0,1],
    [0,1,1,0,1,0,0,0,1,1,0,1,1,0,1,0,1,1,0,1,0],
    [1,1,0,0,1,1,1,1,0,1,1,0,0,1,1,1,0,0,1,0,1],
    [0,0,1,0,0,1,0,1,1,0,1,0,1,1,0,0,1,0,0,1,0],
    [1,1,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,1,1,0,0,0,1,0,0],
    [1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,0,1,0,1,0,0],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,0],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,1,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0],
    [1,0,1,1,1,0,1,0,1,0,1,1,0,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,1,0,0,1,0],
    [1,1,1,1,1,1,1,0,1,0,1,0,0,1,1,0,1,1,0,0,1],
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" />
      {pattern.map((row, r) =>
        row.map((col, c) =>
          col ? <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#111" /> : null
        )
      )}
    </svg>
  );
}

export function CollectionScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Nav */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-3 bg-white border-b border-gray-100">
        <button onClick={() => navigate("/customer/tracking")} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-900 text-sm flex-1">Collect Documents</span>
        <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full">
          <CheckCircle className="w-3 h-3 text-green-600" />
          <span className="text-xs text-green-700 font-semibold">Ready</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3 pb-4">
        {/* Ready Banner */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-3 flex items-center gap-2.5">
          <span className="text-xl">✅</span>
          <div>
            <p className="text-xs font-bold text-green-800">Your documents are ready!</p>
            <p className="text-xs text-green-700">Visit the station and show your token or QR code.</p>
          </div>
        </div>

        {/* Token */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Collection Token</p>
          <p className="text-6xl font-black text-gray-900 tracking-widest">A-47</p>
          <p className="text-xs text-gray-400 mt-1">Show this number at the counter</p>
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col items-center shadow-sm">
          <p className="text-xs font-semibold text-gray-700 mb-3">Or Scan QR Code</p>
          <div className="p-3 border-2 border-blue-100 rounded-2xl">
            <QRCode />
          </div>
          <p className="text-xs text-gray-400 mt-2">Scan at the vending station to auto-verify</p>
        </div>

        {/* Pickup Instructions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs font-bold text-gray-800 mb-3">Pickup Instructions</p>
          <div className="space-y-2.5">
            {[
              { n: "1", text: "Visit Campus Gate PrintGo station" },
              { n: "2", text: "Enter token A-47 on the touchscreen OR scan QR code" },
              { n: "3", text: "Collect your printed documents from the tray" },
              { n: "4", text: "Verify all pages before leaving the station" },
            ].map(({ n, text }) => (
              <div key={n} className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {n}
                </div>
                <p className="text-xs text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Station Info */}
        <div className="flex gap-2">
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-gray-800">Campus Gate</p>
              <p className="text-xs text-gray-500">0.3 km away</p>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-gray-800">Hold Time</p>
              <p className="text-xs text-gray-500">2 hrs 45 min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-2 pt-2 border-t border-gray-100 bg-white">
        <button
          onClick={() => navigate("/customer")}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg shadow-blue-200"
        >
          Done — Go Home
        </button>
      </div>
    </div>
  );
}
