import { Printer, Pause, RefreshCw, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const activeJobs = [
  {
    id: "PG-2401",
    customer: "Arjun Kumar",
    file: "Project_Report.pdf",
    pages: 14,
    printed: 9,
    type: "B&W",
    printer: "Printer 1",
    token: "A-47",
    startedAt: "2:14 PM",
    eta: "~2 min",
    status: "printing",
  },
  {
    id: "PG-2399",
    customer: "Meera Sharma",
    file: "Assignment_Final.pdf",
    pages: 10,
    printed: 0,
    type: "Color",
    printer: "Printer 2",
    token: "B-12",
    startedAt: "—",
    eta: "~6 min",
    status: "queued",
  },
];

const printers = [
  { id: 1, name: "Printer 1", model: "HP LaserJet Pro M404n", status: "Online", paper: 78, ink: 65, active: true },
  { id: 2, name: "Printer 2", model: "Canon LBP6030B", status: "Paper Low", paper: 12, ink: 80, active: false, warning: true },
];

function GaugeBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-gray-600 w-8 text-right">{value}%</span>
    </div>
  );
}

export function PrintingStatusScreen() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Printing Status</h1>
          <p className="text-gray-500 text-sm">Real-time job monitor</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm px-3 py-2 rounded-xl hover:bg-gray-50">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Printer Status Cards */}
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Printer Status</p>
        <div className="grid grid-cols-2 gap-4">
          {printers.map((printer) => (
            <div key={printer.id} className={`bg-white rounded-2xl border p-4 shadow-sm ${printer.warning ? "border-yellow-200" : "border-gray-200"}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl ${printer.active ? "bg-blue-100" : "bg-gray-100"} flex items-center justify-center`}>
                    <Printer className={`w-5 h-5 ${printer.active ? "text-blue-600" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{printer.name}</p>
                    <p className="text-xs text-gray-500">{printer.model}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  printer.warning ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                }`}>
                  {printer.warning ? <AlertTriangle className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
                  {printer.status}
                </div>
              </div>
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">Paper Level</span>
                  </div>
                  <GaugeBar value={printer.paper} color={printer.paper < 20 ? "bg-red-500" : printer.paper < 40 ? "bg-yellow-500" : "bg-green-500"} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">Toner Level</span>
                  </div>
                  <GaugeBar value={printer.ink} color={printer.ink < 20 ? "bg-red-500" : "bg-blue-500"} />
                </div>
              </div>
              {printer.active && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-blue-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Printing PG-2401 · Page 9 of 14
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active Jobs */}
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Active Jobs ({activeJobs.length})</p>
        <div className="space-y-3">
          {activeJobs.map((job) => {
            const progress = Math.round((job.printed / job.pages) * 100);
            return (
              <div key={job.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-blue-600">{job.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        job.status === "printing" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {job.status === "printing" ? "● Printing" : "⏳ Queued"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{job.customer} · Token <span className="font-bold">{job.token}</span></p>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                      <Pause className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    </button>
                  </div>
                </div>

                {/* File Info */}
                <div className="flex items-center gap-2 mb-3 p-2.5 bg-gray-50 rounded-xl">
                  <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
                    <span className="text-xs">📄</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-800">{job.file}</p>
                    <p className="text-xs text-gray-500">{job.pages} pages · {job.type} · {job.printer}</p>
                  </div>
                </div>

                {/* Progress */}
                {job.status === "printing" && (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-gray-600">Progress: {job.printed}/{job.pages} pages</span>
                      <span className="text-xs font-bold text-blue-600">{progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Started {job.startedAt}</span>
                      <span className="flex items-center gap-1">ETA {job.eta}</span>
                    </div>
                  </div>
                )}

                {job.status === "queued" && (
                  <div className="flex items-center gap-2 text-xs text-yellow-600">
                    <Clock className="w-3.5 h-3.5" />
                    Waiting for Printer 2 to be available · ETA {job.eta}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Queue Summary */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Queue Summary</p>
        <div className="grid grid-cols-4 gap-4 text-center">
          {[
            { label: "In Queue", value: "4", color: "text-yellow-600" },
            { label: "Printing", value: "1", color: "text-blue-600" },
            { label: "Completed", value: "47", color: "text-green-600" },
            { label: "Avg Wait", value: "6 min", color: "text-purple-600" },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <p className={`text-xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
