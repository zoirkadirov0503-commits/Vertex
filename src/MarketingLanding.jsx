import { useState, useEffect, useRef, useCallback } from 'react'
import {
  TrendingUp,
  Users,
  Star,
  Check,
  ChevronDown,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Menu,
  X,
  Sparkles,
  Video,
  Clapperboard,
  Mic2,
  ListChecks,
  Rocket,
  Search,
} from 'lucide-react'
import {
  LOCALE_STORAGE_KEY,
  getCopy,
  getPlans,
  buildWhatsAppUrl,
  formatMoney,
} from './i18n.js'

const LOGO_SRC = '/vertex-logo.png'

const FEATURE_ICONS = [ListChecks, Video, Clapperboard, Mic2, Users, TrendingUp]
const STEP_ICONS = [Search, Clapperboard, Rocket]

function readSavedLocale() {
  try {
    const s = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (s === 'ru' || s === 'kk' || s === 'uz') return s
  } catch {
    /* ignore */
  }
  return null
}

function BrandLogo({ className = '' }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Vertex.media"
      width={180}
      height={72}
      className={`h-11 w-auto object-contain object-left md:h-12 ${className}`}
      decoding="async"
    />
  )
}

function useScrollPast(px) {
  const [past, setPast] = useState(false)
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > px)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [px])
  return past
}

function ScrollSection({ children, className = '', id, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section
      ref={ref}
      id={id}
      className={`reveal-section ${visible ? 'is-visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </section>
  )
}

function AnimatedStat({ end, suffix = '', prefix = '', decimals = 0 }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(true)
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    const duration = 2000
    const steps = 80
    const stepMs = duration / steps
    let step = 0
    const id = setInterval(() => {
      step += 1
      const t = step / steps
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(end * eased)
      if (step >= steps) {
        setDisplay(end)
        clearInterval(id)
      }
    }, stepMs)
    return () => clearInterval(id)
  }, [active, end])

  const text =
    decimals > 0
      ? display.toFixed(decimals)
      : String(Math.round(display))

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {text}
      {suffix}
    </span>
  )
}

const WHATSAPP_ORDER_BASE = 'https://wa.me/77056248557'

export default function MarketingLanding() {
  const [locale, setLocale] = useState(readSavedLocale)
  const [menuOpen, setMenuOpen] = useState(false)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState(null)
  const scrolled = useScrollPast(50)

  const copy = locale ? getCopy(locale) : null
  const pricingPlans = locale ? getPlans(locale) : []

  const pickLocale = useCallback((loc) => {
    setLocale(loc)
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, loc)
    } catch {
      /* ignore */
    }
    const L = getCopy(loc)
    document.documentElement.lang = L.htmlLang
    document.documentElement.dir = L.dir || 'ltr'
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const openOrderModal = useCallback(() => setOrderModalOpen(true), [])
  const closeOrderModal = useCallback(() => setOrderModalOpen(false), [])

  useEffect(() => {
    const lock = locale === null || menuOpen || orderModalOpen
    document.body.style.overflow = lock ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [locale, menuOpen, orderModalOpen])

  useEffect(() => {
    if (!locale) return
    const L = getCopy(locale)
    document.documentElement.lang = L.htmlLang
    document.documentElement.dir = L.dir || 'ltr'
  }, [locale])

  useEffect(() => {
    if (!orderModalOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeOrderModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [orderModalOpen, closeOrderModal])

  return (
    <>
      <style>{`
        .marketing-root {
          --bg-primary: #08080f;
          --accent-from: #e879f9;
          --accent-mid: #a855f7;
          --accent-to: #6366f1;
          --card-bg: rgba(255, 255, 255, 0.06);
          --border: rgba(255, 255, 255, 0.12);
          --glow: rgba(168, 85, 247, 0.45);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUpHero {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(24px, -18px) scale(1.05); }
          66% { transform: translate(-16px, 12px) scale(0.96); }
        }
        @keyframes blobFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-28px, 20px) scale(1.08); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.55; }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .marketing-root .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.55;
          animation: blobFloat 18s ease-in-out infinite;
          pointer-events: none;
        }
        .marketing-root .hero-blob-2 {
          animation: blobFloat2 22s ease-in-out infinite;
        }
        .marketing-root .hero-grid {
          animation: gridPulse 10s ease-in-out infinite;
        }
        .marketing-root .hero-anim-1 {
          animation: fadeInUpHero 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
        }
        .marketing-root .hero-anim-2 {
          animation: fadeInUpHero 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both;
        }
        .marketing-root .hero-anim-3 {
          animation: fadeInUpHero 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }
        .marketing-root .hero-anim-4 {
          animation: fadeInUpHero 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.42s both;
        }
        .marketing-root .reveal-section {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .marketing-root .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .marketing-root .reveal-section.is-visible .stagger-item {
          animation: fadeInUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .marketing-root .reveal-section.is-visible .stagger-item:nth-child(1) { animation-delay: 0.05s; }
        .marketing-root .reveal-section.is-visible .stagger-item:nth-child(2) { animation-delay: 0.12s; }
        .marketing-root .reveal-section.is-visible .stagger-item:nth-child(3) { animation-delay: 0.19s; }
        .marketing-root .reveal-section.is-visible .stagger-item:nth-child(4) { animation-delay: 0.26s; }
        .marketing-root .reveal-section.is-visible .stagger-item:nth-child(5) { animation-delay: 0.33s; }
        .marketing-root .reveal-section.is-visible .stagger-item:nth-child(6) { animation-delay: 0.4s; }
        .marketing-root .reveal-section.is-visible .stagger-item:nth-child(7) { animation-delay: 0.47s; }
        .marketing-root .reveal-section.is-visible .stagger-item:nth-child(8) { animation-delay: 0.54s; }
        .marketing-root .btn-primary {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .marketing-root .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 0 40px var(--glow), 0 12px 40px rgba(99, 102, 241, 0.35);
        }
        .marketing-root .btn-ghost {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .marketing-root .btn-ghost:hover {
          transform: scale(1.05);
          box-shadow: 0 0 24px rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.22);
        }
        .marketing-root .glass-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .marketing-root .glass-card:hover {
          transform: scale(1.03) translateY(-4px);
          border-color: rgba(232, 121, 249, 0.45);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45), 0 0 40px rgba(168, 85, 247, 0.15);
        }
        .marketing-root .glass-card-popular {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .marketing-root .glass-card-popular:hover {
          transform: scale(1.06) translateY(-6px);
          box-shadow: 0 24px 70px rgba(99, 102, 241, 0.25), 0 0 50px rgba(232, 121, 249, 0.2);
        }
        .marketing-root .faq-panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .marketing-root .faq-panel.open {
          max-height: 400px;
        }
        .marketing-root .drawer-enter {
          transform: translateX(100%);
          opacity: 0;
        }
        .marketing-root .drawer-enter-active {
          transform: translateX(0);
          opacity: 1;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
        }
        .marketing-root .text-gradient {
          background: linear-gradient(120deg, var(--accent-from), var(--accent-mid), var(--accent-to));
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 7s linear infinite;
        }
      `}</style>

      {locale === null ? (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050508] px-6">
          <p className="text-center text-2xl font-bold text-white md:text-3xl">
            Выберите язык
          </p>
          <p className="mt-3 text-center text-base text-white/65 md:text-lg">
            Тілді таңдаңыз · Tilni tanlang
          </p>
          <div className="mt-10 flex w-full max-w-sm flex-col gap-3">
            <button
              type="button"
              onClick={() => pickLocale('ru')}
              className="btn-primary min-h-[52px] rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-600 text-base font-semibold text-white shadow-lg"
            >
              Русский
            </button>
            <button
              type="button"
              onClick={() => pickLocale('kk')}
              className="min-h-[52px] rounded-xl border border-white/15 bg-white/5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-fuchsia-500/40 hover:bg-white/10"
            >
              Қазақша
            </button>
            <button
              type="button"
              onClick={() => pickLocale('uz')}
              className="min-h-[52px] rounded-xl border border-white/15 bg-white/5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-cyan-500/40 hover:bg-white/10"
            >
              O&apos;zbekcha
            </button>
          </div>
        </div>
      ) : (
      <div
        className="marketing-root min-h-screen text-white antialiased"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        {/* Nav */}
        <header
          className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
            scrolled
              ? 'border-b border-white/10 bg-[#08080f]/75 shadow-lg shadow-black/20 backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 md:px-6 lg:px-8">
            <a
              href="#top"
              className="flex min-h-[44px] items-center rounded-lg py-1 pr-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              onClick={closeMenu}
            >
              <BrandLogo />
            </a>

            <nav
              className="hidden items-center gap-8 text-sm font-medium text-white/80 lg:flex"
              aria-label={copy.navLabel}
            >
              {copy.nav.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="transition-colors hover:text-white"
                >
                  {copy.navLabels[l.key]}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
              {['ru', 'kk', 'uz'].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => pickLocale(code)}
                  className={`min-h-[36px] min-w-[40px] rounded-full px-2.5 text-xs font-bold transition-colors ${
                    locale === code
                      ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-600 text-white shadow-md'
                      : 'text-white/55 hover:text-white'
                  }`}
                  aria-pressed={locale === code}
                  aria-label={`${copy.langSwitch}: ${code}`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={openOrderModal}
                className="btn-primary hidden min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 lg:inline-flex"
              >
                {copy.ctaOrder}
              </button>
              <button
                type="button"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white lg:hidden"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? copy.menuClose : copy.menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          <div
            className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden ${
              menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={!menuOpen}
            onClick={closeMenu}
          />
          <div
            className={`fixed right-0 top-0 z-50 h-full w-[min(100%,320px)] border-l border-white/10 bg-[#0c0c14]/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out lg:hidden ${
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex h-[72px] items-center justify-between gap-3 border-b border-white/10 px-4">
              <a
                href="#top"
                className="flex shrink-0 items-center focus:outline-none focus:ring-2 focus:ring-cyan-500/40 rounded-lg"
                onClick={closeMenu}
              >
                <img
                  src={LOGO_SRC}
                  alt=""
                  width={140}
                  height={56}
                  className="h-10 w-auto object-contain object-left"
                  decoding="async"
                />
                <span className="sr-only">{copy.navHomeSr}</span>
              </a>
              <button
                type="button"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/15"
                onClick={closeMenu}
                aria-label={copy.close}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4" aria-label={copy.navMobile}>
              {copy.nav.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="min-h-[48px] rounded-xl px-4 py-3 text-base font-medium text-white/90 hover:bg-white/5"
                  onClick={closeMenu}
                >
                  {copy.navLabels[l.key]}
                </a>
              ))}
              <div className="mt-3 flex gap-2 px-1">
                {['ru', 'kk', 'uz'].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => pickLocale(code)}
                    className={`min-h-[44px] flex-1 rounded-lg text-xs font-bold ${
                      locale === code
                        ? 'bg-fuchsia-600 text-white'
                        : 'border border-white/15 bg-white/5 text-white/70'
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="btn-primary mt-4 flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-600 font-semibold"
                onClick={() => {
                  closeMenu()
                  openOrderModal()
                }}
              >
                {copy.ctaOrder}
              </button>
            </nav>
          </div>
        </header>

        <main id="top">
          {/* Hero */}
          <section className="relative overflow-hidden pt-[72px]">
            <div
              className="hero-grid pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '56px 56px',
              }}
            />
            <div
              className="hero-blob -left-32 top-24 h-80 w-80 bg-gradient-to-br from-fuchsia-600 to-violet-700"
              aria-hidden
            />
            <div
              className="hero-blob hero-blob-2 right-[-120px] top-40 h-96 w-96 bg-gradient-to-br from-indigo-600 to-cyan-600"
              aria-hidden
            />
            <div
              className="hero-blob bottom-[-80px] left-1/3 h-72 w-72 bg-gradient-to-tr from-rose-600/80 to-fuchsia-600/80"
              style={{ animationDelay: '-4s' }}
              aria-hidden
            />

            <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8 lg:py-32">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-fuchsia-200/90 backdrop-blur-md md:text-sm hero-anim-1">
                <Sparkles className="h-4 w-4 text-fuchsia-400" />
                {copy.heroBadge}
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl hero-anim-2">
                {copy.heroTitle1}{' '}
                <span className="text-gradient">{copy.heroTitleGrad}</span>
                <br className="hidden sm:block" /> {copy.heroTitle2}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg lg:text-xl hero-anim-3">
                {copy.heroLead}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center hero-anim-4">
                <a
                  href="#pricing"
                  className="btn-primary inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-600 px-8 text-base font-semibold shadow-xl shadow-violet-500/30"
                >
                  {copy.heroCtaPricing}
                </a>
                <a
                  href="#how"
                  className="btn-ghost inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 text-base font-semibold text-white/90 backdrop-blur-sm"
                >
                  {copy.heroCtaHow}
                </a>
              </div>
            </div>
          </section>

          {/* Features */}
          <ScrollSection id="features" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {copy.featuresTitle1}{' '}
                <span className="text-gradient">{copy.featuresTitleBrand}</span>
              </h2>
              <p className="mt-4 text-base text-white/60 md:text-lg">
                {copy.featuresSub}
              </p>
            </div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {copy.features.map((f, i) => {
                const FIcon = FEATURE_ICONS[i]
                return (
                <div
                  key={f.title}
                  className="stagger-item glass-card rounded-2xl p-6 md:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-indigo-500/20 ring-1 ring-white/10">
                    <FIcon className="h-6 w-6 text-fuchsia-300" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60 md:text-base">
                    {f.text}
                  </p>
                </div>
                )
              })}
            </div>
          </ScrollSection>

          {/* Stats */}
          <ScrollSection
            id="stats"
            className="relative border-y border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent py-16 md:py-24"
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/60 to-transparent"
              aria-hidden
            />
            <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {copy.stats.map((s, idx) => (
                  <div key={idx} className="stagger-item text-center">
                    <div className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                      <AnimatedStat end={s.end} suffix={s.suffix} decimals={s.decimals} />
                    </div>
                    <p className="mt-2 text-sm font-medium text-white/55 md:text-base">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
              aria-hidden
            />
          </ScrollSection>

          {/* How it works */}
          <ScrollSection id="how" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {copy.howTitle1} <span className="text-gradient">{copy.howTitleGrad}</span>
              </h2>
              <p className="mt-4 text-base text-white/60 md:text-lg">
                {copy.howSub}
              </p>
            </div>

            <div className="relative mt-16">
              {/* desktop connectors */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-0.5 lg:block"
                style={{
                  marginLeft: '12.5%',
                  marginRight: '12.5%',
                  background:
                    'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), rgba(99,102,241,0.5), transparent)',
                }}
                aria-hidden
              />

              <div className="flex flex-col gap-12 lg:flex-row lg:gap-6">
                {copy.steps.map((st, idx) => (
                  <div
                    key={idx}
                    className="stagger-item relative flex flex-1 flex-col items-center text-center"
                  >
                    {/* mobile vertical line */}
                    {idx < copy.steps.length - 1 && (
                      <div
                        className="absolute left-[28px] top-[56px] h-[calc(100%+3rem)] w-px bg-gradient-to-b from-fuchsia-500/50 to-transparent lg:hidden"
                        aria-hidden
                      />
                    )}
                    <div className="relative z-10 flex w-full flex-col items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-indigo-600 text-lg font-bold shadow-lg shadow-fuchsia-500/30 ring-4 ring-[#08080f]">
                        {idx + 1}
                      </div>
                      <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-fuchsia-300">
                        {(() => {
                          const StepIcon = STEP_ICONS[idx]
                          return <StepIcon className="h-6 w-6" strokeWidth={1.75} />
                        })()}
                      </div>
                      <h3 className="mt-5 text-lg font-semibold md:text-xl">{st.title}</h3>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60 md:text-base">
                        {st.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollSection>

          {/* Testimonials */}
          <ScrollSection className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {copy.testTitle1} <span className="text-gradient">{copy.testTitleGrad}</span>
                </h2>
                <p className="mt-3 max-w-xl text-base text-white/60 md:text-lg">
                  {copy.testSub}
                </p>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-current" aria-hidden />
                ))}
                <span className="ml-2 text-sm text-white/50">{copy.testNps}</span>
              </div>
            </div>
            <div className="mt-12 flex gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:overflow-visible lg:gap-6">
              {copy.testimonials.map((item) => (
                <article
                  key={item.name}
                  className="stagger-item glass-card min-w-[280px] shrink-0 rounded-2xl p-6 md:min-w-0 md:p-7"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${item.hue} text-sm font-bold text-white shadow-lg`}
                    >
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-white/50">{item.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
                    «{item.quote}»
                  </p>
                </article>
              ))}
            </div>
          </ScrollSection>

          {/* Pricing */}
          <ScrollSection
            id="pricing"
            className="border-t border-white/10 bg-white/[0.02] py-16 md:py-24"
          >
            <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {copy.pricingTitle1}{' '}
                  <span className="text-gradient">{copy.pricingTitleGrad}</span>
                </h2>
                <p className="mt-4 text-base text-white/60 md:text-lg">
                  {copy.pricingSub}
                </p>
              </div>

              <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {pricingPlans.map((p) => (
                  <div
                    key={p.id}
                    className={`stagger-item relative flex flex-col rounded-2xl p-6 md:p-8 ${
                      p.popular
                        ? 'glass-card-popular border-2 border-fuchsia-500/50 bg-gradient-to-b from-fuchsia-500/10 to-indigo-600/5 shadow-xl shadow-fuchsia-500/10'
                        : 'glass-card'
                    }`}
                  >
                    {p.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                        {copy.popular}
                      </span>
                    )}
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    <p className="mt-2 text-sm text-white/55">{p.desc}</p>
                    <div className="mt-6 min-h-[4.5rem]">
                      {p.custom ? (
                        <div>
                          <p className="text-3xl font-extrabold tracking-tight">
                            {copy.priceRequest}
                          </p>
                          <p className="mt-1 text-sm text-white/45">
                            {copy.priceCustomHint}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            {formatMoney(p.price)} ₸
                          </p>
                          <p className="mt-1 text-sm text-white/45">
                            {copy.packagePrice}
                          </p>
                        </div>
                      )}
                    </div>
                    <ul className="mt-8 flex flex-col gap-3 text-sm text-white/75">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <Check
                            className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                            strokeWidth={2.5}
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={buildWhatsAppUrl(p, locale)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-primary mt-10 inline-flex min-h-[48px] w-full items-center justify-center rounded-full text-center text-sm font-semibold ${
                        p.popular
                          ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-600 text-white shadow-lg shadow-violet-500/25'
                          : 'border border-white/15 bg-white/5 text-white'
                      }`}
                    >
                      {p.custom ? copy.btnWaDiscuss : copy.btnWa}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </ScrollSection>

          {/* FAQ */}
          <ScrollSection id="faq" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {copy.faqTitle1}{' '}
                <span className="text-gradient">{copy.faqTitleGrad}</span>
              </h2>
              <p className="mt-4 text-base text-white/60 md:text-lg">
                {copy.faqSub}
              </p>
            </div>
            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              {copy.faq.map((item, i) => {
                const open = faqOpen === i
                return (
                  <div
                    key={i}
                    className="stagger-item overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md"
                  >
                    <button
                      type="button"
                      className="flex min-h-[52px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold md:text-base"
                      onClick={() => setFaqOpen(open ? null : i)}
                      aria-expanded={open}
                    >
                      {item.q}
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-fuchsia-400 transition-transform duration-300 ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div className={`faq-panel px-5 ${open ? 'open' : ''}`}>
                      <p className="pb-5 text-sm leading-relaxed text-white/65 md:text-base">
                        {item.a}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollSection>

          <div className="mx-auto max-w-6xl px-4 pb-20 md:px-6 lg:px-8">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center backdrop-blur-md md:py-10">
              <p className="text-base text-white/70 md:text-lg">
                {copy.bottomHintBefore}{' '}
                <a
                  href={WHATSAPP_ORDER_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-cyan-400 underline decoration-cyan-400/40 underline-offset-4 hover:text-cyan-300"
                >
                  WhatsApp
                </a>
                {copy.bottomHintAfter}
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-[#050508] pb-10 pt-14">
          <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
              <div className="lg:col-span-2">
                <a
                  href="#top"
                  className="inline-flex focus:outline-none focus:ring-2 focus:ring-cyan-500/40 rounded-lg"
                >
                  <img
                    src={LOGO_SRC}
                    alt="Vertex.media"
                    width={220}
                    height={88}
                    className="h-16 w-auto object-contain object-left sm:h-[4.5rem]"
                    decoding="async"
                  />
                </a>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
                  {copy.footerAbout}
                </p>
                <div className="mt-6 flex gap-3">
                  {[
                    { Icon: Github, label: 'GitHub' },
                    { Icon: Twitter, label: 'Twitter' },
                    { Icon: Linkedin, label: 'LinkedIn' },
                    { Icon: Instagram, label: 'Instagram' },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-fuchsia-500/40 hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-fuchsia-300/90">
                  {copy.footerColServices}
                </p>
                <ul className="mt-4 space-y-3 text-sm text-white/60">
                  {copy.footerServices.map((x) => (
                    <li key={x}>
                      <a href="#features" className="hover:text-white">
                        {x}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-fuchsia-300/90">
                  {copy.footerColCompany}
                </p>
                <ul className="mt-4 space-y-3 text-sm text-white/60">
                  {copy.footerCompany.map((x, i) => (
                    <li key={x}>
                      {i === copy.footerCompany.length - 1 ? (
                        <a
                          href={WHATSAPP_ORDER_BASE}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white"
                        >
                          {x}
                        </a>
                      ) : (
                        <a href="#top" className="hover:text-white">
                          {x}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-fuchsia-300/90">
                  {copy.footerColResources}
                </p>
                <ul className="mt-4 space-y-3 text-sm text-white/60">
                  {copy.footerResources.map((x) => (
                    <li key={x}>
                      <a href="#faq" className="hover:text-white">
                        {x}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-fuchsia-300/90">
                  {copy.footerColLegal}
                </p>
                <ul className="mt-4 space-y-3 text-sm text-white/60">
                  {copy.footerLegal.map((x) => (
                    <li key={x}>
                      <a href="#" className="hover:text-white">
                        {x}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
              <p>
                © {new Date().getFullYear()} Vertex Media. {copy.footerCopyright}
              </p>
              <p className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-fuchsia-400" />
                {copy.footerTagline}
              </p>
            </div>
          </div>
        </footer>

        {orderModalOpen ? (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              onClick={closeOrderModal}
              aria-label={copy.orderModalCloseOverlay}
            />
            <div className="relative z-10 flex max-h-[min(92vh,880px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#08080f] shadow-2xl shadow-black/50">
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 p-5 md:p-6">
                <div>
                  <h2
                    id="order-modal-title"
                    className="text-xl font-bold tracking-tight md:text-2xl"
                  >
                    {copy.orderModalTitle}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-white/55 md:text-base">
                    {copy.orderModalSub}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeOrderModal}
                  className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10"
                  aria-label={copy.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="min-h-0 overflow-y-auto p-5 md:p-6">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {pricingPlans.map((p) => (
                    <div
                      key={`modal-${p.id}`}
                      className={`flex flex-col rounded-xl border p-4 backdrop-blur-md ${
                        p.popular
                          ? 'border-fuchsia-500/50 bg-gradient-to-b from-fuchsia-500/10 to-indigo-600/5'
                          : 'border-white/10 bg-white/[0.04]'
                      }`}
                    >
                      {p.popular ? (
                        <span className="mb-2 inline-block w-fit rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          {copy.popular}
                        </span>
                      ) : null}
                      <h3 className="text-lg font-bold">{p.name}</h3>
                      <p className="mt-1 text-xs text-white/50">{p.desc}</p>
                      <div className="mt-3">
                        {p.custom ? (
                          <p className="text-lg font-extrabold">
                            {copy.priceRequest}
                          </p>
                        ) : (
                          <p className="text-lg font-extrabold">
                            {formatMoney(p.price)} ₸
                          </p>
                        )}
                      </div>
                      <ul className="mt-3 flex flex-1 flex-col gap-2 text-xs text-white/65">
                        {p.features.slice(0, 4).map((f) => (
                          <li key={f} className="flex gap-2">
                            <Check
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400"
                              strokeWidth={2.5}
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={buildWhatsAppUrl(p, locale)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeOrderModal}
                        className={`btn-primary mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-full text-center text-xs font-semibold sm:text-sm ${
                          p.popular
                            ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-600 text-white shadow-lg'
                            : 'border border-white/15 bg-white/10 text-white'
                        }`}
                      >
                        {copy.orderModalOrder}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      )}
    </>
  )
}
