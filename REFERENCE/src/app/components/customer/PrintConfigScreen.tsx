import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Minus, Plus, ChevronDown } from "lucide-react";

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

function ToggleCard({
  label, sublabel, selected, onSelect,
}: { label: string; sublabel: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={`flex-1 rounded-xl p-3 border-2 text-left transition-all ${
        selected ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"
      }`}
    >
      <div className={`text-xs font-semibold ${selected ? "text-blue-700" : "text-gray-800"}`}>{label}</div>
      <div className="text-xs text-gray-500 mt-0.5">{sublabel}</div>
      {selected && <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center mt-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>}
    </button>
  );
}

export function PrintConfigScreen() {
  const navigate = useNavigate();
  const [colorMode, setColorMode] = useState<"color" | "bw">("bw");
  const [sideMode, setSideMode] = useState<"single" | "double">("single");
  const [copies, setCopies] = useState(1);
  const [paperSize, setPaperSize] = useState("A4");
  const [binding, setBinding] = useState("none");

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Nav */}
      <div className="flex items-center gap-2 px-4 pt-3">
        <button onClick={() => navigate("/customer/upload")} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-900 text-sm">Print Configuration</span>
      </div>

      <StepBar current={2} />

      <div className="flex-1 px-4 overflow-y-auto space-y-4 pb-4">
        {/* Color Mode */}
        <div className="bg-gray-50 rounded-2xl p-3">
          <p className="text-xs font-semibold text-gray-700 mb-2">Print Type</p>
          <div className="flex gap-2">
            <ToggleCard label="Color Print" sublabel="Vivid colors" selected={colorMode === "color"} onSelect={() => setColorMode("color")} />
            <ToggleCard label="Black & White" sublabel="Cost effective" selected={colorMode === "bw"} onSelect={() => setColorMode("bw")} />
          </div>
        </div>

        {/* Side Mode */}
        <div className="bg-gray-50 rounded-2xl p-3">
          <p className="text-xs font-semibold text-gray-700 mb-2">Print Side</p>
          <div className="flex gap-2">
            <ToggleCard label="Single Side" sublabel="One page/sheet" selected={sideMode === "single"} onSelect={() => setSideMode("single")} />
            <ToggleCard label="Double Side" sublabel="Saves paper" selected={sideMode === "double"} onSelect={() => setSideMode("double")} />
          </div>
        </div>

        {/* Copies */}
        <div className="bg-gray-50 rounded-2xl p-3">
          <p className="text-xs font-semibold text-gray-700 mb-2">Number of Copies</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCopies(Math.max(1, copies - 1))}
              className="w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Minus className="w-4 h-4 text-gray-700" />
            </button>
            <span className="text-xl font-bold text-gray-900 w-8 text-center">{copies}</span>
            <button
              onClick={() => setCopies(copies + 1)}
              className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Paper Size */}
        <div className="bg-gray-50 rounded-2xl p-3">
          <p className="text-xs font-semibold text-gray-700 mb-2">Paper Size</p>
          <div className="flex gap-2">
            {["A4", "A3", "Letter"].map((size) => (
              <button
                key={size}
                onClick={() => setPaperSize(size)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                  paperSize === size ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Page Range */}
        <div className="bg-gray-50 rounded-2xl p-3">
          <p className="text-xs font-semibold text-gray-700 mb-2">Page Range</p>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-1.5 flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-xs text-gray-500">From</span>
              <input className="flex-1 text-xs text-gray-800 bg-transparent outline-none w-10" defaultValue="1" type="number" min="1" />
            </div>
            <span className="text-xs text-gray-400">to</span>
            <div className="flex items-center gap-1.5 flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-xs text-gray-500">To</span>
              <input className="flex-1 text-xs text-gray-800 bg-transparent outline-none w-10" defaultValue="14" type="number" min="1" />
            </div>
            <button className="px-3 py-2 bg-white border border-gray-200 rounded-xl">
              <span className="text-xs text-gray-600 font-medium">All</span>
            </button>
          </div>
        </div>

        {/* Binding */}
        <div className="bg-gray-50 rounded-2xl p-3">
          <p className="text-xs font-semibold text-gray-700 mb-2">Binding Option</p>
          <div className="relative">
            <select
              value={binding}
              onChange={(e) => setBinding(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 appearance-none outline-none pr-8"
            >
              <option value="none">No Binding</option>
              <option value="staple">Staple Binding</option>
              <option value="spiral">Spiral Binding (+₹20)</option>
              <option value="thermal">Thermal Binding (+₹40)</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-2 pt-2 border-t border-gray-100">
        <button
          onClick={() => navigate("/customer/bill")}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg shadow-blue-200"
        >
          View Bill Estimate →
        </button>
        <p className="text-center text-xs text-gray-400 mt-1.5">
          {colorMode === "color" ? "Color" : "B&W"} · {sideMode === "single" ? "Single" : "Double"} side · {copies} cop{copies > 1 ? "ies" : "y"} · {paperSize}
        </p>
      </div>
    </div>
  );
}
