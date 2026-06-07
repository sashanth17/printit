import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { endpoints } from "../../config/endpoints.js";
import { useFetch } from "../../hooks/useFetch.js";

import styles from "./payment-window.module.css";

function PaymentWindow() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      setLoading(true);

      try {
        const response = await useFetch({
          endpoint: `${endpoints.USER.CREATE_ORDER}${id}`,
          method: "GET",
        });

        if (response?.data) {
          setOrder(response.data);
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (!id) {
    return <div className={styles.error}>Invalid Order ID</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Payment Window</h2>

        {loading && <p className={styles.info}>Loading order...</p>}

        {!loading && order && (
          <>
            <div className={styles.section}>
              <p><span>Order ID:</span> {order.OrderId}</p>
              <p><span>Status:</span> {order.Status}</p>
              <p><span>Pages:</span> {order.PageStart} - {order.PageEnd}</p>
              <p><span>Copies:</span> {order.Copies}</p>
              <p><span>Colour:</span> {order.IsColour ? "Yes" : "No"}</p>
            </div>

            <div className={styles.priceBox}>
              <h3>Total Fare</h3>
              <p className={styles.price}>₹ {order.Fare}</p>
            </div>

            <button className={styles.payButton}>
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentWindow;