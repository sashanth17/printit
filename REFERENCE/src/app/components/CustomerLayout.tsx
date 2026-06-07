import { Outlet, useNavigate } from "react-router";
import { Home } from "lucide-react";

export function CustomerLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center p-6">
      {/* Back to Hub */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 z-50 inline-flex items-center gap-1.5 bg-white/80 backdrop-blur text-gray-700 text-xs px-3 py-1.5 rounded-full border border-gray-200 shadow-sm hover:bg-white transition-colors"
      >
        <Home className="w-3 h-3" /> Hub
      </button>

      {/* Phone Frame */}
      <div className="relative w-[390px] flex-shrink-0">
        {/* Outer bezel */}
        <div className="bg-gray-900 rounded-[52px] p-2.5 shadow-2xl">
          {/* Inner screen */}
          <div className="bg-white rounded-[42px] overflow-hidden" style={{ height: "820px" }}>
            {/* Status Bar */}
            <div className="flex items-center justify-between px-8 pt-4 pb-2 bg-white z-10">
              <span className="text-xs font-bold text-gray-900">9:41</span>
              <div className="w-24 h-6 bg-gray-900 rounded-full absolute left-1/2 -translate-x-1/2 top-3" />
              <div className="flex items-center gap-1.5">
                <div className="flex gap-px items-end h-3">
                  {[2, 3, 4, 5].map((h, i) => (
                    <div key={i} className="w-1 bg-gray-900 rounded-full" style={{ height: `${h * 2}px` }} />
                  ))}
                </div>
                <svg className="w-4 h-3" viewBox="0 0 24 12" fill="none">
                  <rect x="0.5" y="0.5" width="20" height="11" rx="3.5" stroke="#111" strokeWidth="1" />
                  <rect x="1.5" y="1.5" width="16" height="9" rx="2" fill="#111" />
                  <path d="M22 4v4a2 2 0 0 0 0-4z" fill="#111" />
                </svg>
              </div>
            </div>
            {/* Screen Content */}
            <div className="flex flex-col overflow-hidden" style={{ height: "calc(820px - 56px - 32px)" }}>
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                <Outlet />
              </div>
            </div>
            {/* Home Indicator */}
            <div className="h-8 flex items-center justify-center">
              <div className="w-28 h-1 bg-gray-300 rounded-full" />
            </div>
          </div>
        </div>
        {/* Side buttons */}
        <div className="absolute -left-2 top-24 w-1.5 h-8 bg-gray-700 rounded-l" />
        <div className="absolute -left-2 top-36 w-1.5 h-12 bg-gray-700 rounded-l" />
        <div className="absolute -left-2 top-52 w-1.5 h-12 bg-gray-700 rounded-l" />
        <div className="absolute -right-2 top-32 w-1.5 h-16 bg-gray-700 rounded-r" />
      </div>
    </div>
  );
}
