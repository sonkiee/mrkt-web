export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 md:px-16 py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-muted-foreground mb-6">
        We value your privacy and are committed to protecting your personal
        information.
      </p>

      <Section title="Information We Collect">
        We collect your name, phone number, email, device details, and order
        history when you use our shop, repair, or trade-in services.
      </Section>

      <Section title="How We Use Your Data">
        Your data is used to process orders, manage repairs, evaluate trade-in
        devices, and improve customer experience.
      </Section>

      <Section title="Payments">
        All payments are processed securely through trusted third-party payment
        providers. We do not store card details.
      </Section>

      <Section title="Device Repairs & Trade-In">
        Device information submitted for repairs or trade-in is used strictly
        for diagnostics and valuation purposes.
      </Section>

      <Section title="Data Protection">
        We use secure systems to protect your data against unauthorized access,
        alteration, or disclosure.
      </Section>

      <Section title="Contact">
        For privacy concerns, contact our support team via the app or store.
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
