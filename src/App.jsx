import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "./routes/router";
import ClienteProvider from "./contexts/ClienteProvider";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <ClienteProvider>
      <ToastContainer autoClose={3000} />
      <RouterProvider router={router} />
    </ClienteProvider>
  );
}
