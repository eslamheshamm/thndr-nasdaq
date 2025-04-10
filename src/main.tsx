import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

import App from "./App.tsx";
import queryClient from "./lib/providers/query-client.js";
import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			<Toaster position="bottom-center" />
		</QueryClientProvider>
	</StrictMode>
);
