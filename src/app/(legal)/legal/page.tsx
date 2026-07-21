export default function LegalPage() {
  const links = [
    {
      title: "Privacy Policy",
      desc: "How we collect, use, and protect your data.",
      href: "/legal/privacy-policy",
    },
    {
      title: "Terms of Use",
      desc: "Rules for using Aura Mobile services and platform.",
      href: "/legal/terms",
    },
    {
      title: "Sales Policy",
      desc: "Payments, refunds, repairs, and trade-in rules.",
      href: "/legal/sales-policy",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground px-6 md:px-16 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold">Legal Center</h1>
        <p className="text-muted-foreground mt-3">
          Important policies that govern how Aura Mobile operates.
        </p>
      </div>

      <div className="grid gap-6 max-w-3xl mx-auto">
        {links.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="border border-border rounded-xl p-6 bg-card hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
