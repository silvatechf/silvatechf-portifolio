import { useEffect, useRef, useState, useCallback } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  Terminal as TerminalIcon,
  Command,
  Search,
  CornerDownLeft,
  Github,
  Linkedin,
  Download,
  BookOpen,
  Send,
  Lock,
} from "lucide-react";

/* -------------------------------------------------------------------- */
/*  LINKS & ENDPOINTS                                                   */
/* -------------------------------------------------------------------- */

const LINKS = {
  resume: "/resume.pdf",
  linkedin: "https://www.linkedin.com/in/fernando-silva-83b155a4/",
  github: "https://github.com/silvatechf",
};

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

/* -------------------------------------------------------------------- */
/*  DATA — Real profile data                                            */
/* -------------------------------------------------------------------- */

const NAV_LINKS = [
  { label: "Briefing", href: "#briefing" },
  { label: "Dossier", href: "#dossier" },
  { label: "Operations", href: "#operations" },
  { label: "Intel", href: "#intel" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
];

const OPERATIONS = [
  {
    codename: "CodeGuard AI: Enterprise Auditor",
    description:
      "Context-aware DevSecOps tool powered by Gemini 2.0. Detects GDPR violations, PII leaks, and cloud misconfigurations, generating secure auto-remediations.",
    tags: ["Python", "Gemini LLM", "Spring Boot", "Angular"],
    annotation: "Status: Active. Focus: AI-Driven Application Security.",
  },
  {
    codename: "NyxOne: AppSec AST Scanner",
    description:
      "Static analysis engine identifying vulnerabilities via Abstract Syntax Trees. Enforces fail-fast CI/CD blocking gates with Loki and Grafana observability.",
    tags: ["Python", "AST", "CI/CD", "Grafana"],
    annotation: "Status: Deployed. Focus: Automated Code Auditing.",
  },
  {
    codename: "CyberReport-Pro",
    description:
      "Automation engine translating raw technical findings into executive PDF reports dynamically mapped to GDPR and Spain's ENS compliance frameworks.",
    tags: ["Python", "WeasyPrint", "GDPR / ENS", "SOAR"],
    annotation: "Status: Active. Focus: Security Compliance Automation.",
  },
  {
    codename: "SecOps Telemetry Pipeline",
    description:
      "Data engineering laboratory capturing Linux authentication events. Features defensive IP defanging, PostgreSQL persistence, and real-time Grafana SIEM dashboards.",
    tags: ["Python", "PostgreSQL", "Data Eng", "SecOps"],
    annotation: "Status: Active. Focus: Threat Detection & Forensics.",
  },
  {
    codename: "DuckyArenas — Shop & Bank Backend",
    description:
      "Academic team project. Individual contribution to Django backend components for the shop catalog, wallet transactions, purchase coordination, and idempotency. This entry describes my contribution, not the whole team project.",
    tags: ["Python", "Django", "Transactions", "Testing"],
    annotation: "Academic contribution. PR #87 merged; PR #122 remains a separate review item.",
    url: "https://github.com/Martret92/duckyarenas-team5/pull/87",
  },
];

const ARTICLES = [
  {
    date: "2026.08.01",
    title: "Automating SOC Reporting: Mapping technical findings to GDPR and ENS",
    time: "8 min read",
    tag: "Security Compliance",
    featured: true,
    url: "https://github.com/silvatechf/CyberReport-Pro",
    excerpt:
      "Field notes on building a Python automation engine that translates raw technical findings into executive PDF reports aligned with European regulations.",
  },
  {
    date: "2026.07.15",
    title: "Context-Aware SAST: Building CodeGuard AI with Gemini 2.0 Flash",
    time: "6 min read",
    tag: "AI & AppSec",
    url: "https://github.com/silvatechf/codeguard-ai",
  },
  {
    date: "2026.06.20",
    title: "Engineering an AppSec Scanner: Python AST, Loki, and CI/CD blocking gates",
    time: "7 min read",
    tag: "Secure Architecture",
    url: "https://github.com/silvatechf/AppSec-Scanner.git", 
  },
  {
    date: "2026.05.10",
    title: "SecOps Analytics: Normalizing Linux telemetry and Grafana SIEM dashboards",
    time: "5 min read",
    tag: "Detection Engineering",
    url: "https://github.com/silvatechf/network-security-analytics.git",
  },
];

const CERTIFICATIONS = [
  {
    name: "Networking Academy Learn-A-Thon",
    issuer: "Cisco Networking Academy",
    year: "2024",
    credentialUrl: "https://www.credly.com/badges/6b1b989b-7482-45a3-aa87-cb66b18277de/linked_in_profile",
  },
  {
    name: "Cloud Foundations - Training",
    issuer: "AWS Academy Graduate",
    year: "2025",
    credentialUrl: "https://www.credly.com/badges/90f2f428-f9fe-4f8d-9f06-5a0a87b05500/linked_in?t=t307sx",
  },
  {
    name: "Azure AI Fundamentals",
    issuer: "Microsoft Certified",
    year: "2026",
    credentialUrl: "https://www.credly.com/badges/fe2adb4c-f272-49fa-9c18-0227ccdce1a6/public_url",
  },
  {
    name: "Microsoft Defender for Cloud Security Operations",
    issuer: "Microsoft Security",
    year: "2026",
    credentialUrl: "https://www.credly.com/badges/d050d199-a77a-4bc2-aad5-00d7f37c0034/public_url",
  },
  {
    name: "Introducción a la IA generativa",
    issuer: "Microsoft",
    year: "2026",
    credentialUrl: "https://campus.fundacionesplai.org/badges/badge.php?hash=23dcf75cddbe68eeec2552c33acbd08b0b6c3c36",
  },
];

const CONTINUING_EDUCATION = [
  {
    name: "Ethical Hacking",
    issuer: "Labora Formación",
    year: "2026",
    category: "Security & Audit",
    subtitle: "Offensive Security & Vulnerability Assessment",
    skills: ["Penetration Testing", "AppSec", "Network Security", "Vulnerability Assessment", "Reconnaissance", "Exploitation"],
  },
  {
    name: "Object-Oriented Programming (OOP)",
    issuer: "CIEF",
    year: "2026",
    category: "Software Engineering",
    subtitle: "Software Architecture & Clean Code",
    skills: ["OOP", "Design Patterns", "Data Structures", "Python", "Data Mining", "Algorithms"],
  },
  {
    name: "IT Management",
    issuer: "UNIP",
    year: "2025",
    category: "IT Strategy & Governance",
    subtitle: "Systems Governance & Alignment",
    skills: ["IT Governance", "Service Management", "Strategy", "ITIL", "Project Management", "Risk Management"],
  },
];

const STACK = [
  { name: "Python", level: 10 },
  { name: "Linux Hardening & Kali", level: 9 },
  { name: "Cybersecurity Tooling (Nmap/Metasploit)", level: 9 },
  { name: "Docker / CI/CD", level: 8 },
  { name: "PostgreSQL / SQL", level: 8 },
  { name: "TypeScript / React", level: 7 },
];

/* -------------------------------------------------------------------- */
/*  UTILITIES & HOOKS                                                   */
/* -------------------------------------------------------------------- */

function block(level) {
  const filled = "█".repeat(level);
  const empty = "░".repeat(10 - level);
  return filled + empty;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } transition-all duration-[600ms] ease-entrance motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function randHex(length = 4) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * 16).toString(16).toUpperCase()
  ).join("");
}

function useLiveToken(intervalMs = 4500) {
  const [token, setToken] = useState(() => randHex());

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;
    const id = setInterval(() => setToken(randHex()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return token;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/* -------------------------------------------------------------------- */
/*  BOOT SEQUENCE                                                       */
/* -------------------------------------------------------------------- */

const BOOT_LINES = [
  "ESTABLISHING SECURE SESSION...",
  "VERIFYING SIGNATURE... OK",
  "LOADING DOSSIER :: FERNANDO SILVA",
  "ACCESS GRANTED",
];

function BootSequence({ onDone }) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [lineIndex, setLineIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      onDone();
      return;
    }
    if (lineIndex < BOOT_LINES.length) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 260);
      return () => clearTimeout(t);
    }
    const exit = setTimeout(() => setLeaving(true), 260);
    const done = setTimeout(onDone, 660);
    return () => {
      clearTimeout(exit);
      clearTimeout(done);
    };
  }, [lineIndex, onDone, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-bg-primary flex items-center justify-center transition-opacity duration-300 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="font-mono text-xs md:text-sm text-accent-tertiary space-y-2 w-[280px]">
        {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
          <p key={i} className="opacity-80">
            <span className="text-text-secondary">$</span> {line}
          </p>
        ))}
        {lineIndex < BOOT_LINES.length && (
          <span className="inline-block w-2 h-3 bg-accent-primary align-middle animate-blink" />
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  UI OVERLAYS & CONTROLS                                              */
/* -------------------------------------------------------------------- */

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-[2px] bg-transparent">
      <div
        className="h-full bg-accent-primary transition-[width] duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function CustomCursor() {
  const dotRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;
    setReady(true);

    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const target = e.target;
      setHoveringInteractive(!!target.closest("a, button, input, textarea"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!ready) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[90] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      <div
        className={`rounded-full border transition-all duration-150 ${
          hoveringInteractive
            ? "w-8 h-8 border-accent-primary bg-accent-primary/10"
            : "w-4 h-4 border-accent-primary/60"
        }`}
      />
    </div>
  );
}

const COMMANDS = [
  ...NAV_LINKS.map((l) => ({ label: l.label, hint: "Navigate", href: l.href })),
  { label: "Download Resume (PDF)", hint: "Document", href: LINKS.resume },
  { label: "View Code — GitHub", hint: "External", href: LINKS.github },
  { label: "Initiate Protocol — LinkedIn", hint: "External", href: LINKS.linkedin },
];

function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);

  const results = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && results[index]) {
        const target = results[index];
        if (target.href.startsWith("http")) {
          window.open(target.href, "_blank", "noopener,noreferrer");
        } else {
          window.location.hash = target.href;
        }
        onClose();
      }
    },
    [results, index, onClose]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[95] bg-bg-primary/70 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-lg bg-bg-tertiary border border-line rounded-sm shadow-glow overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
          <Search size={14} strokeWidth={1.5} className="text-text-secondary shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            placeholder="Search a section or action..."
            className="w-full bg-transparent outline-none text-sm text-text-primary placeholder:text-text-secondary font-mono"
          />
          <kbd className="font-mono text-[10px] text-text-secondary border border-line rounded-sm px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        <ul className="max-h-72 overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-text-secondary text-sm font-mono">
              No results.
            </li>
          )}
          {results.map((cmd, i) => (
            <li key={cmd.label}>
              <a
                href={cmd.href}
                target={cmd.href.startsWith("http") ? "_blank" : undefined}
                rel={cmd.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={onClose}
                onMouseEnter={() => setIndex(i)}
                className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-100 ${
                  i === index
                    ? "bg-accent-primary/10 text-accent-primary"
                    : "text-text-primary"
                }`}
              >
                <span>{cmd.label}</span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-text-secondary uppercase tracking-widest">
                    {cmd.hint}
                  </span>
                  {i === index && (
                    <CornerDownLeft size={12} strokeWidth={1.5} className="text-accent-primary" />
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ScrollHexRail() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setOffset(Math.round(window.scrollY));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hex = offset.toString(16).toUpperCase().padStart(6, "0");

  return (
    <div
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-[65] flex-col items-center gap-3 pointer-events-none"
      aria-hidden="true"
    >
      <span className="w-px h-14 bg-line" />
      <span
        className="font-mono text-[10px] text-text-secondary/50 tracking-widest"
        style={{ writingMode: "vertical-rl" }}
      >
        OFFSET 0x{hex}
      </span>
      <span className="w-px h-14 bg-line" />
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  NAVIGATION                                                          */
/* -------------------------------------------------------------------- */

function Nav({ activeSection, onOpenPalette }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-bg-primary/80 backdrop-blur-xl border-b border-line"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a
            href="#briefing"
            className="font-mono font-bold text-sm tracking-widest text-text-primary"
          >
            FS
          </a>

          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`text-xs uppercase tracking-widest transition-colors duration-200 ${
                      isActive
                        ? "text-accent-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPalette}
              className="hidden md:flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors duration-200 font-mono text-[11px] border border-line rounded-sm px-2.5 py-1.5"
              aria-label="Open command palette"
            >
              <Command size={12} strokeWidth={1.5} />
              <span>K</span>
            </button>

            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="md:hidden text-text-primary"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[60] bg-bg-primary md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="text-text-primary"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center gap-8 h-[70%]">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              className={`transition-all duration-300 ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${open ? i * 60 : 0}ms` }}
            >
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl uppercase tracking-wide text-text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------- */
/*  HERO                                                                */
/* -------------------------------------------------------------------- */

function Hero() {
  const token = useLiveToken();

  return (
    <section
      id="briefing"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 bg-mesh-void"
    >
      <div className="max-w-6xl mx-auto w-full">
        <Reveal delay={0}>
          <p className="font-mono text-xs tracking-widest text-text-secondary uppercase mb-6">
            Dossier 001 :: Unclassified
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="font-display font-bold uppercase text-text-primary text-glow leading-[0.95] tracking-wide text-[13vw] md:text-[6.5vw]">
            Fernando
            <br />
            Silva
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <div className="flex items-center gap-4 mt-8 mb-6 max-w-xl">
            <span className="h-px w-12 bg-accent-secondary shrink-0" />
            <p className="font-body text-text-secondary text-sm md:text-base">
              Junior Python Backend Developer focused on Application Security (AppSec). Based in
              Barcelona, I build and test backend features and security-focused tools.
            </p>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href={LINKS.resume}
              {...(LINKS.resume.endsWith(".pdf")
                ? { download: true }
                : { target: "_blank", rel: "noopener noreferrer" })}
              className="inline-flex items-center gap-2 justify-center rounded-sm border border-accent-primary text-accent-primary px-8 py-3 text-xs uppercase tracking-widest font-mono transition-all duration-200 hover:bg-accent-primary hover:text-bg-primary"
            >
              <Download size={13} strokeWidth={1.5} />
              Download Resume (PDF)
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 justify-center rounded-sm border border-transparent text-text-secondary px-8 py-3 text-xs uppercase tracking-widest font-mono transition-all duration-200 hover:text-text-primary"
            >
              <Github size={13} strokeWidth={1.5} />
              Inspect Code (GitHub)
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 justify-center rounded-sm border border-transparent text-text-secondary px-8 py-3 text-xs uppercase tracking-widest font-mono transition-all duration-200 hover:text-text-primary"
            >
              <Linkedin size={13} strokeWidth={1.5} />
              Initiate Protocol (LinkedIn)
            </a>
          </div>
        </Reveal>
      </div>

      <div className="hidden md:flex absolute bottom-10 right-10 items-center gap-2 font-mono text-[11px] text-accent-tertiary">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-tertiary animate-pulse-soft" />
        <span className="animate-pulse-soft">
          SYSTEM NODE BCN-01 :: TLS 1.3 :: AES-256-GCM :: {token}
        </span>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/*  ABOUT / DOSSIER                                                     */
/* -------------------------------------------------------------------- */

function SecureTerminal() {
  const fullCommand =
    "python auditor.py --target prod.internal --scan-config-files";
  const [typed, setTyped] = useState("");
  const [ref, visible] = useReveal();

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(fullCommand.slice(0, i));
      if (i >= fullCommand.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <div
      ref={ref}
      className="bg-bg-tertiary border border-line rounded-sm p-5 md:p-6 font-mono text-xs md:text-sm text-text-primary"
    >
      <div className="flex items-center gap-2 text-text-secondary mb-3">
        <TerminalIcon size={13} strokeWidth={1.5} />
        <span className="uppercase tracking-widest text-[10px]">
          Secure Terminal
        </span>
      </div>
      <p className="leading-relaxed break-all">
        <span className="text-accent-tertiary">$</span> {typed}
        <span className="inline-block w-[7px] h-[1em] bg-accent-primary align-middle ml-1 animate-blink motion-reduce:animate-none" />
      </p>
    </div>
  );
}

function DossierPhoto() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="w-full aspect-[4/5] rounded-sm border border-line relative overflow-hidden bg-bg-tertiary">
      {imgFailed && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 30% 20%, rgba(200,164,244,0.35) 0%, rgba(200,164,244,0) 55%), radial-gradient(90% 90% at 80% 70%, rgba(244,200,164,0.22) 0%, rgba(244,200,164,0) 55%), radial-gradient(100% 100% at 60% 100%, rgba(126,224,208,0.18) 0%, rgba(126,224,208,0) 55%), #0f0e13",
          }}
          aria-hidden="true"
        />
      )}

      {!imgFailed && (
        <>
          <img
            src="profile.jpeg"
            alt="Portrait of Fernando Silva"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
            onError={() => setImgFailed(true)}
          />
          <div
            className="absolute inset-0 mix-blend-color pointer-events-none"
            style={{ backgroundColor: "#c8a4f4" }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 60px 10px rgba(8,7,11,0.6)" }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}

function About() {
  return (
    <section id="dossier" className="px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 md:gap-16">
        <div className="md:col-span-3">
          <Reveal>
            <p className="font-mono text-xs tracking-widest text-accent-secondary uppercase mb-4">
              Dossier / About
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-8">
              I build backend software with security in mind.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5 text-text-secondary text-sm md:text-base leading-relaxed max-w-xl">
              <p>
                I'm a Python developer in Barcelona, building my path toward backend engineering and application security. I use Python and frameworks such as Django and FastAPI to explore APIs, business rules, data integrity, and security controls through practical projects.
              </p>
              <p>
                In my projects, I focus on making behavior explicit and testable: validating inputs, checking authorization boundaries, handling failure cases, and recording useful evidence. My security labs help me investigate defensive monitoring, static analysis, and authorized attack-surface assessment without presenting learning experiments as production systems.
              </p>
              <p>
                I'm continuing to strengthen my Python, object-oriented programming, testing, and secure coding skills. I document what I build, what the tests demonstrate, and what remains limited or unfinished. I'm looking for a junior team where I can contribute, learn through code review, and grow as an engineer.
              </p>
            </div>
          </Reveal>
          <Reveal delay={180} className="mt-10">
            <SecureTerminal />
          </Reveal>
        </div>

        <div className="md:col-span-2">
          <Reveal delay={100}>
            <DossierPhoto />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/*  OPERATIONS                                                          */
/* -------------------------------------------------------------------- */

function OperationCard({ op, index }) {
  return (
    <Reveal delay={index * 60}>
      <article
        id={op.url ? "duckyarenas-contribution" : undefined}
        className="group relative border border-line rounded-sm bg-bg-secondary p-8 h-full flex flex-col justify-between"
      >
        <div>
          <h3 className="font-display font-semibold text-xl text-text-primary mb-3">
            {op.url ? (
              <a href={op.url} target="_blank" rel="noreferrer" className="hover:text-accent-primary transition-colors">
                {op.codename} <ArrowUpRight size={14} className="inline" />
              </a>
            ) : (
              op.codename
            )}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            {op.description}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6">
            {op.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-widest text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="font-mono text-[11px] text-accent-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {op.annotation}
        </p>

        <span className="absolute bottom-0 left-0 h-px bg-accent-primary w-0 group-hover:w-full transition-all duration-500 ease-entrance" />
      </article>
    </Reveal>
  );
}

function Operations() {
  return (
    <section id="operations" className="px-6 md:px-10 py-24 md:py-32 bg-bg-secondary/40">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-accent-secondary uppercase mb-4">
            Operations / Projects
          </p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-12">
            Active Deployments & Systems
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {OPERATIONS.map((op, i) => (
            <OperationCard key={op.codename} op={op} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/*  INTEL — ARTICLES & NOTES                                            */
/* -------------------------------------------------------------------- */

function Intel() {
  return (
    <section id="intel" className="px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-accent-secondary uppercase mb-4">
            Intel / Publications
          </p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-12">
            Field Notes & Technical Writings
          </h2>
        </Reveal>

        <div className="space-y-4">
          {ARTICLES.map((art, i) => (
            <Reveal key={art.title} delay={i * 50}>
              <a
                href={art.url || "#"}
                className="group block p-6 border border-line rounded-sm bg-bg-secondary hover:border-accent-primary/40 transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-accent-tertiary">
                        {art.date}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary px-2 py-0.5 border border-line rounded-xs">
                        {art.tag}
                      </span>
                    </div>
                    <h3 className="font-display font-medium text-lg text-text-primary group-hover:text-accent-primary transition-colors">
                      {art.title}
                    </h3>
                    {art.excerpt && (
                      <p className="text-text-secondary text-sm max-w-2xl pt-1">
                        {art.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary shrink-0 font-mono text-xs">
                    <span>{art.time}</span>
                    <ArrowUpRight size={14} className="group-hover:text-accent-primary transition-colors" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/*  CREDENTIALS & EDUCATION                                             */
/* -------------------------------------------------------------------- */

function Credentials() {
  return (
    <section id="credentials" className="px-6 md:px-10 py-24 md:py-32 bg-bg-secondary/40">
      <div className="max-w-6xl mx-auto space-y-20">
        <div>
          <Reveal>
            <p className="font-mono text-xs tracking-widest text-accent-secondary uppercase mb-4">
              Credentials / Certifications
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-12">
              Verified Badges & Industry Certs
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <Reveal key={cert.name} delay={i * 50}>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 border border-line rounded-sm bg-bg-secondary hover:border-accent-primary/50 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <ShieldCheck size={18} className="text-accent-tertiary" />
                    <ArrowUpRight size={14} className="text-text-secondary group-hover:text-accent-primary transition-colors" />
                  </div>
                  <h3 className="font-display font-medium text-base text-text-primary mb-1 group-hover:text-accent-primary transition-colors">
                    {cert.name}
                  </h3>
                  <p className="font-mono text-xs text-text-secondary">
                    {cert.issuer} :: {cert.year}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <Reveal>
              <p className="font-mono text-xs tracking-widest text-accent-secondary uppercase mb-4">
                Specializations / Academic Path
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-10">
                Continuing Education
              </h2>
            </Reveal>

            <div className="space-y-6">
              {CONTINUING_EDUCATION.map((edu, i) => (
                <Reveal key={edu.name} delay={i * 60}>
                  <div className="p-6 border border-line rounded-sm bg-bg-tertiary hover:border-accent-secondary/40 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <BookOpen size={16} className="text-accent-secondary shrink-0" />
                        <h3 className="font-display font-semibold text-lg text-text-primary">
                          {edu.name}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-accent-tertiary shrink-0">
                        {edu.issuer} :: {edu.year}
                      </span>
                    </div>

                    {(edu.category || edu.subtitle) && (
                      <div className="ml-7 mb-4">
                        {edu.category && (
                          <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-accent-primary mb-1">
                            [{edu.category}]
                          </span>
                        )}
                        {edu.subtitle && (
                          <p className="text-text-secondary text-xs font-mono">
                            {edu.subtitle}
                          </p>
                        )}
                      </div>
                    )}

                    {edu.skills && edu.skills.length > 0 && (
                      <div className="ml-7 flex flex-wrap gap-2 pt-2 border-t border-line/50">
                        {edu.skills.map((skill) => (
                          <span
                            key={skill}
                            className="font-mono text-[10px] px-2 py-0.5 border border-line rounded-xs text-text-secondary bg-bg-secondary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal delay={60}>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-10">
                Capability Matrix
              </h2>
            </Reveal>
            <div className="space-y-4 font-mono text-xs md:text-sm">
              {STACK.map((s, i) => (
                <Reveal key={s.name} delay={100 + i * 60}>
                  <div className="flex items-center justify-between gap-4 border-t border-line py-3 last:border-b">
                    <span className="text-text-primary">{s.name}</span>
                    <span className="text-accent-primary tracking-tight">
                      {block(s.level)}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/*  CONTACT & TRANSMISSION FORM                                         */
/* -------------------------------------------------------------------- */

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Transmission failed. Please check your connection.");
      }
    } catch (error) {
      alert("Network error. Please try again or use direct email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="px-6 md:px-10 py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <Reveal>
            <p className="font-mono text-xs tracking-widest text-accent-secondary uppercase mb-4">
              Communication Protocol
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-6">
              Establish Connection
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 max-w-md">
              Available for technical consultations, DevSecOps architecture reviews, or penetration testing operations. Send a secure payload using the transmission interface or via direct PGP channels.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="space-y-4 font-mono text-xs">
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-secondary hover:text-accent-primary transition-colors p-3 border border-line rounded-sm bg-bg-secondary w-fit"
              >
                <Linkedin size={14} />
                <span>linkedin.com/in/fernando-silva-83b155a4</span>
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-secondary hover:text-accent-primary transition-colors p-3 border border-line rounded-sm bg-bg-secondary w-fit"
              >
                <Github size={14} />
                <span>github.com/silvatechf</span>
              </a>
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal delay={100}>
            <div className="bg-bg-tertiary border border-line p-8 rounded-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-accent-primary/10 border border-accent-primary flex items-center justify-center mx-auto text-accent-primary">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="font-display text-xl text-text-primary">
                    Transmission Sent
                  </h3>
                  <p className="font-mono text-xs text-text-secondary max-w-xs mx-auto">
                    Payload received and queued for analysis. Acknowledge back expected within 24h.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[11px] uppercase text-text-secondary">
                      Sender Identity (Name / Unit)
                    </label>
                    <input
                      name="name"
                      required
                      type="text"
                      placeholder="e.g. SOC Specialist"
                      className="w-full bg-bg-secondary border border-line rounded-sm px-4 py-2.5 text-sm text-text-primary focus:border-accent-primary outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-[11px] uppercase text-text-secondary">
                      Return Path (Email)
                    </label>
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="operator@domain.com"
                      className="w-full bg-bg-secondary border border-line rounded-sm px-4 py-2.5 text-sm text-text-primary focus:border-accent-primary outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-[11px] uppercase text-text-secondary">
                      Payload (Message Body)
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Enter operational briefing or inquiry details..."
                      className="w-full bg-bg-secondary border border-line rounded-sm px-4 py-2.5 text-sm text-text-primary focus:border-accent-primary outline-none font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-accent-primary text-bg-primary font-mono text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-accent-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <span>TRANSMITTING...</span>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>DISPATCH TRANSMISSION</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/*  SYSTEM FOOTER                                                       */
/* -------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-12 border-t border-line bg-bg-secondary">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-text-secondary">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent-tertiary" />
          <p>© {new Date().getFullYear()} Fernando Silva :: System Node BCN-01</p>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Lock size={12} className="text-accent-secondary" />
            <span>ENCRYPTED END-TO-END</span>
          </div>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            SOURCE
          </a>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------- */
/*  MAIN APP COMPONENT                                                  */
/* -------------------------------------------------------------------- */

export default function App() {
  const [booted, setBooted] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const activeSection = useActiveSection(NAV_LINKS.map((n) => n.href.slice(1)));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-body selection:bg-accent-primary/20 selection:text-accent-primary">
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <ScrollProgress />
      <CustomCursor />
      <ScrollHexRail />

      <Nav activeSection={activeSection} onOpenPalette={() => setPaletteOpen(true)} />

      <main>
        <Hero />
        <About />
        <Operations />
        <Intel />
        <Credentials />
        <Contact />
      </main>

      <Footer />

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}