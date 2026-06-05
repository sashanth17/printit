import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Start Printing</h1>

        <p className={styles.subtitle}>
          Upload documents, configure print settings and collect instantly.
        </p>

        <button
          className={styles.button}
          onClick={() => navigate("/orders")}
        >
          Start Printing
        </button>
      </div>
    </div>
  );
}

export default Dashboard;