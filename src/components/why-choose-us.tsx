import Image from "next/image";
import hero from "../assets/images/hero.png";
import { ShieldCheck, Truck, Headphones } from "lucide-react";

export function WhyChooseUsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        {/* Left */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500">
            Why choose us
          </p>

          <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-gray-900">
            Why shop with us?
          </h2>

          <p className="mt-3 text-sm text-gray-600">
            Trusted gadgets, fast delivery, and support that actually helps.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5">
            <WhyChooseUsItem
              icon={<ShieldCheck className="h-5 w-5 text-blue-600" />}
              title="Genuine Products"
              description="100% authenticity — sourced directly from trusted suppliers."
            />
            <WhyChooseUsItem
              icon={<Truck className="h-5 w-5 text-blue-600" />}
              title="Fast Delivery"
              description="Order before 2PM for same-day dispatch (where available)."
            />
            <WhyChooseUsItem
              icon={<Headphones className="h-5 w-5 text-blue-600" />}
              title="Premium Support"
              description="Quick help for setup, troubleshooting, and repairs."
            />
          </div>
        </div>

        {/* Right promo */}
        <div className="relative overflow-hidden rounded-3xl ring-1 ring-black/5 bg-gradient-to-b from-blue-600 to-blue-500 p-8 text-white">
          <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/15 blur-2xl" />

          <h3 className="text-xl font-semibold">Trade-in & Upgrade</h3>
          <p className="mt-2 text-sm text-white/85 max-w-sm">
            Swap your old device and pay small to upgrade. We handle pickup,
            checks, and delivery.
          </p>

          <div className="mt-8 relative h-56 w-full">
            <Image
              src={hero}
              alt="Trade-in promo"
              fill
              className="object-contain"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {["Same-day dispatch", "Verified devices", "Warranty options"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/15 px-3 py-1 ring-1 ring-white/15"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl bg-white p-5 ring-1 ring-black/5">
      <div className="h-11 w-11 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div className="min-w-0">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="mt-1 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
