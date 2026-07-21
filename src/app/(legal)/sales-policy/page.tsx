export default function SalesPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 md:px-16 py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Sales Policy</h1>

      <Section title="Product Purchases">
        All products listed on Aura Mobile are subject to availability and may
        change without prior notice.
      </Section>

      <Section title="Payments">
        Orders are only confirmed after successful payment verification.
      </Section>

      <Section title="Delivery">
        Delivery times vary based on location and logistics partners. Delays may
        occur during peak periods.
      </Section>

      <Section title="Refunds">
        Refunds are only applicable for defective or incorrect items reported
        within the return window.
      </Section>

      <Section title="Repairs">
        Repair costs are estimated after diagnosis. Final pricing may change if
        additional issues are discovered.
      </Section>

      <Section title="Trade-In / Swap">
        Trade-in values are provisional until physical inspection is completed
        at our store or service center.
      </Section>

      <Section title="Warranty">
        Warranty covers manufacturer defects only and does not include physical
        or liquid damage after service.
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}
