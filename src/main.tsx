import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/query-client.ts";
import { Toaster } from "./components/ui/toaster.tsx";
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			<Toaster position="bottom-center" />
		</QueryClientProvider>
	</StrictMode>
);
