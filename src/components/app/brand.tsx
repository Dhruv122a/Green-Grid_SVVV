import { Link } from "@tanstack/react-router";
import logo from "@/assets/svvv-eco-logo.png";
import { cn } from "@/lib/utils";

export function Brand({ className, light }: { className?: string; light?: boolean }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)}>
      <img src={logo} alt="Green-Grid_SVVV emblem inspired by Shri Vaishnav Vidyapeeth Vishwavidyalaya" width={40} height={40} className="h-10 w-10 rounded-full bg-card p-0.5 shadow-card transition-transform duration-500 group-hover:rotate-12" />
      <span className="leading-tight">
        <span className={cn("block font-display text-lg font-semibold", light ? "text-sidebar-accent-foreground" : "text-foreground")}>Green-Grid_SVVV AI</span>
        <span className={cn("block text-[10px] tracking-wide", light ? "text-sidebar-foreground/70" : "text-muted-foreground")}>SVVV · Indore</span>
      </span>
    </Link>
  );
}
