import { useNavigate } from "react-router";
import { Printer, MapPin, Upload, CreditCard, Package, Star } from "lucide-react";

export function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <Printer className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">PrintGo</span>
        </div>
        <button className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1.5 rounded-full">
          Sign In
        </button>
      </div>

      {/* Hero Card */}
      <div className="mx-4 mt-2 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-5 overflow-hidden relative">
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-white/10" />
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10" />

        {/* Illustration */}
        <div className="flex justify-center mb-4 mt-2">
          <div className="relative flex items-end gap-3">
            {/* Phone */}
            <div className="w-12 h-20 bg-white/25 rounded-xl border border-white/40 flex flex-col items-center justify-center gap-1 p-1.5">
              <div className="w-full h-1 bg-white/50 rounded" />
              <div className="w-full h-1 bg-white/50 rounded" />
              <div className="w-3/4 h-1 bg-white/50 rounded" />
              <div className="w-full h-4 bg-white/30 rounded mt-1 flex items-center justify-center">
                <Upload className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            {/* Arrow */}
            <div className="flex flex-col gap-0.5 mb-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-5 h-0.5 bg-white/50 rounded" style={{ transform: `translateX(${i * 2}px)` }} />
              ))}
            </div>
            {/* Printer */}
            <div className="w-16 h-12 bg-white/25 rounded-xl border border-white/40 flex flex-col items-center justify-between py-1.5 px-2 mb-2">
              <Printer className="w-5 h-5 text-white" />
              <div className="w-full h-0.5 bg-white/30 rounded" />
            </div>
            {/* Papers */}
            <div className="absolute -bottom-1 right-2 flex flex-col gap-0.5">
              <div className="w-10 h-2 bg-white/70 rounded-sm" />
              <div className="w-8 h-2 bg-white/50 rounded-sm ml-1" />
            </div>
          </div>
        </div>

        <h1 className="text-white text-center text-xl mb-1">Print Documents<br />Anywhere</h1>
        <p className="text-white/70 text-center text-xs">Upload · Pay · Collect from nearby station</p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-3 gap-2 px-4 mt-4">
        {[
          { icon: Upload, label: "Upload", desc: "PDF, DOCX, JPG", color: "bg-blue-50 text-blue-600" },
          { icon: CreditCard, label: "Pay", desc: "UPI / Card", color: "bg-purple-50 text-purple-600" },
          { icon: Package, label: "Collect", desc: "Token pickup", color: "bg-green-50 text-green-600" },
        ].map(({ icon: Icon, label, desc, color }) => (
          <div key={label} className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
            <div className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center mx-auto mb-2`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-gray-800">{label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
          </div>
        ))}
      </div>

      {/* Rating */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        <div className="flex">
          {[1,2,3,4,5].map((s) => (
            <Star key={s} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <span className="text-xs text-gray-500">4.8 · 12,400+ prints done</span>
      </div>

      {/* CTAs */}
      <div className="px-4 mt-4 space-y-2.5">
        <button
          onClick={() => navigate("/customer/upload")}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg shadow-blue-200 active:opacity-90 transition-opacity"
        >
          Start Printing
        </button>
        <button
          onClick={() => navigate("/customer/tracking")}
          className="w-full py-3.5 bg-white text-blue-600 rounded-2xl font-semibold border-2 border-blue-100 hover:bg-blue-50 transition-colors"
        >
          Track Order
        </button>
      </div>

      {/* Nearby */}
      <div className="px-4 mt-3 mb-2">
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-blue-800 text-xs font-medium">3 PrintGo stations near you</p>
            <p className="text-blue-600 text-xs">Nearest: 0.3 km · Open now</p>
          </div>
        </div>
      </div>
    </div>
  );
}
