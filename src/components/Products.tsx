"use client";

import { motion } from "framer-motion";
import { ExternalLink, ShoppingBag, Download } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface Product {
  name: string;
  description: string;
  platform: string;
  icon: React.ReactNode;
  link: string;
  badge: string;
  gradient: string;
}

const products: Product[] = [
  {
    name: "LinguaReader",
    description:
      "Learn languages naturally by reading. Import PDFs, tap words to translate, and build vocabulary effortlessly.",
    platform: "Google Play Store",
    icon: <Download size={20} />,
    link: "https://play.google.com/store/apps/details?id=com.yusufdinc.linguareader",
    badge: "Android App",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    name: "NichiTomo",
    description:
      "Your adorable pixel-art desktop companion. A hand-crafted digital pet that lives on your screen.",
    platform: "Gumroad",
    icon: <ShoppingBag size={20} />,
    link: "https://yusufbusiness.gumroad.com/l/nichitomo",
    badge: "Digital Product",
    gradient: "from-pink-500 to-rose-600",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-28 sm:py-36 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <AnimatedSection className="mb-16 sm:mb-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-sm font-mono text-accent tracking-wider uppercase">
              Products & Apps
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Available{" "}
            <span className="bg-gradient-to-r from-accent to-[#d3a17a] bg-clip-text text-transparent">
              now
            </span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-lg mx-auto">
            Live products you can download and use today.
          </p>
        </AnimatedSection>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <AnimatedSection key={product.name} delay={index * 0.15}>
              <motion.a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group block relative rounded-2xl border border-border bg-surface/50 p-8 overflow-hidden hover:border-accent/30 transition-all duration-500"
              >
                {/* Top gradient bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Badge */}
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-gradient-to-r ${product.gradient} text-white mb-5`}
                >
                  {product.icon}
                  {product.badge}
                </span>

                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {product.name}
                </h3>

                <p className="text-muted leading-relaxed mb-6">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-accent">
                  <span>Get it on {product.platform}</span>
                  <ExternalLink
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  />
                </div>

                {/* Bottom glow */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
