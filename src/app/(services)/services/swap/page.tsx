"use client";

export default function SwapPage() {
  return (
    <main className="space-y-20">
      {/* HERO */}
      <section className="bg-background py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase text-primary font-semibold">
              Upgrade Today
            </span>

            <h1 className="text-4xl md:text-5xl font-bold">
              Trade in your old phone for a new one
            </h1>

            <p className="text-muted-foreground text-lg">
              Get instant credit towards your next device with seamless swap.
            </p>

            <div className="flex gap-4">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg">
                Check Value
              </button>
              <button className="border border-border px-6 py-3 rounded-lg">
                How it works
              </button>
            </div>
          </div>

          <div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSnMKam4CD_5Uw-ehS2Y5lVhJ4Fk8ys3Y93u0BvFfiKPy1miL038OM-LWjjcYjGWPqx7XOnIo5qBgT2n59Wt_apHXX4YWiM4MtN-pI86_3YMc_Nq8EVL4ulseqOQ7ago0gN1V956czeHtMK0RdgsQriP5gEwRegHWZmv_q5HPT0WhOsTgc3aI5j8u0SgMURS3uhdY2Z03bniIVbizEjEMZCJgEuB8Qsmc5aYdcj2VHlPgN4E6mtd0-XzLURfdoStQuEfD4Ui6Dog"
              className="rounded-2xl shadow-xl"
              alt="swap"
            />
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-3xl font-semibold">Three simple steps to swap</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Condition",
                desc: "Tell us your phone condition",
              },
              {
                title: "Valuation",
                desc: "Get instant price quote",
              },
              {
                title: "Upgrade",
                desc: "Swap and upgrade instantly",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 border rounded-xl bg-background"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONDITION */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Condition Grading</h2>

            {["Like New", "Good", "Fair", "Faulty"].map((c) => (
              <div key={c} className="p-4 border rounded-lg">
                <p className="font-medium">{c}</p>
                <p className="text-sm text-muted-foreground">
                  {c === "Like New"
                    ? "Perfect condition"
                    : c === "Good"
                      ? "Minor wear"
                      : c === "Fair"
                        ? "Visible scratches"
                        : "Needs repair"}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-primary/10 p-8 rounded-xl">
            <h3 className="font-semibold mb-4">What affects price?</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Battery health</li>
              <li>Screen condition</li>
              <li>Storage size</li>
              <li>Network lock status</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
