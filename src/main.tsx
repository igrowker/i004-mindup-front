import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import queryClient from "./queryClient.ts";
import { StompSessionProvider } from "react-stomp-hooks";
const apiUrl = import.meta.env.VITE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StompSessionProvider
    url={apiUrl}
    onStompError={console.log}
    onConnect={() => {
      console.log("conetaooooo");
    }}
  >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StompSessionProvider>
);
