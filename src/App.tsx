import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import router from "./layouts/router";

function App() {
  const queryClient = new QueryClient();
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={1200}
          newestOnTop
          closeOnClick
        />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
