import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import hero from "../assets/images/hero.png";
import hero2 from "../assets/images/hero2.jpg";

export function HeroSection() {
  return (
    <section className="w-full px-6 md:px-10 py-20 text-center">
      <p className="text-xs uppercase tracking-widest text-gray-500">
        New arrivals
      </p>

      <h1 className="mt-3 text-4xl md:text-6xl font-semibold text-gray-900">
        iPhone 17 series X Samsung S26
      </h1>

      <p className="mt-4 text-lg md:text-xl text-gray-600 mb-8">
        Quality and Satisfaction.
      </p>

      <div className="flex flex-row gap-4 items-center justify-center">
        <Button
          variant="outline"
          className="rounded-full shadow-none border-gray-300"
        >
          Buy Now
        </Button>

        <Button variant="ghost" className="rounded-full">
          Learn more <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Hero Image Box */}
      {/* <div className="relative mx-auto mt-12 w-full max-w-4xl overflow-hidden rounded-3xl ring-1 ring-black/5 bg-linear-to-b from-gray-100 to-gray-200"> */}

      <div className="relative mx-auto mt-12 w-full max-w-4xl md:h-150 overflow-hidden rounded-3xl ring-1 ring-black/5 bg-linear-to-b from-gray-100 to-gray-200">
        {/* subtle glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/60 blur-3xl" />

        <div className="relative flex items-center justify-center ">
          <Image
            src={hero2}
            alt="Gadgets"
            width={600}
            height={600}
            priority
            className="w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
