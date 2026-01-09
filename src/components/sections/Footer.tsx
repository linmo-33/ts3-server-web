import React from "react";
import { SERVER_CONFIG } from "@/constants/server";

export const Footer: React.FC = () => {
  return (
    <footer className="pt-6 text-center border-t border-white/5">
      <p className="text-zinc-600 text-sm">
        &copy; {new Date().getFullYear()} {SERVER_CONFIG.name}
      </p>
    </footer>
  );
};
