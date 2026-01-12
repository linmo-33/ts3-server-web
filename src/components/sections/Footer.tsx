import React from "react";
import { SERVER_CONFIG } from "@/constants/server";

interface FooterProps {
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDark }) => {
  return (
    <footer className={`pt-6 text-center border-t ${isDark ? 'border-cyber-border' : 'border-cream-border'}`}>
      <p className={`text-sm ${isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'}`}>
        &copy; {new Date().getFullYear()}{" "}
        <span className="gradient-text">{SERVER_CONFIG.name}</span>
      </p>
    </footer>
  );
};
