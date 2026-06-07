import { useState } from "react";
import { useNavigate } from "react-router";
import { CloudUpload, FileText, X, CheckCircle, ChevronLeft } from "lucide-react";

const mockFiles = [
  { id: 1, name: "Project_Report.pdf", size: "2.4 MB", pages: 12, done: true },
  { id: 2, name: "Resume_2024.pdf", size: "0.8 MB", pages: 2, done: true },
];

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

export function UploadScreen() {
  const navigate = useNavigate();
  const [files, setFiles] = useState(mockFiles);
  const [dragging, setDragging] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Nav */}
      <div className="flex items-center gap-2 px-4 pt-3">
        <button onClick={() => navigate("/customer")} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-900 text-sm">Upload Documents</span>
      </div>

      <StepBar current={1} />

      <div className="flex-1 px-4 overflow-y-auto space-y-4 pb-4">
        {/* Drag & Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={() => setDragging(false)}
          className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center gap-3 transition-colors ${
            dragging ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50"
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <CloudUpload className="w-7 h-7 text-blue-600" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-800">Drag & drop files here</p>
            <p className="text-xs text-gray-500 mt-0.5">PDF, DOCX, JPG, PNG supported</p>
            <p className="text-xs text-gray-400">Max 25 MB per file</p>
          </div>
          <button className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
            Browse Files
          </button>
        </div>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Uploaded ({files.length})</p>
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.id} className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{file.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">{file.size}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-gray-500">{file.pages} pages</span>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-1.5 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                  {file.done ? (
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : null}
                  <button onClick={() => setFiles(files.filter((f) => f.id !== file.id))} className="p-1 hover:bg-red-50 rounded-lg transition-colors">
                    <X className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tip */}
        <div className="bg-blue-50 rounded-xl p-3 flex gap-2">
          <span className="text-base">💡</span>
          <p className="text-xs text-blue-700">Merge multiple files into one order to save on service charges.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-2 pt-2 border-t border-gray-100">
        <button
          onClick={() => navigate("/customer/config")}
          disabled={files.length === 0}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold disabled:opacity-40 transition-opacity shadow-lg shadow-blue-200"
        >
          Continue to Print Settings →
        </button>
        <p className="text-center text-xs text-gray-400 mt-1.5">{files.length} file{files.length !== 1 ? "s" : ""} · 14 pages total</p>
      </div>
    </div>
  );
}
