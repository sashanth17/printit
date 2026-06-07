import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HubPage } from "./HubPage";
import { CustomerLayout } from "./components/CustomerLayout";
import { AdminLayout } from "./components/AdminLayout";

// Customer screens
import { WelcomeScreen } from "./components/customer/WelcomeScreen";
import { UploadScreen } from "./components/customer/UploadScreen";
import { PrintConfigScreen } from "./components/customer/PrintConfigScreen";
import { BillEstimationScreen } from "./components/customer/BillEstimationScreen";
import { PaymentScreen } from "./components/customer/PaymentScreen";
import { PaymentSuccessScreen } from "./components/customer/PaymentSuccessScreen";
import { OrderTrackingScreen } from "./components/customer/OrderTrackingScreen";
import { CollectionScreen } from "./components/customer/CollectionScreen";

// Admin screens
import { TenantLoginScreen } from "./components/admin/TenantLoginScreen";
import { TenantDashboard } from "./components/admin/TenantDashboard";
import { OrderQueueScreen } from "./components/admin/OrderQueueScreen";
import { OrderDetailsScreen } from "./components/admin/OrderDetailsScreen";
import { PrintingStatusScreen } from "./components/admin/PrintingStatusScreen";
import { CollectionVerificationScreen } from "./components/admin/CollectionVerificationScreen";
import { NotificationsScreen } from "./components/admin/NotificationsScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HubPage },

      // Customer flow — wrapped in mobile phone frame
      {
        path: "customer",
        Component: CustomerLayout,
        children: [
          { index: true, Component: WelcomeScreen },
          { path: "upload", Component: UploadScreen },
          { path: "config", Component: PrintConfigScreen },
          { path: "bill", Component: BillEstimationScreen },
          { path: "payment", Component: PaymentScreen },
          { path: "success", Component: PaymentSuccessScreen },
          { path: "tracking", Component: OrderTrackingScreen },
          { path: "collection", Component: CollectionScreen },
        ],
      },

      // Admin login (standalone, no sidebar)
      { path: "admin/login", Component: TenantLoginScreen },

      // Admin dashboard flow — with sidebar
      {
        path: "admin",
        Component: AdminLayout,
        children: [
          { path: "dashboard", Component: TenantDashboard },
          { path: "orders", Component: OrderQueueScreen },
          { path: "orders/:id", Component: OrderDetailsScreen },
          { path: "printing", Component: PrintingStatusScreen },
          { path: "verify", Component: CollectionVerificationScreen },
          { path: "notifications", Component: NotificationsScreen },
        ],
      },
    ],
  },
]);
