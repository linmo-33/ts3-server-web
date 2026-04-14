import React from "react";
import { Heart } from "lucide-react";
import type { ServerConfig } from "@/types";

interface FooterProps {
  serverConfig: ServerConfig;
  appVersion: string;
}

export const Footer: React.FC<FooterProps> = ({ serverConfig, appVersion }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-8 mt-4 pb-4">
      <div className="flex flex-col items-center justify-center gap-2 text-sm text-fresh-text-muted text-center">
        <p>
          &copy; {currentYear}{" "}
          <span className="gradient-text font-bold">{serverConfig.name}</span>
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
        <p className="text-xs uppercase tracking-[0.24em] text-fresh-text-muted/80">
          Version {appVersion}
        </p>
      </div>
    </footer>
  );
};
