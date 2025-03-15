
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              SummarizeEase
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/app" className="text-sm font-medium transition-colors hover:text-primary">
            App
          </Link>
          <Link to="#" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </Link>
          <Link to="#" className="text-sm font-medium transition-colors hover:text-primary">
            Pricing
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/login">
            <Button size="sm">Sign up</Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
