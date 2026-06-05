import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { endpoints } from "../../config/endpoints.js";
import { useFetch } from "../../hooks/useFetch.js";

import styles from "./orders.module.css";

function Orders() {
  const navigate = useNavigate();

  const [copies, setCopies] = useState(1);
  const [printType, setPrintType] = useState("bw");
  const [sideType, setSideType] = useState("single");

  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleContinue = async () => {
    try {
      if (!selectedFile) {
        alert("Please select a file");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("User", "1");

      formData.append("PageStart", "1");

      formData.append("PageEnd", "20");

      formData.append(
        "IsColour",
        printType === "color"
      );

      formData.append(
        "Copies",
        copies
      );

      formData.append(
        "IsDoubleSide",
        sideType === "double"
      );

      formData.append(
        "File",
        selectedFile
      );

      const response = await useFetch({
        endpoint:
          endpoints.USER.CREATE_ORDER,

        method: "POST",

        body: formData,
      });

      console.log(response);

      if (response.success) {
        navigate(
          `/order/payment-window?id=${response.data.orderId}`
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

        <h1 className={styles.title}>
          Print Order
        </h1>

        {/* Upload */}
        <div className={styles.card}>
          <p className={styles.label}>
            Upload Document
          </p>

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
                document
                  .getElementById("fileUpload")
                  .click()
              }
            >
              Browse Files
            </button>
          </div>
        </div>

        {/* Print Type */}
        <div className={styles.card}>
          <p className={styles.label}>
            Print Type
          </p>

          <div className={styles.row}>
            <button
              onClick={() =>
                setPrintType("bw")
              }
              className={
                printType === "bw"
                  ? styles.optionActive
                  : styles.option
              }
            >
              Black & White
            </button>

            <button
              onClick={() =>
                setPrintType("color")
              }
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
          <p className={styles.label}>
            Print Side
          </p>

          <div className={styles.row}>
            <button
              onClick={() =>
                setSideType("single")
              }
              className={
                sideType === "single"
                  ? styles.optionActive
                  : styles.option
              }
            >
              Single Side
            </button>

            <button
              onClick={() =>
                setSideType("double")
              }
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
          <p className={styles.label}>
            Copies
          </p>

          <div className={styles.counter}>
            <button
              className={
                styles.counterButton
              }
              onClick={() =>
                setCopies(
                  Math.max(1, copies - 1)
                )
              }
            >
              -
            </button>

            <span className={styles.count}>
              {copies}
            </span>

            <button
              className={
                styles.counterButton
              }
              onClick={() =>
                setCopies(copies + 1)
              }
            >
              +
            </button>
          </div>
        </div>

        <button
          className={styles.primaryButton}
          onClick={handleContinue}
        >
          Continue
        </button>

      </div>
    </div>
  );
}

export default Orders;