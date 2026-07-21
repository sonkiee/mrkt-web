"use client";

import { useState } from "react";

export default function RepairPage() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="w-full space-y-20">
      {/* HERO */}
      <section className="bg-background py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Fast & Reliable Phone Repairs
            </h1>

            <p className="text-muted-foreground text-lg">
              Expert technicians, genuine OEM parts, and fast turnaround. We
              restore your device to factory perfection.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium">
                Book Repair
              </button>

              <button className="border border-border px-6 py-3 rounded-lg">
                View Pricing
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rotate-3 rounded-3xl" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuClTlKZtl3q3h91F9255kigqiI3-p94weoTmtMkYw4UmEhIOjG_B-lfvw4wWTgXV72-YDtr3ZDQKg-_3zgp6tPn2J8xBkwNY2nXZ41-R2R0qcz-xMEyZOlAeIZnw-OxNcfJhx0zadejJhOlvllNtnlZFy1BPL15ELW1W_LYiJjYgJgqXJTtcRwSDURMUwsiyCQtZOTx8P4hDYPkEEWJmDM6Hx4hp-p9aRBQqcAGS5r0BorO2qvgP9jy09zZGWDeXuUJv9zUtfV-jg"
              className="rounded-3xl shadow-xl relative z-10"
              alt="repair"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          <div>
            <h2 className="text-3xl font-semibold">Precision Services</h2>
            <p className="text-muted-foreground">
              Tailored solutions for every device issue.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Screen Repair",
                desc: "OEM-grade display replacement",
                price: "₦15,000+",
              },
              {
                title: "Battery Replacement",
                desc: "Restore full-day performance",
                price: "₦8,500+",
              },
              {
                title: "Water Damage",
                desc: "Deep cleaning & board repair",
                price: "Custom",
              },
              {
                title: "Camera Fix",
                desc: "Lens & sensor replacement",
                price: "₦12,000+",
              },
              {
                title: "Software Fix",
                desc: "OS repair & optimization",
                price: "₦5,000+",
              },
              {
                title: "Diagnostics",
                desc: "Full device health check",
                price: "Free / Paid",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-border bg-background hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  {item.desc}
                </p>
                <p className="mt-4 text-primary font-semibold">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
          <div>
            <h2 className="text-3xl font-semibold">How It Works</h2>
            <p className="text-muted-foreground">
              Simple 4-step repair process
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {["Submit", "Diagnosis", "Approval", "Repair"].map((step, i) => (
              <div key={step} className="space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  {i + 1}
                </div>
                <h3 className="font-medium">{step}</h3>
                <p className="text-sm text-muted-foreground">
                  {step === "Submit"
                    ? "Send repair request"
                    : step === "Diagnosis"
                      ? "We inspect device"
                      : step === "Approval"
                        ? "You approve quote"
                        : "We fix and return"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="text-4xl font-bold">Ready to restore your device?</h2>
          <p className="opacity-90">
            Book a repair today and get your phone back like new.
          </p>
          <button className="bg-white text-black px-6 py-3 rounded-lg font-medium">
            Book Repair Now
          </button>
        </div>
      </section>
    </main>
  );
}
