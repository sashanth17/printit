import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { endpoints } from "../../config/endpoints.js";
import { useFetch } from "../../hooks/useFetch.js";

import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

import styles from "./orders.module.css";

/* ✅ FIX: proper worker setup (NO CDN, NO fake worker) */
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function Orders() {
  const navigate = useNavigate();

  const [copies, setCopies] = useState(1);
  const [printType, setPrintType] = useState("bw");
  const [sideType, setSideType] = useState("single");

  const [pageStart, setPageStart] = useState(1);
  const [pageEnd, setPageEnd] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ✅ Extract PDF page count */
  const getPdfPages = async (file) => {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    return pdf.numPages;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    try {
      const pages = await getPdfPages(file);

      setTotalPages(pages);
      setPageStart(1);
      setPageEnd(pages);
    } catch (err) {
      console.log("PDF read error:", err);
      alert("Failed to read PDF. Try another file.");
    }
  };

  const handlePageStartChange = (value) => {
    const val = Math.max(1, Number(value) || 1);

    setPageStart(val);

    if (val > pageEnd) {
      setPageEnd(val);
    }
  };

  const handlePageEndChange = (value) => {
    const val = Math.min(
      totalPages || 1,
      Math.max(pageStart, Number(value) || pageStart)
    );

    setPageEnd(val);
  };

  const handleContinue = async () => {
    try {
      if (!selectedFile) {
        alert("Please select a file");
        return;
      }

      if (!totalPages) {
        alert("PDF not loaded properly");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("User", "1");
      formData.append("PageStart", pageStart);
      formData.append("PageEnd", pageEnd);
      formData.append("IsColour", printType === "color");
      formData.append("Copies", copies);
      formData.append("IsDoubleSide", sideType === "double");
      formData.append("File", selectedFile);

      const response = await useFetch({
        endpoint: endpoints.USER.CREATE_ORDER,
        method: "POST",
        body: formData,
      });

      console.log(response);

      if (response.success) {
        navigate(
          `/orders/payment-window?id=${response.data.orderId}`
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loader}></div>
          <p className={styles.loadingText}>
            Creating your order...
          </p>
        </div>
      )}

      <div className={styles.wrapper}>
        <h1 className={styles.title}>Print Order</h1>

        {/* Upload */}
        <div className={styles.card}>
          <p className={styles.label}>Upload Document</p>

          <div className={styles.uploadBox}>
            <p className={styles.uploadTitle}>
              Drag & Drop Files
            </p>
            <p className={styles.uploadSub}>
              PDF, DOCX supported
            </p>

            {selectedFile && (
              <p className={styles.fileName}>
                {selectedFile.name}
              </p>
            )}

            <input
              type="file"
              id="fileUpload"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />

            <button
              className={styles.secondaryButton}
              onClick={() =>
                document.getElementById("fileUpload").click()
              }
            >
              Browse Files
            </button>

            {totalPages > 0 && (
              <p className={styles.hint}>
                Detected pages: {totalPages}
              </p>
            )}
          </div>
        </div>

        {/* Print Type */}
        <div className={styles.card}>
          <p className={styles.label}>Print Type</p>

          <div className={styles.row}>
            <button
              onClick={() => setPrintType("bw")}
              className={
                printType === "bw"
                  ? styles.optionActive
                  : styles.option
              }
            >
              Black & White
            </button>

            <button
              onClick={() => setPrintType("color")}
              className={
                printType === "color"
                  ? styles.optionActive
                  : styles.option
              }
            >
              Color
            </button>
          </div>
        </div>

        {/* Side Type */}
        <div className={styles.card}>
          <p className={styles.label}>Print Side</p>

          <div className={styles.row}>
            <button
              onClick={() => setSideType("single")}
              className={
                sideType === "single"
                  ? styles.optionActive
                  : styles.option
              }
            >
              Single Side
            </button>

            <button
              onClick={() => setSideType("double")}
              className={
                sideType === "double"
                  ? styles.optionActive
                  : styles.option
              }
            >
              Double Side
            </button>
          </div>
        </div>

        {/* Copies */}
        <div className={styles.card}>
          <p className={styles.label}>Copies</p>

          <div className={styles.counter}>
            <button
              className={styles.counterButton}
              onClick={() => setCopies(Math.max(1, copies - 1))}
            >
              -
            </button>

            <span className={styles.count}>{copies}</span>

            <button
              className={styles.counterButton}
              onClick={() => setCopies(copies + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Page Range */}
        <div className={styles.card}>
          <p className={styles.label}>Page Range</p>

          <div className={styles.row}>
            <div>
              <p className={styles.smallLabel}>Start Page</p>
              <input
                type="number"
                min={1}
                max={totalPages || 1}
                value={pageStart}
                disabled={!totalPages}
                onChange={(e) =>
                  handlePageStartChange(e.target.value)
                }
                className={styles.input}
              />
            </div>

            <div>
              <p className={styles.smallLabel}>End Page</p>
              <input
                type="number"
                min={pageStart}
                max={totalPages || 1}
                value={pageEnd}
                disabled={!totalPages}
                onChange={(e) =>
                  handlePageEndChange(e.target.value)
                }
                className={styles.input}
              />
            </div>
          </div>

          <p className={styles.hint}>
            Allowed range:{" "}
            {totalPages ? `1 – ${totalPages}` : "Upload PDF first"}
          </p>
        </div>

        <button
          className={styles.primaryButton}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>

      <Outlet />
    </div>
  );
}

export default Orders;