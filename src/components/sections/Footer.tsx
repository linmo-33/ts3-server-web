import React from "react";
import { SERVER_CONFIG } from "@/constants/server";

export const Footer: React.FC = () => {
  return (
    <footer className="pt-6 text-center border-t border-fresh-border">
      <p className="text-sm text-fresh-text-muted">
        &copy; {new Date().getFullYear()}{" "}
        <span className="gradient-text">{SERVER_CONFIG.name}</span>
      </p>
    </footer>
  );
};
