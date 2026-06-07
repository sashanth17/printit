import { useState } from "react";
import { useNavigate } from "react-router";
import { Printer, Eye, EyeOff, ShieldCheck, Home } from "lucide-react";

export function TenantLoginScreen() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left illustration panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-purple-700 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/3 right-12 w-32 h-32 rounded-full bg-white/5" />

        {/* Printer illustration */}
        <div className="relative mb-8">
          <div className="w-40 h-28 bg-white/20 rounded-2xl flex flex-col items-center justify-between py-4 px-6 border border-white/30">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-red-400" />
            </div>
            <Printer className="w-12 h-12 text-white/70" />
          </div>
          {/* Paper strips */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex flex-col gap-1 items-center">
            <div className="w-24 h-3 bg-white/60 rounded-sm" />
            <div className="w-20 h-3 bg-white/40 rounded-sm" />
          </div>
          {/* Floating cards */}
          <div className="absolute -top-4 -right-12 bg-white/20 backdrop-blur rounded-xl px-3 py-2 border border-white/30">
            <p className="text-white text-xs font-bold">247 prints today</p>
          </div>
          <div className="absolute -bottom-8 -left-12 bg-white/20 backdrop-blur rounded-xl px-3 py-2 border border-white/30">
            <p className="text-white text-xs font-bold">₹4,280 revenue</p>
          </div>
        </div>

        <h2 className="text-white text-center mb-2">Smart Print Management</h2>
        <p className="text-blue-200 text-center text-sm max-w-xs">
          Manage your PrintGo vending station — orders, queue, and revenue all in one place.
        </p>

        <div className="flex gap-4 mt-8">
          {["247 Orders", "₹4,280 Revenue", "99.2% Uptime"].map((s) => (
            <div key={s} className="bg-white/10 rounded-xl px-3 py-2 text-center">
              <p className="text-white text-xs font-bold">{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-gray-500 text-sm hover:text-gray-800 transition-colors"
        >
          <Home className="w-4 h-4" /> Back to Hub
        </button>

        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Printer className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900">PrintGo Admin</p>
              <p className="text-gray-500 text-xs">Tenant Console</p>
            </div>
          </div>

          <h1 className="text-gray-900 mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm mb-8">Sign in to manage your print station</p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Email Address</label>
              <input
                type="email"
                defaultValue="rajan@printgo.in"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                placeholder="you@printshop.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  defaultValue="password123"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-12"
                  placeholder="••••••••"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button className="text-sm text-blue-600 font-medium hover:underline">Forgot password?</button>
            </div>

            <button
              onClick={() => navigate("/admin/dashboard")}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-blue-200"
            >
              Sign In to Dashboard
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            Secured with 256-bit SSL encryption
          </div>
        </div>
      </div>
    </div>
  );
}
