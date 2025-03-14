
import React from "react";

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SummarizeEase. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Built with React and powered by AI
        </p>
      </div>
    </footer>
  );
}
