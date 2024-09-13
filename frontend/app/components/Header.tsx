// components/Header.tsx
import Link from "next/link";
import { PlaneTakeoff, User } from "lucide-react"; // Assuming you're using Lucide for icons
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-sky-500 text-white">
      <Link className="flex items-center justify-center" href="#">
        <PlaneTakeoff className="h-8 w-8 mr-2" />
        <span className="text-xl font-bold">SkyBooker</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Upcoming Journey
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          About
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Contact
        </Link>
        <Button variant="secondary" size="sm" className="bg-white text-sky-500 hover:bg-sky-100">
          <User className="h-4 w-4 mr-2" />
          Login
        </Button>
      </nav>
    </header>
  );
}
