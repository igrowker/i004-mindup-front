import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import queryClient from "./queryClient.ts";
import { StompSessionProvider } from "react-stomp-hooks";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StompSessionProvider
    url={"http://localhost:8088/ws"}
    onStompError={console.log}
    onConnect={() => {
      console.log("conetaooooo");
    }}
  >
    {/* <React.StrictMode> */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    {/* </React.StrictMode> */}
  </StompSessionProvider>
);
