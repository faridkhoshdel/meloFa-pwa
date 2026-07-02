"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight,
  Menu,
  Sparkles,
  Scan,
  Zap,
  ShieldCheck,
  Network,
  BarChart3,
  Layers,
  Globe,
  Github,
  Linkedin,
  Mail,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface ContentCard {
  title: string;
  description: string;
}

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
}

// ----------------------------------------------------------------------------
// Content
// ----------------------------------------------------------------------------

const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "Blazing-Fast Inference",
    description:
      "Sub-second response times powered by optimized model serving and edge-distributed infrastructure.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    description:
      "SOC 2 aligned controls with end-to-end encryption and granular role-based access for every workspace.",
  },
  {
    icon: Network,
    title: "Seamless API Integration",
    description:
      "Connect blueframeAI to your existing stack in minutes with typed RESTful and GraphQL endpoints.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Monitor usage, latency, and model behavior with live dashboards and configurable alerts.",
  },
  {
    icon: Layers,
    title: "Infinite Scalability",
    description:
      "Auto-scaling architecture engineered to handle millions of requests without breaking a sweat.",
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description:
      "Deployed across 30+ regions worldwide for low-latency access from anywhere on the planet.",
  },
];

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Solutions", href: "#solutions" },
    { label: "Pricing", href: "#pricing" },
    { label: "Documentation", href: "#docs" },
  ],
  Company: [
    { label: "About", href: "#solutions" },
    { label: "Blog", href: "#docs" },
    { label: "Careers", href: "mailto:hello@blueframeai.com?subject=Careers" },
    { label: "Contact", href: "#get-started" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "mailto:hello@blueframeai.com?subject=Privacy%20Policy" },
    { label: "Terms of Service", href: "mailto:hello@blueframeai.com?subject=Terms%20of%20Service" },
    { label: "Security", href: "#docs" },
  ],
};

const SOLUTIONS: ContentCard[] = [
  {
    title: "Product Engineering",
    description:
      "Prototype, deploy, and observe AI-powered product features with secure environments for every team.",
  },
  {
    title: "Operations Automation",
    description:
      "Connect model workflows to approvals, logs, and internal systems without adding fragile custom glue.",
  },
  {
    title: "Platform Teams",
    description:
      "Standardize model access, governance, and runtime performance across every business unit.",
  },
];

const DOCS: ContentCard[] = [
  {
    title: "API Reference",
    description:
      "Typed endpoints, examples, and SDK notes for bringing blueframeAI into existing applications.",
  },
  {
    title: "Security Guide",
    description:
      "Controls, deployment patterns, and audit guidance for enterprise AI infrastructure reviews.",
  },
  {
    title: "Launch Playbooks",
    description:
      "Checklists for taking AI-native products from sandbox experiments to production workloads.",
  },
];

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Launch",
    price: "Custom",
    description: "For teams shipping their first production AI workflows.",
    features: ["Managed inference", "Usage dashboards", "Email support"],
    cta: "Discuss Launch",
  },
  {
    name: "Scale",
    price: "Custom",
    description: "For organizations standardizing AI across multiple products.",
    features: ["Dedicated environments", "Role-based access", "Priority support"],
    cta: "Discuss Scale",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For regulated teams with advanced governance and deployment needs.",
    features: ["Private networking", "Audit exports", "Solution architecture"],
    cta: "Discuss Enterprise",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "blueframeAI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "blueframeAI gives enterprises the intelligent infrastructure to design, deploy, and scale AI-native products.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

// ----------------------------------------------------------------------------
// Shared primitives
// ----------------------------------------------------------------------------

/** Viewfinder-style corner brackets — the page's recurring "frame" signature. */
function CornerBrackets({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${className}`}
      aria-hidden="true"
    >
      <span className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-accent-cyan" />
      <span className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-accent-cyan" />
      <span className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-accent-cyan" />
      <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-accent-cyan" />
    </span>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="blueframeAI home" className={`group flex items-center gap-2 ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary shadow-glow transition-colors group-hover:text-accent-cyan">
        <Scan className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-white">
        blueframe<span className="text-primary">AI</span>
      </span>
    </Link>
  );
}

// ----------------------------------------------------------------------------
// Navbar
// ----------------------------------------------------------------------------

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const menuLinks = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
      );
      const focusableItems = [menuButtonRef.current, ...menuLinks].filter(
        (item): item is HTMLElement => Boolean(item),
      );
      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];

      if (!firstItem || !lastItem) return;

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <Logo />

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#get-started"
          className="hidden items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-glow-lg lg:inline-flex"
        >
          Get Started
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
          aria-controls={mobileMenuId}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-200 transition-colors hover:bg-white/5 lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <div
          ref={mobileMenuRef}
          id={mobileMenuId}
          aria-hidden={!isMenuOpen}
          className={`absolute inset-x-0 top-full flex flex-col gap-1 overflow-hidden border-b border-white/5 bg-background/95 px-6 backdrop-blur-xl transition-all duration-300 lg:hidden ${
            isMenuOpen ? "max-h-96 py-6" : "max-h-0 py-0"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              tabIndex={isMenuOpen ? 0 : -1}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#get-started"
            onClick={() => setIsMenuOpen(false)}
            tabIndex={isMenuOpen ? 0 : -1}
            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            Get Started
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}

// ----------------------------------------------------------------------------
// Hero
// ----------------------------------------------------------------------------

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-32">
      {/* Blueprint grid, faded toward the edges */}
      <div className="bg-grid fade-mask absolute inset-0" aria-hidden="true" />

      {/* Ambient gradient blobs */}
      <div
        className="absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 animate-blob rounded-full bg-primary/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-1/3 h-[380px] w-[380px] animate-blob rounded-full bg-accent-emerald/10 blur-[100px] [animation-delay:4s]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="group relative mb-8 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-accent-cyan" aria-hidden="true" />
          AI infrastructure, reimagined
          <CornerBrackets className="opacity-100" />
        </div>

        <h1 className="mb-6 text-balance animate-fade-in-up font-display text-5xl font-bold leading-[1.1] tracking-tight text-white [animation-delay:100ms] sm:text-6xl lg:text-7xl">
          Build the future,{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x">
            one frame at a time.
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-balance animate-fade-in-up text-lg text-slate-400 [animation-delay:200ms] sm:text-xl">
          blueframeAI gives enterprises the intelligent infrastructure to design, deploy, and
          scale AI-native products — without the complexity.
        </p>

        <div className="flex animate-fade-in-up flex-col items-center justify-center gap-4 [animation-delay:300ms] sm:flex-row">
          <a
            href="#get-started"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-glow-lg sm:w-auto"
          >
            Start Building
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a
            href="#docs"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:w-auto"
          >
            View Documentation
          </a>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// Features
// ----------------------------------------------------------------------------

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.06] hover:shadow-glow">
      <CornerBrackets />
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-colors duration-300 group-hover:bg-primary/20"
        aria-hidden="true"
      />
      <div className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary/20 to-accent-cyan/10 text-primary transition-colors group-hover:text-accent-cyan">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="relative mb-2 font-display text-lg font-semibold text-white">
        {feature.title}
      </h3>
      <p className="relative text-sm leading-relaxed text-slate-400">{feature.description}</p>
    </div>
  );
}

function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-16 max-w-2xl text-center">
      <span className="mb-4 inline-block font-mono text-sm font-semibold tracking-wider text-primary">
        {label}
      </span>
      <h2 className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl">
        {title}
      </h2>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}

function FeaturesGrid() {
  return (
    <section id="features" className="relative border-t border-white/5 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="[ Platform ]"
          title="Everything you need to ship AI, fast."
          description="A complete toolkit for building, deploying, and monitoring intelligent applications at enterprise scale."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="solutions" className="relative border-t border-white/5 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="[ Solutions ]"
          title="Built for the teams making AI operational."
          description="Reusable infrastructure patterns help product, operations, and platform teams move faster with shared controls."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SOLUTIONS.map((solution) => (
            <article
              key={solution.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.06]"
            >
              <CornerBrackets />
              <h3 className="mb-3 font-display text-xl font-semibold text-white">
                {solution.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">{solution.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="relative border-t border-white/5 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="[ Pricing ]"
          title="Plans shaped around production needs."
          description="Every deployment is scoped to usage, governance, support, and integration requirements."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <article
              key={tier.name}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/70 p-6"
            >
              <h3 className="font-display text-xl font-semibold text-white">{tier.name}</h3>
              <p className="mt-3 text-3xl font-bold text-white">{tier.price}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{tier.description}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-slate-300">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-emerald"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#get-started"
                className="mt-8 inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-primary/50 hover:bg-primary/10"
                aria-label={`${tier.cta} pricing`}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Docs() {
  return (
    <section id="docs" className="relative border-t border-white/5 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="[ Docs ]"
          title="Reference material for secure launches."
          description="Documentation paths cover integration, governance, and release operations for AI-native products."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {DOCS.map((doc) => (
            <article key={doc.title} className="rounded-2xl border border-white/10 p-6">
              <h3 className="font-display text-xl font-semibold text-white">{doc.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{doc.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GetStarted() {
  return (
    <section id="get-started" className="relative border-t border-white/5 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <span className="mb-4 inline-block font-mono text-sm font-semibold tracking-wider text-primary">
          [ Get Started ]
        </span>
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Start with the infrastructure your launch needs.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Share your deployment goals and the blueframeAI team can map the right workspace,
          security, and support model.
        </p>
        <a
          href="mailto:hello@blueframeai.com"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-glow-lg"
        >
          Contact Sales
          <Mail className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// Footer
// ----------------------------------------------------------------------------

function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 pb-12 lg:grid-cols-5">
          <div className="col-span-2">
            <Logo className="mb-4" />
            <p className="mb-6 max-w-xs text-sm text-slate-400">
              Intelligent infrastructure for enterprises building the next generation of
              AI-native products.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@blueframeai.com?subject=GitHub"
                aria-label="Ask blueframeAI about GitHub"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-primary/40 hover:text-white"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:hello@blueframeai.com?subject=LinkedIn"
                aria-label="Ask blueframeAI about LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-primary/40 hover:text-white"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:hello@blueframeai.com"
                aria-label="Email blueframeAI"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-primary/40 hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h2 className="mb-4 text-sm font-semibold text-white">{heading}</h2>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} blueframeAI. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

// ----------------------------------------------------------------------------
// Page
// ----------------------------------------------------------------------------

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-x-hidden bg-background">
        <Hero />
        <FeaturesGrid />
        <Solutions />
        <Pricing />
        <Docs />
        <GetStarted />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
    </>
  );
}
