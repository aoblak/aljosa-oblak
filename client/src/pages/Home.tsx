/**
 * Home.tsx — Aljoša Oblak One-Page Website
 *
 * Design: Mediterranean Brutalism meets Digital Craft
 * - Limestone off-white bg, Adriatic navy text, electric cyan accents, sunset gold ornaments
 * - Playfair Display (headings) + DM Sans (body) + JetBrains Mono (tech tags)
 * - Diagonal clip-path section dividers, asymmetric editorial layouts
 * - Scroll-reveal animations, card hover glows, CTA sweep button
 *
 * SEO: Keyword-optimized content for:
 * - "izrada web stranica Premantura/Medulin/Istra"
 * - "AI web rješenja Istra", "web agencija Istra"
 * - "Cyber Internet Beyond Pula Flanatička 14"
 * - "Dunja Apartments Premantura direktna rezervacija"
 * - "Aljoša Oblak poduzetnik Premantura"
 *
 * AIO: JSON-LD Person + 3x LocalBusiness, FAQ schema, semantic HTML5
 */

import { useEffect, useState } from "react";
import { MapView } from "@/components/Map";
import { MatrixRain } from "@/components/MatrixRain";
import { MatrixTypewriter } from "@/components/MatrixTypewriter";

// ── CDN image URLs (tied to webdev project lifecycle) ──────────────────────
const IMG_HERO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663029482261/VW7SkNmS6AogFLPGcjPDHp/hero-premantura-NHQfY3ZZqRZSXfkjsU86We.webp";
const IMG_CYBER =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663029482261/VW7SkNmS6AogFLPGcjPDHp/cyber-cafe-pula-cntDaqm3c87bqbEXCpN9jk.webp";
const IMG_AGENCY =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663029482261/VW7SkNmS6AogFLPGcjPDHp/web-agency-workspace-C97cbPtmPN9ptaBWtsUoyL.webp";
const IMG_DUNJA =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663029482261/VW7SkNmS6AogFLPGcjPDHp/dunja-apartments-o4frC9Di4zagDZxffAf5jf.webp";

// ── Scroll-reveal hook ─────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Structured Data (JSON-LD) ──────────────────────────────────────────────
const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://aljosaoblak.com/#person",
      name: "Aljoša Oblak",
      jobTitle: "Technology Integrator, Founder of Cyber – Internet & Beyond",
      description:
        "Aljoša Oblak je poduzetnik i digitalni pionir iz Premanture, Istra. Osnivač Cyber Internet & Beyond u Puli, Web Development Agency Premantura za AI i web rješenja, te Dunja Apartments u Premanturi.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Brig 11",
        addressLocality: "Premantura",
        postalCode: "52203",
        addressRegion: "Medulin",
        addressCountry: "HR",
      },
      email: "aljosa@oblak.hr",
      telephone: "+385955186313",
      url: "https://aljosaoblak.com",
      sameAs: [
        "https://hr.linkedin.com/in/aljosaoblak",
        "https://www.facebook.com/aljosa.oblak.7/",
        "https://www.facebook.com/cybercafepula/",
        "https://www.instagram.com/aljosa.nebeski/",
        "https://www.youtube.com/c/AljosaOblak",
      ],
      knowsAbout: [
        "Web Development",
        "AI Solutions",
        "Internet Cafe",
        "Apartment Rental",
        "Digital Marketing",
        "SEO",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://aljosaoblak.com/#cyber",
      name: "Cyber Internet & Beyond",
      description:
        "Kultni internet cafe u Puli, Flanatička 14. Otvoren 2000. godine, pionir interneta u Istri.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Flanatička 14",
        addressLocality: "Pula",
        postalCode: "52100",
        addressCountry: "HR",
      },
      telephone: "+385955186313",
      url: "https://www.facebook.com/cybercafepula/",
      founder: { "@id": "https://aljosaoblak.com/#person" },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://aljosaoblak.com/#agency",
      name: "Web Development Agency Premantura",
      description:
        "Web agencija u Premanturi za izradu web stranica i AI rješenja. Specijalizirana za lokalna poduzeća u Istri i Medulinu.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Brig 11",
        addressLocality: "Premantura",
        postalCode: "52203",
        addressRegion: "Medulin",
        addressCountry: "HR",
      },
      telephone: "+385955186313",
      founder: { "@id": "https://aljosaoblak.com/#person" },
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: 44.7636, longitude: 13.9212 },
        geoRadius: "50000",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web & AI Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Izrada web stranica Istra" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI web rješenja" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO optimizacija" } },
        ],
      },
    },
    {
      "@type": "LodgingBusiness",
      "@id": "https://aljosaoblak.com/#dunja",
      name: "Dunja Apartments",
      description:
        "Apartmani uz more u Premanturi, Brig 11. Direktna rezervacija bez provizije. Beachfront smještaj u Istri.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Brig 11",
        addressLocality: "Premantura",
        postalCode: "52203",
        addressRegion: "Medulin",
        addressCountry: "HR",
      },
      telephone: "+385955186313",
      founder: { "@id": "https://aljosaoblak.com/#person" },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Beachfront", value: true },
        { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
        { "@type": "LocationFeatureSpecification", name: "Garden", value: true },
        { "@type": "LocationFeatureSpecification", name: "Free Bicycles", value: true },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Tko je Aljoša Oblak?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Aljoša Oblak je poduzetnik i digitalni pionir iz Premanture, Istra, Hrvatska. Osnivač je Cyber Internet & Beyond u Puli, Web Development Agency Premantura za AI i web rješenja, te Dunja Apartments u Premanturi.",
          },
        },
        {
          "@type": "Question",
          name: "Gdje se nalazi Web Development Agency Premantura?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Web Development Agency Premantura nalazi se na adresi Brig 11, Premantura, 52203 Medulin, Istra, Hrvatska. Agencija se bavi izradom web stranica i AI rješenjima za poduzetnike u Istri i šire.",
          },
        },
        {
          "@type": "Question",
          name: "Što je Cyber Internet & Beyond Pula?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cyber Internet & Beyond je kultni internet cafe na adresi Flanatička 14, Pula, otvoren 2000. godine. Jedan od prvih internet cafea u Istri, postao je ikonično mjesto digitalne kulture u Puli.",
          },
        },
        {
          "@type": "Question",
          name: "Kako rezervirati Dunja Apartments Premantura?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dunja Apartments u Premanturi (Brig 11, 52203 Medulin) možete rezervirati direktno kontaktiranjem Aljoše Oblaka na broj +385 95 518 6313 ili emailom. Direktna rezervacija bez provizije.",
          },
        },
      ],
    },
  ],
};

// ── Navigation ─────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#o-meni", label: "O meni" },
    { href: "#projekti", label: "Projekti" },
    { href: "#cyber", label: "Cyber Cafe" },
    { href: "#agencija", label: "Agencija" },
    { href: "#apartmani", label: "Apartmani" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.97_0.012_82/0.97)] backdrop-blur-sm shadow-sm border-b border-[oklch(0.85_0.02_80)]"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Glavna navigacija"
        className="container flex items-center justify-between h-16"
      >
        {/* Logo */}
        <a
          href="#vrh"
          className="font-display font-bold text-lg tracking-tight text-[oklch(0.18_0.06_245)] no-underline"
          aria-label="Aljoša Oblak — Početna"
        >
          <span className="text-[oklch(0.78_0.14_195)]">A</span>ljoša{" "}
          <span className="text-[oklch(0.78_0.14_195)]">O</span>blak
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#kontakt"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold tracking-wide uppercase border border-[oklch(0.18_0.06_245)] text-[oklch(0.18_0.06_245)] btn-sweep hover:text-[oklch(0.18_0.06_245)] transition-colors"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Kontaktirajte me
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Otvori izbornik"
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-0.5 bg-[oklch(0.18_0.06_245)] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[oklch(0.18_0.06_245)] transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[oklch(0.18_0.06_245)] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[oklch(0.97_0.012_82)] border-t border-[oklch(0.85_0.02_80)] px-6 py-4">
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="nav-link text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold tracking-wide uppercase border border-[oklch(0.18_0.06_245)] text-[oklch(0.18_0.06_245)]"
                onClick={() => setMenuOpen(false)}
              >
                Kontaktirajte me
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

// ── Hero Section ───────────────────────────────────────────────────────────
function HeroSection() {
  const IMG_PROFILE = "/manus-storage/aljosa-profile_9a886bd1.jpg";

  return (
    <section
      id="vrh"
      aria-label="Hero — Aljoša Oblak, poduzetnik i digitalni pionir"
      className="relative min-h-screen flex items-center pb-24 pt-24 overflow-hidden clip-diagonal-bottom"
      style={{ background: "#000000" }}
    >
      {/* Matrix Rain background */}
      <div className="absolute inset-0 z-0">
        <MatrixRain className="w-full h-full" fontSize={15} />
        {/* Bottom fade so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

        {/* LEFT — text */}
        <div>
          {/* Mono tag */}
          <div className="mono-tag inline-block mb-6" style={{ color: "#42F58D", borderColor: "#42F58D40", background: "rgba(66,245,141,0.08)" }}>
            Premantura · Istra · Hrvatska
          </div>

          {/* H1 — primary SEO keyword target */}
          {/* H1 — Matrix typewriter animation */}
          <MatrixTypewriter
            line1="Aljoša"
            line2="Oblak"
            className="font-display mb-6 leading-none"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              fontWeight: 900,
            }}
          />

          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#b0ffc8",
            }}
          >
            Technology Integrator · Founder, Cyber – Internet &amp; Beyond
          </p>

          <p
            className="mb-10 max-w-xl"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "#7de8a8",
            }}
          >
            Pretvaram AI i tehnologiju u pouzdane poslovne sustave.
            Cyber – Internet &amp; Beyond je platforma kroz koju se ideje
            dizajniraju, testiraju i isporučuju.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projekti"
              className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-sm tracking-widest uppercase transition-all hover:shadow-lg"
              style={{ background: "#42F58D", color: "#07090C", boxShadow: "0 0 20px #42F58D40", fontFamily: "var(--font-body)" }}
            >
              Moji projekti
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-sm tracking-widest uppercase transition-all"
              style={{ border: "1px solid #42F58D66", color: "#42F58D", fontFamily: "var(--font-body)" }}
            >
              Kontakt
            </a>
          </div>
        </div>

        {/* RIGHT — profile photo */}
        <div className="hidden md:flex justify-center items-center">
          <div
            className="relative"
            style={{
              width: "clamp(220px, 22vw, 340px)",
              flexShrink: 0,
            }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                boxShadow: "0 0 0 2px #42F58D66, 0 0 30px #42F58D33, 0 0 60px #42F58D20",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 rounded-sm pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(66,245,141,0.04) 3px, rgba(66,245,141,0.04) 4px)",
                zIndex: 3,
              }}
            />
            {/* Corner brackets — top-left */}
            <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none" style={{ zIndex: 4 }}>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-[#42F58D]" />
              <div className="absolute top-0 left-0 w-0.5 h-full bg-[#42F58D]" />
            </div>
            {/* Corner brackets — top-right */}
            <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none" style={{ zIndex: 4 }}>
              <div className="absolute top-0 right-0 w-full h-0.5 bg-[#42F58D]" />
              <div className="absolute top-0 right-0 w-0.5 h-full bg-[#42F58D]" />
            </div>
            {/* Corner brackets — bottom-left */}
            <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none" style={{ zIndex: 4 }}>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#42F58D]" />
              <div className="absolute bottom-0 left-0 w-0.5 h-full bg-[#42F58D]" />
            </div>
            {/* Corner brackets — bottom-right */}
            <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none" style={{ zIndex: 4 }}>
              <div className="absolute bottom-0 right-0 w-full h-0.5 bg-[#42F58D]" />
              <div className="absolute bottom-0 right-0 w-0.5 h-full bg-[#42F58D]" />
            </div>
            {/* Photo */}
            <img
              src={IMG_PROFILE}
              alt="Aljoša Oblak — poduzetnik i digitalni pionir, Premantura, Istra"
              className="w-full block rounded-sm"
              style={{
                filter: "contrast(1.05) brightness(0.92)",
                position: "relative",
                zIndex: 1,
              }}
              loading="eager"
            />
            {/* ID tag below photo */}
            <div
              className="mt-2 text-center"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "#42F58D99",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              [ ALJOSA_OBLAK · PREMANTURA · HR ]
            </div>
          </div>
        </div>

        </div>{/* end grid */}

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2" style={{ color: "#42F58D66" }}>
          <span className="mono-tag text-[0.6rem]">Scroll</span>
          <div className="w-px h-12 animate-pulse" style={{ background: "#42F58D40" }} />
        </div>
      </div>
    </section>
  );
}

// ── About Section ──────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      id="o-meni"
      aria-labelledby="about-heading"
      className="py-24 bg-[oklch(0.97_0.012_82)]"
    >
      <div className="container">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Left — number + label */}
          <div className="reveal">
            <div className="section-number">01</div>
            <div className="gold-rule my-4">
              <span className="mono-tag">O meni</span>
            </div>
            <p className="text-[oklch(0.45_0.04_245)] text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Gradim praktične sustave na sjecištu tehnologije, operacija
              i ljudskog iskustva. Cyber – Internet &amp; Beyond je platforma.
            </p>
          </div>

          {/* Right — bio */}
          <div>
            <h2
              id="about-heading"
              className="font-display text-[oklch(0.18_0.06_245)] mb-6 reveal"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700 }}
            >
              Technology Integrator &amp; Entrepreneurial Operator
            </h2>

            <div
              className="space-y-5 text-[oklch(0.28_0.05_245)] reveal reveal-delay-1"
              style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.8 }}
            >
              <p>
                <strong>Aljoša Oblak</strong> gradi praktične sustave gdje se tehnologija,
                operacije i ljudsko iskustvo susreću. Kao osnivač{" "}
                <strong>Cyber – Internet &amp; Beyond</strong>, radi na implementaciji AI-a,
                sistemskoj integraciji, poslovnoj automatizaciji, tehnologiji ugostiteljstva
                i razvoju novih proizvoda.
              </p>
              <p>
                Njegova pozadina kombinira poduzetništvo s praktičnom tehnologijom: Linux i
                sistemska administracija, web platforme, digitalni tijekovi rada, automatizacija
                i operacije okrenute korisnicima. Perspektiva je istovremeno strateška i praktična —
                rješenje nije uspješno jer izgleda impresivno u demonstraciji, već kada radi
                pouzdano, ima jasnog vlasnika i proizvodi mjerljivu vrijednost.
              </p>
              <p>
                Trenutna područja fokusa: praktični AI i automatizacija za poduzeća,
                digitalna sistemska integracija, tehnologija ugostiteljstva kroz{" "}
                <strong>Dunja Residence</strong>, Linux i web infrastruktura te upravljanje
                programima i validacija novih koncepata. Tehnologija treba jačati ljudske
                sposobnosti — ne reducirati ljude na komponente u tijeku rada.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 reveal reveal-delay-2">
              {[
                { n: "25+", label: "Godina iskustva" },
                { n: "3", label: "Aktivna poduzeća" },
                { n: "∞", label: "Projekata" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-[oklch(0.78_0.14_195)] pl-4">
                  <div
                    className="font-display text-[oklch(0.18_0.06_245)]"
                    style={{ fontSize: "2rem", fontWeight: 900, lineHeight: 1 }}
                  >
                    {s.n}
                  </div>
                  <div
                    className="text-[oklch(0.55_0.04_245)] text-xs mt-1 uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Projects / Works Section ───────────────────────────────────────────────
function ProjectsSection() {
  const projects = [
    {
      id: "cyber",
      num: "01",
      tag: "Internet Cafe · Pula · 2000",
      title: "Cyber Internet & Beyond",
      subtitle: "Kultni internet cafe Pula",
      desc: "Pionirski internet cafe na Flanatičkoj 14 u Puli, otvoren 2000. godine. Postao je ikonično mjesto digitalne kulture Pule — prostor gdje su generacije Puljana prvi put iskusile internet. Jedan od najdugovječnijih internet cafea u Istri.",
      img: IMG_CYBER,
      imgAlt: "Unutrašnjost Cyber Internet & Beyond cafea, Flanatička 14, Pula — vintage računala u kamenom prostoru",
      keywords: ["internet cafe Pula", "Cyber Cafe Flanatička 14", "kultni kafić Pula"],
      href: "#cyber",
      color: "oklch(0.72 0.12 75)",
    },
    {
      id: "agencija",
      num: "02",
      tag: "Web & AI Agencija · Premantura · Istra",
      title: "Web Development Agency Premantura",
      subtitle: "Izrada web stranica i AI rješenja",
      desc: "Web agencija u Premanturi specijalizirana za izradu modernih web stranica i AI rješenja za poduzetnike u Istri, Medulinu i šire. Od jednostavnih prezentacijskih stranica do kompleksnih web aplikacija s integriranom umjetnom inteligencijom.",
      img: IMG_AGENCY,
      imgAlt: "Moderni web development workspace u Premanturi s pogledom na Jadransko more — višestruki monitori s kodom",
      keywords: ["izrada web stranica Premantura", "web agencija Istra", "AI web rješenja"],
      href: "#agencija",
      color: "oklch(0.78 0.14 195)",
    },
    {
      id: "apartmani",
      num: "03",
      tag: "Apart House · Premantura · Brig 11",
      title: "Dunja Apartments",
      subtitle: "Apartmani uz more, Premantura",
      desc: "Beachfront apart house na adresi Brig 11 u Premanturi, 52203 Medulin. Direktan pristup moru, vrt, besplatni bicikli i WiFi. Autentičan istarski smještaj u jednom od najljepših mjesta na poluotoku Kamenjak. Direktna rezervacija bez provizije.",
      img: IMG_DUNJA,
      imgAlt: "Dunja Apartments Premantura — mediteranska arhitektura s maslinicima i kristalno čistim Jadranskim morem",
      keywords: ["Dunja Apartments Premantura", "apartmani uz more Premantura", "direktna rezervacija"],
      href: "#apartmani",
      color: "oklch(0.55 0.1 245)",
    },
  ];

  return (
    <section
      id="projekti"
      aria-labelledby="projects-heading"
      className="py-24 bg-[oklch(0.93_0.01_80)]"
    >
      <div className="container">
        {/* Section header */}
        <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
          <div className="reveal">
            <div className="section-number leading-none mb-2">02</div>
            <h2
              id="projects-heading"
              className="font-display text-[oklch(0.18_0.06_245)]"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700 }}
            >
              Reprezentativni projekti
            </h2>
          </div>
          <p
            className="max-w-sm text-[oklch(0.45_0.04_245)] reveal reveal-delay-1"
            style={{ fontFamily: "var(--font-body)", lineHeight: 1.7 }}
          >
            Tri poduzeća koja definiraju moj put — od pionirskog interneta u
            Puli do AI rješenja i mediteranskog gostoprimstva.
          </p>
        </div>

        {/* Project cards */}
        <div className="space-y-8">
          {projects.map((p, i) => (
            <article
              key={p.id}
              id={p.id}
              aria-labelledby={`project-title-${p.id}`}
              className={`reveal reveal-delay-${i + 1} card-hover bg-white overflow-hidden border border-[oklch(0.85_0.02_80)] grid md:grid-cols-[1fr_1fr] ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden aspect-[4/3] md:aspect-auto"
                style={{ direction: "ltr" }}
              >
                <img
                  src={p.img}
                  alt={p.imgAlt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay number */}
                <div
                  className="absolute top-4 left-4 font-display font-black text-white/20 leading-none select-none"
                  style={{ fontSize: "5rem" }}
                  aria-hidden="true"
                >
                  {p.num}
                </div>
              </div>

              {/* Content */}
              <div
                className="p-8 md:p-12 flex flex-col justify-center"
                style={{ direction: "ltr" }}
              >
                <div className="mono-tag inline-block mb-4 w-fit">{p.tag}</div>
                <h3
                  id={`project-title-${p.id}`}
                  className="font-display text-[oklch(0.18_0.06_245)] mb-2"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 700 }}
                >
                  {p.title}
                </h3>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    color: p.color,
                    fontSize: "1.05rem",
                  }}
                >
                  {p.subtitle}
                </p>
                <p
                  className="text-[oklch(0.38_0.04_245)] mb-6"
                  style={{ fontFamily: "var(--font-body)", lineHeight: 1.75 }}
                >
                  {p.desc}
                </p>

                {/* Hidden SEO keywords */}
                <ul className="sr-only" aria-hidden="true">
                  {p.keywords.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>

                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-[oklch(0.18_0.06_245)] group"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Saznaj više
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Services / Skills Section ──────────────────────────────────────────────
// Custom SVG icons for each strategic pillar
function PillarIcon({ name, className = "" }: { name: string; className?: string }) {
  const svgProps = { width: 40, height: 40, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className, "aria-hidden": true as const };

  switch (name) {
    case "ai":
      return (
        <svg {...svgProps}>
          <path d="M12 2a4 4 0 014 4v1h-8V6a4 4 0 014-4z" />
          <rect x="4" y="7" width="16" height="12" rx="2" />
          <circle cx="9" cy="13" r="1.5" fill="currentColor" />
          <circle cx="15" cy="13" r="1.5" fill="currentColor" />
          <path d="M9 17h6" />
          <path d="M12 19v3M8 22h8" />
        </svg>
      );
    case "integration":
      return (
        <svg {...svgProps}>
          <circle cx="5" cy="6" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="5" cy="18" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M7 6h10M7 18h10M5 8v8M19 8v8" />
          <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.2" />
          <path d="M12 9v6M9 12h6" />
        </svg>
      );
    case "hospitality":
      return (
        <svg {...svgProps}>
          <path d="M3 21h18" />
          <path d="M5 21V7l7-4 7 4v14" />
          <rect x="9" y="13" width="6" height="8" rx="0.5" />
          <path d="M9 9h2M13 9h2" />
          <path d="M9 11h2M13 11h2" />
          <circle cx="12" cy="5" r="0.5" fill="currentColor" />
        </svg>
      );
    case "programme":
      return (
        <svg {...svgProps}>
          <path d="M4 4h16v16H4z" strokeDasharray="2 2" />
          <path d="M4 9h16" />
          <path d="M9 4v16" />
          <circle cx="6.5" cy="6.5" r="1" fill="currentColor" />
          <path d="M12 12l2 2 4-4" />
          <path d="M12 16h5" />
        </svg>
      );
    case "adriatic":
      return (
        <svg {...svgProps}>
          <path d="M2 12c1.5-2 3-3 5-3s3.5 1 5 3 3 3 5 3 3.5-1 5-3" />
          <path d="M2 16c1.5-2 3-3 5-3s3.5 1 5 3 3 3 5 3 3.5-1 5-3" opacity="0.5" />
          <path d="M2 8c1.5-2 3-3 5-3s3.5 1 5 3 3 3 5 3 3.5-1 5-3" opacity="0.3" />
          <circle cx="12" cy="6" r="2" fill="currentColor" opacity="0.4" />
          <path d="M12 4v-2M14 5l1-1M10 5l-1-1" />
        </svg>
      );
    case "human":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="7" r="3" />
          <path d="M5 21v-2a5 5 0 015-5h4a5 5 0 015 5v2" />
          <path d="M16 3.13a4 4 0 010 7.75" opacity="0.4" />
          <path d="M21 21v-2a4 4 0 00-3-3.87" opacity="0.4" />
          <path d="M12 14v3M10 16h4" />
        </svg>
      );
    default:
      return null;
  }
}

function ServicesSection() {
  const services = [
    {
      iconName: "ai",
      title: "Praktična implementacija AI-a",
      desc: "Primjena AI-a na definirane procese, odluke i korisničke tijekove — ne apstraktna 'AI transformacija', već strukturirani program koji ljudi mogu stvarno koristiti.",
    },
    {
      iconName: "integration",
      title: "Sistemska integracija",
      desc: "Povezivanje infrastrukture, web sustava, automatizacije, podataka i ljudskih odgovornosti. Manje nepovezanih alata, jasnije vlasništvo, pouzdanije operacije.",
    },
    {
      iconName: "hospitality",
      title: "Tehnologija ugostiteljstva",
      desc: "Tretiranje smještaja kao mjerljivog operativnog sustava: konzistentni podaci kanala, brža komunikacija s gostima, direktna rezervacija i vidljivost prihoda.",
    },
    {
      iconName: "programme",
      title: "Upravljanje programima",
      desc: "Od koncepta kroz zahtjeve, partnere, testiranje, rizike i isporuku. Smanjenje nejasnoća u projektu i rano prepoznavanje skupih grešaka.",
    },
    {
      iconName: "adriatic",
      title: "Jadransko dokazno polje",
      desc: "Gradnja iz Istre uz rješavanje međunarodno relevantnih problema — turizam, morska inovacija i lokalni SME ekosustav kao autentičan i distinktivan kontekst.",
    },
    {
      iconName: "human",
      title: "Tehnologija usmjerena na čovjeka",
      desc: "Dizajn za jasnoću, odgovornost, privatnost i sigurnost od samog početka. Tehnologija treba povećati ljudske sposobnosti — ne stvoriti složenost radi sebe.",
    },
  ];

  return (
    <section
      id="usluge"
      aria-labelledby="services-heading"
      className="py-24 bg-[oklch(0.18_0.06_245)] clip-diagonal-top clip-diagonal-bottom"
    >
      <div className="container">
        <div className="text-center mb-16 reveal">
          <div className="section-number text-[oklch(0.28_0.06_245)] mb-2">03</div>
          <h2
            id="services-heading"
            className="font-display text-white"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700 }}
          >
            Strateški stupovi
          </h2>
          <p
            className="text-[oklch(0.68_0.04_245)] mt-4 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-body)", lineHeight: 1.7 }}
          >
            Cyber – Internet &amp; Beyond: platforma za AI implementaciju, sistemsku
            integraciju, tehnologiju ugostiteljstva i razvoj novih programa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`reveal reveal-delay-${(i % 4) + 1} relative p-8 border border-[oklch(0.28_0.06_245)] transition-all duration-500 ease-out group cursor-default overflow-hidden`}
              style={{
                background: "oklch(0.14 0.04 245)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-6px) scale(1.02)";
                el.style.borderColor = "#42F58D88";
                el.style.boxShadow = "0 12px 40px #42F58D15, 0 0 0 1px #42F58D33, inset 0 1px 0 #42F58D11";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0) scale(1)";
                el.style.borderColor = "";
                el.style.boxShadow = "none";
              }}
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 30% 20%, #42F58D08 0%, transparent 70%)",
                }}
              />

              {/* Icon */}
              <div className="relative mb-5 text-[oklch(0.55_0.04_245)] group-hover:text-[#42F58D] transition-all duration-500 group-hover:-translate-y-1">
                <PillarIcon name={s.iconName} />
              </div>

              {/* Title */}
              <h3
                className="relative font-display text-white mb-3 group-hover:text-[#e8fff2] transition-colors duration-300"
                style={{ fontSize: "1.15rem", fontWeight: 600 }}
              >
                {s.title}
              </h3>

              {/* Description */}
              <p
                className="relative text-[oklch(0.55_0.04_245)] text-sm leading-relaxed group-hover:text-[oklch(0.68_0.04_245)] transition-colors duration-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {s.desc}
              </p>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                style={{ background: "linear-gradient(90deg, #42F58D, #42F58D66, transparent)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section
      aria-label="Poziv na akciju — kontaktirajte web agenciju Premantura"
      className="py-24 bg-[oklch(0.97_0.012_82)]"
    >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center reveal">
          <div className="gold-rule mb-8 justify-center">
            <span className="mono-tag">Surađujmo</span>
          </div>
          <h2
            className="font-display text-[oklch(0.18_0.06_245)] mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }}
          >
            Od složenosti do funkcionalnih sustava — zajedno.
          </h2>
          <p
            className="text-[oklch(0.38_0.04_245)] mb-10 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.8 }}
          >
            Pomažem vlasnicima poduzeća pretvoriti složenu tehnologiju u pouzdane
            operativne sustave. Kontaktirajte me za AI &amp; sistemsku dijagnostiku —
            besplatnu uvodnu konzultaciju.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[oklch(0.18_0.06_245)] text-[oklch(0.97_0.012_82)] font-semibold text-sm tracking-widest uppercase btn-sweep transition-all hover:shadow-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              AI &amp; Sistemska dijagnostika
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="tel:+385955186313"
              className="inline-flex items-center gap-2 px-10 py-4 border border-[oklch(0.18_0.06_245)] text-[oklch(0.18_0.06_245)] font-semibold text-sm tracking-widest uppercase transition-all hover:bg-[oklch(0.18_0.06_245/0.05)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 3a1 1 0 011-1h2.5a1 1 0 011 1v2a1 1 0 01-.6.92l-1.1.55a9 9 0 004.73 4.73l.55-1.1A1 1 0 0111 9.5h2a1 1 0 011 1V13a1 1 0 01-1 1h-1C5.37 14 2 10.63 2 6.5V3z" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
              +385 95 518 6313
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ Section (AIO optimized) ────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    {
      q: "Tko je Aljoša Oblak?",
      a: "Aljoša Oblak je poduzetnik i digitalni pionir iz Premanture, Istra, Hrvatska (Brig 11, 52203 Medulin). Osnivač je Cyber Internet & Beyond u Puli, Web Development Agency Premantura za AI i web rješenja, te Dunja Apartments u Premanturi.",
    },
    {
      q: "Koje usluge nudi Web Development Agency Premantura?",
      a: "Web Development Agency Premantura nudi izradu web stranica, AI web rješenja, SEO optimizaciju, responzivni dizajn i digitalni marketing za poduzetnike u Istri, Medulinu, Puli i šire. Specijalizirana je za lokalna poduzeća s fokusom na nisku konkurenciju ključnih riječi.",
    },
    {
      q: "Što je Cyber Internet & Beyond Pula?",
      a: "Cyber Internet & Beyond je kultni internet cafe na adresi Flanatička 14, Pula (52100), otvoren 2000. godine. Jedan od prvih i najdugovječnijih internet cafea u Istri, postao je ikonično mjesto digitalne kulture u Puli.",
    },
    {
      q: "Kako rezervirati Dunja Apartments u Premanturi?",
      a: "Dunja Apartments (Brig 11, Premantura, 52203 Medulin) možete rezervirati direktno — bez provizije OTA platformi. Kontaktirajte Alješu Oblaka na +385 95 518 6313 ili emailom. Beachfront smještaj s direktnim pristupom moru.",
    },
    {
      q: "Koliko košta izrada web stranice u Istri?",
      a: "Cijena izrade web stranice u Istri ovisi o kompleksnosti projekta. Web Development Agency Premantura nudi transparentne cijene za prezentacijske stranice, web shopove i AI-integrirane projekte. Kontaktirajte za besplatnu ponudu.",
    },
  ];

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-24 bg-[oklch(0.93_0.01_80)]"
    >
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-14 reveal">
          <div className="section-number mb-2">04</div>
          <h2
            id="faq-heading"
            className="font-display text-[oklch(0.18_0.06_245)]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700 }}
          >
            Često postavljana pitanja
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="reveal bg-white border border-[oklch(0.85_0.02_80)] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-7 py-5 flex items-center justify-between gap-4 hover:bg-[oklch(0.97_0.012_82)] transition-colors"
                aria-expanded={open === i}
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", color: "oklch(0.18 0.06 245)" }}
              >
                <span>{f.q}</span>
                <span
                  className="text-[oklch(0.78_0.14_195)] transition-transform duration-200 flex-shrink-0"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              {open === i && (
                <div
                  className="px-7 pb-6 text-[oklch(0.38_0.04_245)]"
                  style={{ fontFamily: "var(--font-body)", lineHeight: 1.75 }}
                >
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact Section ────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Compose mailto link
    const subject = encodeURIComponent(`Upit od ${form.name}`);
    const body = encodeURIComponent(`Ime: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:aljosa@oblak.hr?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="kontakt"
      aria-labelledby="contact-heading"
      className="py-24 bg-[oklch(0.97_0.012_82)]"
    >
      <div className="container">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="section-number mb-2">05</div>
          <h2
            id="contact-heading"
            className="font-display text-[oklch(0.18_0.06_245)]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700 }}
          >
            Kontakt
          </h2>
          <p
            className="text-[oklch(0.45_0.04_245)] mt-3 max-w-lg"
            style={{ fontFamily: "var(--font-body)", lineHeight: 1.7 }}
          >
            Web agencija Premantura · Dunja Apartments · Cyber Internet Pula.
            Javite se za web projekt, rezervaciju apartmana ili suradnju.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">
          {/* Left — contact info + map */}
          <div className="space-y-8 reveal">
            {/* Address cards */}
            <div className="space-y-4">
              <address
                className="not-italic p-6 bg-white border border-[oklch(0.85_0.02_80)]"
              >
                <div className="mono-tag inline-block mb-3">Primarna adresa</div>
                <div
                  className="font-display text-[oklch(0.18_0.06_245)] font-bold mb-1"
                  style={{ fontSize: "1.1rem" }}
                >
                  Brig 11, Premantura
                </div>
                <div
                  className="text-[oklch(0.45_0.04_245)] text-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  52203 Medulin, Istra, Hrvatska
                </div>
              </address>

              <address
                className="not-italic p-6 bg-white border border-[oklch(0.85_0.02_80)]"
              >
                <div className="mono-tag inline-block mb-3">Bivša adresa — Cyber Cafe</div>
                <div
                  className="font-display text-[oklch(0.18_0.06_245)] font-bold mb-1"
                  style={{ fontSize: "1.1rem" }}
                >
                  Flanatička 14, Pula
                </div>
                <div
                  className="text-[oklch(0.45_0.04_245)] text-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  52100 Pula, Istra, Hrvatska
                </div>
              </address>
            </div>

            {/* Contact details */}
            <div className="space-y-3">
              {[
                {
                  icon: "📞",
                  label: "Telefon",
                  value: "+385 95 518 6313",
                  href: "tel:+385955186313",
                },
                {
                  icon: "✉️",
                  label: "Email",
                  value: "aljosa@oblak.hr",
                  href: "mailto:aljosa@oblak.hr",
                },
                {
                  icon: "🌐",
                  label: "Facebook — Cyber Cafe",
                  value: "facebook.com/cybercafepula",
                  href: "https://www.facebook.com/cybercafepula/",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 bg-white border border-[oklch(0.85_0.02_80)] hover:border-[oklch(0.78_0.14_195)] transition-colors group no-underline"
                >
                  <span className="text-xl" aria-hidden="true">{c.icon}</span>
                  <div>
                    <div
                      className="text-xs uppercase tracking-widest text-[oklch(0.55_0.04_245)] mb-0.5"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {c.label}
                    </div>
                    <div
                      className="text-[oklch(0.18_0.06_245)] font-medium group-hover:text-[oklch(0.78_0.14_195)] transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {c.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Google Map */}
            <div className="border border-[oklch(0.85_0.02_80)] overflow-hidden">
              <div className="mono-tag m-4 inline-block">Premantura, Brig 11</div>
              <MapView
                initialCenter={{ lat: 44.7636, lng: 13.9212 }}
                initialZoom={14}
                className="w-full h-64"
              />
            </div>
          </div>

          {/* Right — contact form */}
          <div className="reveal reveal-delay-1">
            <div className="bg-white border border-[oklch(0.85_0.02_80)] p-8 md:p-10">
              <h3
                className="font-display text-[oklch(0.18_0.06_245)] mb-2"
                style={{ fontSize: "1.5rem", fontWeight: 700 }}
              >
                Pošaljite upit
              </h3>
              <p
                className="text-[oklch(0.55_0.04_245)] mb-8 text-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Web projekt, rezervacija apartmana ili opći upit — odgovorit ću
                u najkraćem mogućem roku.
              </p>

              {sent ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">✅</div>
                  <p
                    className="font-display text-[oklch(0.18_0.06_245)] text-lg font-semibold"
                  >
                    Hvala! Upit je poslan.
                  </p>
                  <p
                    className="text-[oklch(0.55_0.04_245)] mt-2 text-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Javit ću se što prije.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs uppercase tracking-widest text-[oklch(0.45_0.04_245)] mb-2"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Ime i prezime *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 border border-[oklch(0.85_0.02_80)] bg-[oklch(0.97_0.012_82)] text-[oklch(0.18_0.06_245)] focus:outline-none focus:border-[oklch(0.78_0.14_195)] transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                      placeholder="Vaše ime"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs uppercase tracking-widest text-[oklch(0.45_0.04_245)] mb-2"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Email adresa *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 border border-[oklch(0.85_0.02_80)] bg-[oklch(0.97_0.012_82)] text-[oklch(0.18_0.06_245)] focus:outline-none focus:border-[oklch(0.78_0.14_195)] transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                      placeholder="vas@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs uppercase tracking-widest text-[oklch(0.45_0.04_245)] mb-2"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Poruka *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-[oklch(0.85_0.02_80)] bg-[oklch(0.97_0.012_82)] text-[oklch(0.18_0.06_245)] focus:outline-none focus:border-[oklch(0.78_0.14_195)] transition-colors resize-none"
                      style={{ fontFamily: "var(--font-body)" }}
                      placeholder="Opišite vaš projekt ili upit..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[oklch(0.18_0.06_245)] text-[oklch(0.97_0.012_82)] font-semibold text-sm tracking-widest uppercase btn-sweep transition-all hover:shadow-lg"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Pošalji upit →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-[oklch(0.18_0.06_245)] text-[oklch(0.68_0.04_245)] py-12"
    >
      <div className="container">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-10 mb-10">
          {/* Brand */}
          <div>
            <div
              className="font-display text-white font-bold text-xl mb-3"
            >
              <span style={{ color: "oklch(0.78 0.14 195)" }}>A</span>ljoša{" "}
              <span style={{ color: "oklch(0.78 0.14 195)" }}>O</span>blak
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Technology Integrator &amp; Founder, Cyber – Internet &amp; Beyond.
              Gradim praktične sustave na sjecištu tehnologije i operacija.
            </p>
            <address className="not-italic mt-4 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <div>Brig 11, Premantura, 52203 Medulin</div>
              <div>
                <a href="tel:+385955186313" className="hover:text-[oklch(0.78_0.14_195)] transition-colors">
                  +385 95 518 6313
                </a>
              </div>
              <div>
                <a href="mailto:aljosa@oblak.hr" className="hover:text-[oklch(0.78_0.14_195)] transition-colors">
                  aljosa@oblak.hr
                </a>
              </div>
            </address>
          </div>

          {/* Links */}
          <div>
            <div
              className="mono-tag mb-4 inline-block"
            >
              Navigacija
            </div>
            <ul className="space-y-2 list-none p-0 m-0" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
              {[
                ["#o-meni", "O meni"],
                ["#projekti", "Projekti"],
                ["#usluge", "Usluge"],
                ["#faq", "FAQ"],
                ["#kontakt", "Kontakt"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="hover:text-[oklch(0.78_0.14_195)] transition-colors no-underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Businesses */}
          <div>
            <div className="mono-tag mb-4 inline-block">Projekti</div>
            <ul className="space-y-2 list-none p-0 m-0" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
              <li>Cyber Internet &amp; Beyond</li>
              <li>Web Dev Agency Premantura</li>
              <li>Dunja Apartments</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[oklch(0.28_0.06_245)] pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs" style={{ fontFamily: "var(--font-mono)" }}>
            © {new Date().getFullYear()} Aljoša Oblak · Premantura, Istra, Hrvatska
          </p>
          <p className="text-xs" style={{ fontFamily: "var(--font-mono)" }}>
            From complexity to working systems. Go &amp; Beyond.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Root Page Component ────────────────────────────────────────────────────
// v1.1 — SEO+AIO optimized, keyword research applied, GitHub+Vercel ready
export default function Home() {
  useReveal();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <Navbar />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <CTASection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
