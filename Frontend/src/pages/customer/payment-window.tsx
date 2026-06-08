import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { endpoints } from "../../config/endpoints.js";
import { useFetch } from "../../hooks/useFetch.js";

import { useNavigate } from "react-router-dom";

import styles from "./payment-window.module.css";

function PaymentWindow() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
  const HandlePayment = async () => {
  try {
    const paymentResponse = await useFetch({
      endpoint: endpoints.PAYMENT.CREATE_PAYMENT,
      method: "POST",
      body: {
        OrderId: order.OrderId,
      },
    });
    console.log("Payment Response:", paymentResponse);

    const { razorpayOrderId, key } = paymentResponse.data;

    const options = {
      key,

      amount: Math.round(order.Fare * 100),

      currency: "INR",

      name: "PrintItNow",

      description: `Order ${order.OrderId}`,

      order_id: razorpayOrderId,

      handler: async function (response) {
        try {
          const verifyResponse = await useFetch({
            endpoint: endpoints.PAYMENT.VERIFY_PAYMENT,
            method: "POST",
            body: response,
          });

          alert(verifyResponse.data.message);
          if(verifyResponse.success){
            navigate("/customer/orders");
          } 

          console.log("Verified:", verifyResponse);
        } catch (error) {
          console.error(error);
          alert("Payment verification failed");
        }
      },

      prefill: {
        name: "Customer",
        email: "customer@example.com",
        contact: "9999999999",
      },

      theme: {
        color: "#3399cc",
      },
    };
    console.log("Payment Response:", paymentResponse);


console.log("razorpayOrderId:", razorpayOrderId);
console.log("key:", key);
    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error(response.error);

      alert(
        `Payment Failed\n${response.error.description}`
      );
    });

    rzp.open();
  } catch (error) {
    console.error(error);

    alert("Unable to create payment order");
  }
};

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

            <button className={styles.payButton} onClick={HandlePayment}>
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentWindow;