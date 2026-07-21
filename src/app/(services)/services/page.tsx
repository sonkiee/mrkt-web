"use client";

import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();

  const services = [
    {
      title: "Repairs",
      description:
        "Fast, reliable phone repairs using premium parts. Screen, battery, water damage & more.",
      icon: "build",
      route: "/services/repairs",
      color: "bg-primary text-primary-foreground",
    },
    {
      title: "Trade-In / Swap",
      description:
        "Upgrade your device instantly. Get the best value for your old phone.",
      icon: "swap_horiz",
      route: "/services/trade-in",
      color: "bg-secondary text-secondary-foreground",
    },
    {
      title: "Visit Store",
      description:
        "Find a nearby store location and get in-person assistance from our experts.",
      icon: "store",
      route: "/stores",
      color: "bg-muted text-foreground",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground px-6 md:px-16 py-16">
      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          What would you like to do?
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Choose a service to continue. We’ll guide you through the fastest way
          to fix, upgrade, or visit us.
        </p>
      </section>

      {/* Service Cards */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            onClick={() => router.push(service.route)}
            className="cursor-pointer rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${service.color}`}
            >
              <span className="material-symbols-outlined text-xl">
                {service.icon}
              </span>
            </div>

            {/* Content */}
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {service.description}
            </p>

            {/* CTA */}
            <p className="mt-6 text-sm font-medium text-primary">Continue →</p>
          </div>
        ))}
      </section>

      {/* Bottom hint */}
      <section className="text-center mt-16 text-sm text-muted-foreground">
        Need help? We respond in under 5 minutes during working hours.
      </section>
    </main>
  );
}
