
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Gauge, Leaf, LineChart, Recycle } from "lucide-react";
import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { DemoBadge } from "@/components/app/ui-bits";
import heroImg from "@/assets/campus-hero.jpg";
import { useAppState } from "@/lib/store";
import {
  allEntries,
  recyclingRate,
  series,
  sustainabilityScore,
  windows,
} from "@/lib/metrics";
import { detectAlerts } from "@/lib/recommendations";
import { fmt } from "@/lib/constants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "EcoCampus AI — Make Every Campus Resource Count" },
      {
        name: "description",
        content:
          "Smart campus sustainability platform: track electricity, water, waste and paper, find wastage and act on practical recommendations.",
      },
      {
        property: "og:title",
        content: "EcoCampus AI — Make Every Campus Resource Count",
      },
      {
        property: "og:description",
        content:
          "Track campus resources, spot wastage and get practical sustainability recommendations. KAUSHAL 8.0 · PS-04.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: LineChart,
    title: "Resource Tracking",
    text: "Log electricity, water, waste and paper by department and building.",
  },
  {
    icon: Recycle,
    title: "Waste Analytics",
    text: "Categorise waste, follow recycling rates and disposal methods.",
  },
  {
    icon: Bot,
    title: "Smart Recommendations",
    text: "A transparent rule-based engine flags spikes and suggests fixes.",
  },
  {
    icon: Gauge,
    title: "Sustainability Score",
    text: "A documented 0–100 score from resources, recycling and actions.",
  },
];

function Landing() {
  const s = useAppState();

  const stats = useMemo(() => {
    const e = allEntries(s);

    return {
      score: sustainabilityScore(s, 30).score,
      recycling: recyclingRate(s.waste, windows(30).current),
      alerts: detectAlerts(s, 7).length,
      trend: series(e, "electricity", 12, 7),
    };
  }, [s]);

  return (
    <div className="m-0 min-h-screen w-full bg-background p-0">
      {/* Header */}
      <header className="flex w-full items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>

          <span className="font-display text-lg font-semibold">
            Green-Grid_SVVV
          </span>
        </div>

        <Button asChild variant="ghost" size="sm">
          <Link to="/sensors">Open sensor monitor</Link>
        </Button>
      </header>

      {/* Hero Section */}
      <section className="bg-hero w-full">
        <div className="grid w-full items-center gap-10 px-5 pb-16 pt-8 md:grid-cols-2">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              Smart Campus Sustainability Platform
            </p>

            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Make Every Campus Resource Count.
            </h1>

            <p className="mt-4 max-w-lg text-muted-foreground">
              Colleges lose energy to empty lit classrooms, water to unnoticed
              leaks and paper to habit printing — mostly because no one sees
              the numbers. EcoCampus AI makes usage visible, flags wastage and
              turns it into clear actions.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/sensors">
                  Explore Sensor Monitor
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link to="/tracking">Start Tracking</Link>
              </Button>
            </div>
          </div>

          <img
            src={heroImg}
            alt="Illustration of a green college campus with solar panels and recycling bins"
            width={1408}
            height={896}
            className="w-full rounded-3xl shadow-card"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-5 py-14">
        <h2 className="text-2xl font-semibold">What it does</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border bg-card p-5 shadow-card"
            >
              <f.icon className="h-6 w-6 text-primary" />

              <h3 className="mt-3 font-semibold">{f.title}</h3>

              <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="w-full px-5 pb-16">
        <div className="rounded-3xl bg-forest-gradient p-6 text-forest-foreground md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Dashboard preview</h2>
            <DemoBadge />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              {
                k: "Sustainability score (30 d)",
                v:
                  stats.score === null
                    ? "—"
                    : Math.round(stats.score).toString(),
              },
              {
                k: "Recycling rate (30 d)",
                v:
                  stats.recycling === null
                    ? "—"
                    : `${stats.recycling.toFixed(0)}%`,
              },
              {
                k: "Wastage alerts this week",
                v: fmt(stats.alerts),
              },
            ].map((x) => (
              <div
                key={x.k}
                className="rounded-2xl bg-forest-foreground/10 p-4"
              >
                <p className="text-xs opacity-80">{x.k}</p>
                <p className="mt-1 font-display text-3xl font-semibold">
                  {x.v}
                </p>
              </div>
            ))}

            <div className="rounded-2xl bg-forest-foreground/10 p-4">
              <p className="text-xs opacity-80">
                Electricity, last 12 weeks
              </p>

              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.trend}>
                    <XAxis dataKey="label" hide />

                    <Tooltip
                      formatter={(v: number) => `${fmt(v)} kWh`}
                    />

                    <Area
                      dataKey="value"
                      stroke="var(--sidebar-primary)"
                      fill="var(--sidebar-primary)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs opacity-75">
            Figures come from fictional demo data for “Greenfield Institute of
            Technology”, not real sensors.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t">
        <div className="flex w-full flex-col gap-2 px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <span>Sustainable Tech Without Limits</span>
        </div>
      </footer>
    </div>
  );
}
