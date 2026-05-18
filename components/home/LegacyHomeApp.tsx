"use client";

import { useEffect } from "react";
import { LanguageProvider } from "@/src/contexts/LanguageContext";
import App from "@/src/App";
import { registerServiceWorker } from "@/src/lib/register-service-worker";
import "@/src/index.css";
import "@/src/App.css";

/** Full legacy landing (hero, sections, refactored booking form) for Next.js `/`. */
export function LegacyHomeApp() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}
