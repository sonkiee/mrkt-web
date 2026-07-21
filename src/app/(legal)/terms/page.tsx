export default function TermsOfUse() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 md:px-16 py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Terms of Use</h1>

      <Section title="Acceptance of Terms">
        By using Aura Mobile services, you agree to comply with these terms.
      </Section>

      <Section title="Services">
        We provide mobile phone sales, repair services, and trade-in/swap
        options both online and in physical stores.
      </Section>

      <Section title="Accounts">
        You are responsible for maintaining accurate account information and
        securing your login credentials.
      </Section>

      <Section title="Repairs & Trade-In">
        Repair timelines are estimates. Trade-in valuations are subject to
        physical inspection before final confirmation.
      </Section>

      <Section title="Liability">
        We are not responsible for data loss during repairs or delays caused by
        third-party logistics providers.
      </Section>

      <Section title="Termination">
        We reserve the right to suspend or terminate services if misuse or
        fraudulent activity is detected.
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
