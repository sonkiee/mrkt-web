import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import laptopImg from "../assets/images/m3.jpg"; // replace with your real images
import watchImg from "../assets/images/m3.jpg";
import audioImg from "../assets/images/m3.jpg";

const categories = [
  {
    title: "Laptops",
    subtitle: "Top picks for work & school",
    href: "/category/laptops",
    image: laptopImg,
    featured: true,
  },
  {
    title: "Watches",
    subtitle: "Smart. Stylish. Modern.",
    href: "/category/watches",
    image: watchImg,
  },
  {
    title: "Audio",
    subtitle: "Sound you’ll love",
    href: "/category/audio",
    image: audioImg,
  },
];

function CategoryCard({
  title,
  subtitle,
  href,
  image,
  className = "",
}: {
  title: string;
  subtitle?: string;
  href: string;
  image: StaticImageData;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={[
        "group relative overflow-hidden rounded-2xl bg-white shadow-sm",
        "ring-1 ring-black/5",
        "min-h-[220px]",
        className,
      ].join(" ")}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        priority={false}
      />

      {/* soft gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-white/85 text-xs tracking-wide uppercase">
          Category
        </p>
        <h3 className="text-white text-xl font-semibold leading-tight">
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-1 text-white/75 text-sm">{subtitle}</p>
        ) : null}

        <span className="mt-4 inline-flex items-center gap-2 text-white text-sm font-medium">
          Shop now
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export default function CategoryShowcase() {
  const featured = categories.find((c) => c.featured)!;
  const rest = categories.filter((c) => !c.featured);

  return (
    <section className="py-10 bg-gray-50 px-6 md:px-10">
      <div className="flex items-end justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold">Shop by Category</h2>
        <Link
          href="/categories"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          View all
        </Link>
      </div>

      {/* 4-column grid, but we shape it with spans */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* big left card */}
        <CategoryCard
          title={featured.title}
          subtitle={featured.subtitle}
          href={featured.href}
          image={featured.image}
          className="md:col-span-2 md:row-span-2 min-h-[320px]"
        />

        {/* right stacked cards */}
        {rest.map((c) => (
          <CategoryCard
            key={c.title}
            title={c.title}
            subtitle={c.subtitle}
            href={c.href}
            image={c.image}
            className="md:col-span-2"
          />
        ))}
      </div>
    </section>
  );
}
