import React from "react";
import { SERVER_CONFIG } from "@/constants/server";
import { Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-8 mt-4 pb-4">
      <div className="flex flex-col items-center justify-center gap-2 text-sm text-fresh-text-muted text-center">
        <p>
          &copy; {currentYear}{" "}
          <span className="gradient-text font-bold">{SERVER_CONFIG.name}</span>
        </p>
        <p className="flex items-center gap-1">
          Made with <Heart size={14} className="text-red-500 animate-pulse" />{" "}
          by{" "}
          <a
            href="https://github.com/linmo-33/ts3-server-web"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-fresh-primary transition-colors"
          >
            Linmo33
          </a>
        </p>
      </div>
    </footer>
  );
};
