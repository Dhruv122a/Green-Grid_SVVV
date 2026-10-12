import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity, BarChart3, Bot, ClipboardList, FileBarChart, Leaf, Menu, PlayCircle, Recycle, Settings, Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DemoBadge } from "@/components/app/ui-bits";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app")({
  ssr: false,
  component: AppLayout,
});

const NAV = [
  { to: "/sensors", label: "Sensor Monitor", icon: Activity },
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/tracking", label: "Resource Tracking", icon: ClipboardList },
  { to: "/waste", label: "Waste Management", icon: Recycle },
  { to: "/assistant", label: "Sustainability Assistant", icon: Bot },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((n) => {
        const active = path === n.to;
        return (
          <Link key={n.to} to={n.to} onClick={onNavigate}
            className={cn("flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all hover:translate-x-0.5",
              active ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground")}>
            <n.icon className={cn("h-4 w-4", active && "text-sidebar-primary")} />
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

import logo from "@/assets/Eco-Tech Lotus Book Emblem.png";

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src={logo}
        alt="Green Grid SVVV Logo"
        className="h-11 w-11 shrink-0 rounded-full object-contain"
      />

      <span className="font-display text-lg font-semibold text-sidebar-accent-foreground">
        Green-Grid_SVVV
      </span>
    </Link>
  );
}


const STEPS: { text: string; to: (typeof NAV)[number]["to"] }[] = [
  { text: "Open Sensor Monitor and simulate a heat spike or water leak", to: "/sensors" },
  { text: "View campus metrics and the sustainability score", to: "/dashboard" },
  { text: "Add a new electricity or water reading", to: "/tracking" },
  { text: "Return to the dashboard and see totals update", to: "/dashboard" },
  { text: "Spot the wastage warning (Mechanical electricity spike)", to: "/dashboard" },
  { text: "Generate recommendations and an action plan", to: "/assistant" },
  { text: "Compare departments fairly (per-person)", to: "/leaderboard" },
  { text: "Export a CSV or print the report", to: "/reports" },
];

function DemoGuide() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2"><PlayCircle className="h-4 w-4" /> 3-min demo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick demo</DialogTitle>
          <DialogDescription>Follow these steps — about three minutes. All data is fictional demo data.</DialogDescription>
        </DialogHeader>
        <ol className="space-y-2">
          {STEPS.map((s, i) => (
            <li key={i}>
              <Link to={s.to} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl border p-3 text-sm hover:bg-accent">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{i + 1}</span>
                {s.text}
              </Link>
            </li>
          ))}
        </ol>
      </DialogContent>
    </Dialog>
  );
}

function AppLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="no-print sticky top-0 hidden h-screen w-60 shrink-0 flex-col gap-7 bg-sidebar p-4 lg:flex">
        <div className="px-2 pt-2"><Brand /></div>
        <NavList />
        <div className="mt-auto border-t border-sidebar-border pt-4 text-xs text-sidebar-foreground">
          <p className="mt-2 leading-relaxed opacity-80">Software-only demo. Simulated sensors; fictional campus data.</p>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="no-print sticky top-0 z-20 flex items-center gap-3 border-b bg-background/85 px-4 py-3 backdrop-blur lg:px-8">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="lg:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 border-sidebar-border bg-sidebar p-4">
              <SheetHeader className="mb-4 p-0"><SheetTitle className="sr-only">Navigation</SheetTitle><Brand /></SheetHeader>
              <NavList onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="font-display font-semibold lg:hidden">Green-Grid_SVVV</span>
          <div className="ml-auto flex items-center gap-2">
            <DemoBadge className="hidden sm:inline-flex" />
            <DemoGuide />
          </div>
        </header>
        <main className="page-content print-full mx-auto w-full max-w-7xl flex-1 px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
