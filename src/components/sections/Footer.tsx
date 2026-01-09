import React from "react";
import { SERVER_CONFIG } from "@/constants/server";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-10 pt-6 text-center border-t border-slate-200/60 dark:border-slate-800/60">
      <p className="text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} {SERVER_CONFIG.name}. All rights
        reserved.
      </p>
    </footer>
  );
};
