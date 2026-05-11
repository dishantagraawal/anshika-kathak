"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Calendar,
  ArrowRight,
  Play,
  BookOpen,
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Globe2,
  Mic2,
  MonitorPlay,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

// Add your file as public/images/hero/hero.jpg (or change path/extension below)
const HERO_IMG = "/images/home.jpg";
const ABOUT_IMG = "/images/about.jpg";
const KATHAK_JHANKAAR_LOGO = "/images/kathakJhankaar.png";
/**
 * Gallery: five `images` per category — 3-column layout:
 * [0] left top, [1] left bottom, [2] center (tall, spans 2 rows), [3] right top, [4] right bottom.
 */
const GALLERY_CATEGORIES = [
  {
    id: "workshop",
    label: "Workshop",
    images: [
      "/images/gallery/workshops/workshopOne.jpg",
      "/images/gallery/workshops/workshopTwo.jpg",
      "/images/gallery/workshops/workshopThree.jpg",
      "/images/gallery/workshops/workshopFour.jpg",
      "/images/gallery/workshops/workshopFive.jpg",
    ],
  },
  {
    id: "media",
    label: "Media",
    images: [
      "/images/gallery/media/1.jpg",
      "/images/gallery/media/2.jpg",
      "/images/gallery/media/3.jpg",
      "/images/gallery/media/4.jpg",
      "/images/gallery/media/5.jpg",
    ],
  },
  {
    id: "theatre",
    label: "Theatre",
    images: [
      "/images/gallery/theatre/1.jpg",
      "/images/gallery/theatre/2.jpg",
      "/images/gallery/theatre/3.jpg",
      "/images/gallery/theatre/4.jpg",
      "/images/gallery/theatre/5.jpg",
    ],
  },
  {
    id: "disciple",
    label: "Disciple",
    images: [
      "/images/gallery/disciples/1.jpg",
      "/images/gallery/disciples/2.jpg",
      "/images/gallery/disciples/3.jpg",
      "/images/gallery/disciples/4.jpg",
      "/images/gallery/disciples/5.jpg",
    ],
  },
  {
    id: "exhibit",
    label: "Exhibits",
    images: [
      "/images/gallery/exhibits/1.jpg",
      "/images/gallery/exhibits/2.jpg",
      "/images/gallery/exhibits/3.jpg",
      "/images/gallery/exhibits/4.jpg",
      "/images/gallery/exhibits/5.jpg",
    ],
  },
];

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Performances", href: "#performances" },
  { label: "Kathak Jhankaar", href: "#kathak-jhankaar" },
  { label: "Gallery", href: "#gallery" },
  { label: "Videos", href: "#videos" },
  { label: "Contact", href: "#contact" },
];

/** Academy section — student / class imagery (reuse curated gallery assets) */
const JHANKAAR_STRIP_IMAGES = [
  { src: "/images/gallery/kathakJhankaar/1.jpg", alt: "Kathak Jhankaar" },
  { src: "/images/gallery/kathakJhankaar/2.jpg", alt: "Kathak Jhankaar" },
  { src: "/images/gallery/kathakJhankaar/3.jpg", alt: "Kathak Jhankaar" },
  { src: "/images/gallery/kathakJhankaar/4.jpg", alt: "Kathak Jhankaar" },
  { src: "/images/gallery/kathakJhankaar/5.jpg", alt: "Kathak Jhankaar" },
];

const JHANKAAR_FEATURES = [
  {
    title: "Online & Offline Classes",
    blurb:
      "Learn from wherever you are, or step into the studio—rhythm and correction travel both ways.",
    Icon: MonitorPlay,
  },
  {
    title: "Kathak, Semi-Classical, Bollywood & Zumba",
    blurb:
      "A curated palette of forms: pure Jaipur Gharana Kathak beside expressive semi-classical, filmy grace, and joyful movement.",
    Icon: Sparkles,
  },
  {
    title: "Certification & Exam Preparation",
    blurb:
      "Structured guidance for Prayag Sangeet Samiti, Allahabad, and allied examinations—with rigour and care.",
    Icon: GraduationCap,
  },
  {
    title: "Workshops & Lecture Demonstrations",
    blurb:
      "Immersive sessions for institutions, corporates, and festivals—demystifying taal, lay, and abhinaya.",
    Icon: Mic2,
  },
  {
    title: "Global Student Community",
    blurb:
      "Disciples and learners across continents, united by ghungroo, guru-shishya parampara, and shared riyaaz.",
    Icon: Globe2,
  },
];

const EVENTS = [
  {
    title: "Anshika Agrawal & ENSEMBLE",
    location: "Lok Kala Manch, New Delhi",
    date: "March 29, 2026",
    image: "/images/performanceOne.jpg",
    type: "Concert",
    details:
      "The Annual Evening of Kathak Jhanjhar marks the sixth year of celebrating dedication, rhythm, and classical artistry. Founded on 29th April 2020, Kathak Jhanjhar has grown into a vibrant space for nurturing talent and preserving tradition. This special evening commemorates six beautiful years of its journey. The event presents a pure live classical performance by the devoted disciples of Anshika Agrawal, showcasing grace, expression, and intricate footwork. Each presentation reflects disciplined training and deep-rooted passion for Kathak. Join us for an enchanting evening that celebrates culture, commitment, and the timeless beauty of Indian classical dance in its most authentic form.",
  },
  {
    title: "Anshika Agrawal & Live Accompanists",
    location: "Lata Mangeshkar Auditorium, Mumbai",
    date: "August 06, 2023",
    image: "/images/performanceThree.jpg",
    type: "Concert",
    details:
      "An enchanting evening of classical Kathak by Anshika Agrawal, presented with her live musicians, celebrates the depth and dynamism of the Jaipur Gharana. The recital features a powerful composition in Dhamar Taal (14 beats), where she demonstrates breathtaking speed, intricate footwork, and masterful command over rhythm. Her performance beautifully balances technical virtuosity with expressive grace. Accompanying her are distinguished musicians from Delhi, trained in the rich traditions of the Gangani lineage, whose nuanced understanding of Jaipur Gharana aesthetics elevates the presentation. Together, they create an immersive dialogue between dance and music, offering audiences an authentic, resonant, and unforgettable classical experience.",
  },
  {
    title: "Naval Kathak Utsav",
    location: "Triveni Kala Sangam, New Delhi",
    date: "December 03, 2019",
    image: "/images/performanceTwo.jpg",
    type: "Concert",
    details:
      "A classical Kathak presentation by Anshika Agrawal with her live musicians, this production artistically explores the beauty of the four seasons—spring, summer, monsoon, and winter—through rhythm, expression, and movement. Each segment reflects nature’s changing moods while seamlessly blending them with the depth of Kathak vocabulary. Rooted in the Jaipur Gharana tradition, the performance highlights powerful compositions known for intricate footwork, speed, and rhythmic complexity. Through dynamic choreography and expressive storytelling, Anshika brings seasonal transitions to life while showcasing the technical brilliance and purity of the Jaipur style, offering audiences a visually rich and musically immersive classical dance experience.",
  },
];

const VIDEOS = [
  {
    id: "z3AvqBFufDo",
    title:
      "Pure Classical Performance by Anshika Agrawal | Puru Kala Mahotsav, Mumbai Dadar",
  },
  {
    id: "Oh7lLRyL7A0",
    title: "Rasraj Trivat | Performed by Anshika Agrawal | Creative Talk",
  },
  {
    id: "AFEDLFRIXaI",
    title:
      "Interview of Anshika Agrawal about her dance journey in Aaj ka Sach Channel",
  },
];

function YoutubeThumbnail({ videoId, title }) {
  const [thumbSrc, setThumbSrc] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  );
  return (
    <Image
      src={thumbSrc}
      alt={title}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover transition-transform duration-700 group-hover:scale-110"
      loading="lazy"
      onError={() =>
        setThumbSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)
      }
    />
  );
}

const Ornament = () => (
  <svg
    viewBox="0 0 100 20"
    className="w-32 h-5 text-amber-500/70 mx-auto"
    fill="currentColor"
  >
    <circle cx="50" cy="10" r="3" />
    <path
      d="M 5 10 L 40 10 M 60 10 L 95 10"
      stroke="currentColor"
      strokeWidth="0.5"
    />
    <circle cx="5" cy="10" r="1.5" />
    <circle cx="95" cy="10" r="1.5" />
    <path
      d="M 42 10 Q 46 6 50 10 Q 54 14 58 10"
      stroke="currentColor"
      strokeWidth="0.5"
      fill="none"
    />
  </svg>
);

function EventCard({ ev }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!flipped) return;
    const onKey = (e) => {
      if (e.key === "Escape") setFlipped(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipped]);

  return (
    <article className="group h-full min-h-[45rem] lg:min-h-[39rem] [perspective:1100px]">
      <div
        className="relative h-full min-h-[32rem] w-full rounded-sm transition-transform duration-700 ease-out [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex min-h-[39rem] flex-col overflow-hidden rounded-sm border border-amber-500/20 bg-[#0c0604] [backface-visibility:hidden] [transform:translateZ(1px)]"
          aria-hidden={flipped}
        >
          <div className="relative aspect-[4/5] shrink-0 overflow-hidden">
            <img
              src={ev.image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0604] via-transparent to-transparent" />
            <span className="absolute left-4 top-4 bg-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0c0604]">
              {ev.type}
            </span>
          </div>
          <div className="card-elegant flex flex-1 flex-col p-6">
            <h3 className="mb-4 font-serif-display text-xl leading-tight text-amber-100">
              {ev.title}
            </h3>
            <div className="mb-2 flex items-start gap-2 text-sm text-amber-100/70">
              <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
              <span>{ev.date}</span>
            </div>
            <div className="mb-2 flex flex-1 items-start gap-2 text-sm text-amber-100/70">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
              <span>{ev.location}</span>
            </div>
            <button
              type="button"
              onClick={() => setFlipped(true)}
              className="group/btn mt-2 inline-flex items-center gap-2 text-sm uppercase tracking-wider text-amber-400 hover:text-amber-300"
            >
              More Info{" "}
              <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex h-full min-h-[42rem] flex-col overflow-y-auto rounded-sm border border-amber-500/30 bg-[#0c0604] p-6 [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(1px)]"
          aria-hidden={!flipped}
        >
          <span className="mb-4 inline-block w-fit bg-amber-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-400">
            {ev.type}
          </span>
          <h3 className="mb-4 font-serif-display text-2xl leading-tight text-gold-gradient">
            {ev.title}
          </h3>
          <div className="mb-4 space-y-2 text-sm text-amber-100/60">
            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
              <span>{ev.date}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
              <span>{ev.location}</span>
            </div>
          </div>
          <p className="flex-1 text-sm leading-relaxed text-amber-100/80 text-justify">
            {ev.details}
          </p>
          <button
            type="button"
            onClick={() => setFlipped(false)}
            className="group/btn mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-wider text-amber-400 hover:text-amber-300"
          >
            <ArrowRight className="h-3 w-3 rotate-180 transition-transform group-hover/btn:-translate-x-1" />
            Back
          </button>
        </div>
      </div>
    </article>
  );
}

const SectionHeading = ({ kicker, title, subtitle }) => (
  <div className="text-center mb-16">
    {kicker && (
      <p className="text-amber-500 uppercase tracking-[0.4em] text-xs mb-4 font-medium">
        {kicker}
      </p>
    )}
    <h2 className="font-serif-display text-4xl md:text-6xl text-gold-gradient mb-6 leading-tight">
      {title}
    </h2>
    <Ornament />
    {subtitle && (
      <p className="font-serif-elegant text-lg md:text-xl text-amber-100/70 mt-6 max-w-2xl mx-auto italic">
        {subtitle}
      </p>
    )}
  </div>
);

/** Scroll-triggered fade + lift; runs once when section enters view */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[780ms] ease-out will-change-transform ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function GhungrooBand({ className = "" }) {
  return (
    <div
      className={`flex justify-center gap-1.5 py-1 ${className}`}
      aria-hidden
    >
      {Array.from({ length: 11 }).map((_, i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 shrink-0 rounded-full border border-amber-500/45 bg-gradient-to-b from-amber-200/25 to-amber-900/40 shadow-[0_0_10px_rgba(212,160,82,0.12)]"
          style={{ opacity: 0.35 + (1 - Math.abs(i - 5) / 6) * 0.55 }}
        />
      ))}
    </div>
  );
}

function ClassicalRule() {
  return (
    <div
      className="mx-auto flex max-w-xl items-center justify-center gap-4 px-4 py-3 text-amber-600/45"
      aria-hidden
    >
      <div className="h-px min-w-[48px] flex-1 bg-gradient-to-r from-transparent via-amber-600/35 to-amber-600/20" />
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 shrink-0 text-amber-500/55"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
      >
        <path d="M16 4 L20 14 L30 16 L20 18 L16 28 L12 18 L2 16 L12 14 Z" />
        <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.25" />
      </svg>
      <div className="h-px min-w-[48px] flex-1 bg-gradient-to-l from-transparent via-amber-600/35 to-amber-600/20" />
    </div>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [galleryCategoryIndex, setGalleryCategoryIndex] = useState(0);
  const galleryCellRefs = useRef([]);
  const galleryStageRef = useRef(null);
  const galleryCollapsingRef = useRef(false);
  const gallerySpotlightRafRef = useRef(0);
  const [gallerySpotlightIndex, setGallerySpotlightIndex] = useState(null);
  const [galleryOverlayBox, setGalleryOverlayBox] = useState(null);

  const activeGallery = GALLERY_CATEGORIES[galleryCategoryIndex];

  const measureGalleryOverlay = useCallback((index) => {
    const stage = galleryStageRef.current;
    const cell = galleryCellRefs.current[index];
    if (!stage || !cell) return null;
    const sr = stage.getBoundingClientRect();
    const cr = cell.getBoundingClientRect();
    return {
      top: cr.top - sr.top,
      left: cr.left - sr.left,
      width: cr.width,
      height: cr.height,
    };
  }, []);

  const beginGallerySpotlight = useCallback(
    (index) => {
      galleryCollapsingRef.current = false;
      gallerySpotlightRafRef.current += 1;
      const rafGen = gallerySpotlightRafRef.current;
      const stage = galleryStageRef.current;
      if (!stage) return;
      const sr = stage.getBoundingClientRect();
      const small = measureGalleryOverlay(index);
      if (!small) return;

      const ob = galleryOverlayBox;
      const alreadyFull =
        gallerySpotlightIndex !== null &&
        ob &&
        Math.abs(ob.width - sr.width) < 3 &&
        Math.abs(ob.height - sr.height) < 3 &&
        Math.abs(ob.top) < 3 &&
        Math.abs(ob.left) < 3;

      if (alreadyFull) {
        setGallerySpotlightIndex(index);
        return;
      }

      setGallerySpotlightIndex(index);
      setGalleryOverlayBox({
        ...small,
        enableTransition: false,
        atFull: false,
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (rafGen !== gallerySpotlightRafRef.current) return;
          setGalleryOverlayBox({
            top: 0,
            left: 0,
            width: sr.width,
            height: sr.height,
            enableTransition: true,
            atFull: true,
          });
        });
      });
    },
    [galleryOverlayBox, gallerySpotlightIndex, measureGalleryOverlay]
  );

  const collapseGallerySpotlight = useCallback(() => {
    const idx = gallerySpotlightIndex;
    if (idx === null) return;
    gallerySpotlightRafRef.current += 1;
    const small = measureGalleryOverlay(idx);
    if (!small) {
      setGallerySpotlightIndex(null);
      setGalleryOverlayBox(null);
      return;
    }
    galleryCollapsingRef.current = true;
    setGalleryOverlayBox({ ...small, enableTransition: true, atFull: false });
  }, [gallerySpotlightIndex, measureGalleryOverlay]);

  const onGalleryOverlayTransitionEnd = useCallback((e) => {
    if (e.target !== e.currentTarget) return;
    if (!galleryCollapsingRef.current) return;
    if (e.propertyName !== "width" && e.propertyName !== "height") return;
    galleryCollapsingRef.current = false;
    setGallerySpotlightIndex(null);
    setGalleryOverlayBox(null);
  }, []);

  useEffect(() => {
    setGallerySpotlightIndex(null);
    setGalleryOverlayBox(null);
    galleryCollapsingRef.current = false;
    gallerySpotlightRafRef.current += 1;
  }, [galleryCategoryIndex]);
  const galleryGoPrev = () =>
    setGalleryCategoryIndex(
      (i) => (i - 1 + GALLERY_CATEGORIES.length) % GALLERY_CATEGORIES.length
    );
  const galleryGoNext = () =>
    setGalleryCategoryIndex((i) => (i + 1) % GALLERY_CATEGORIES.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setFeedback({
        type: "success",
        text: "Pranam! Your message has been received. We will respond soon.",
      });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0c0604]/95 backdrop-blur-md border-b border-amber-500/20 py-3" : "bg-transparent py-6"}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center font-serif-display text-[#0c0604] font-bold text-xl shadow-lg shadow-amber-500/30">
              A
            </div>
            <div>
              <div className="font-serif-display text-amber-100 text-lg leading-none">
                Anshika Agrawal
              </div>
              <div className="text-[10px] text-amber-500/70 tracking-[0.3em] uppercase mt-1">
                Kathak Maestro
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm tracking-wider uppercase text-amber-100/80 hover:text-amber-400 transition-colors relative group"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://www.facebook.com/share/18mw2H4Wiq/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              className="text-amber-100/70 hover:text-amber-400 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/kathak_jhankaar?igsh=YzFiYXRtbmFhNW51&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="text-amber-100/70 hover:text-amber-400 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@anshikakathak/videos"
              target="_blank"
              rel="noreferrer"
              className="text-amber-100/70 hover:text-amber-400 transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>

          <button
            className="lg:hidden text-amber-100"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {navOpen && (
          <div className="lg:hidden bg-[#0c0604]/98 border-t border-amber-500/20">
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setNavOpen(false)}
                  className="text-amber-100/80 hover:text-amber-400 uppercase tracking-wider text-sm py-2 border-b border-amber-500/10"
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMG}
            alt="Kathak"
            fill
            priority
            sizes="100vw"
            className="object-cover animate-slowZoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0604]/80 via-[#0c0604]/60 to-[#0c0604]" />
          <div className="absolute inset-0 bg-radial-gold" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <p className="text-amber-400 uppercase tracking-[0.6em] text-xs md:text-sm mb-6 animate-fadeUp">
            Jaipur Gharana • Kathak Virtuoso
          </p>
          <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-gold-gradient leading-[0.95] mb-8 animate-fadeUp">
            <span className="italic">Anshika Agrawal</span>
          </h1>
          <Ornament />
          <p className="font-serif-elegant text-xl md:text-3xl text-amber-100/90 italic mt-8 mb-12 animate-fadeUp">
            Where Tradition Meets Timeless Grace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeUp">
            <a
              href="#about"
              className="btn-gold px-8 py-4 rounded-sm uppercase text-sm tracking-wider inline-flex items-center justify-center gap-2"
            >
              Discover the Legacy <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#performances"
              className="btn-outline-gold px-8 py-4 rounded-sm uppercase text-sm tracking-wider inline-flex items-center justify-center gap-2"
            >
              Performances
            </a>
          </div>
        </div>

        <a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-400/80 animate-shimmer"
        >
          <ChevronDown className="w-8 h-8" />
        </a>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 maroon-gradient relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            kicker="The Maestro"
            title="Anshika Agrawal"
            subtitle="A celebrated Kathak virtuoso of the Jaipur Gharana"
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="relative ornamental-border">
              <img
                src={ABOUT_IMG}
                alt="Pt. Anshika Agrawal"
                className="w-full h-[650px] object-cover relative z-10"
              />
              <div className="absolute -inset-4 border border-amber-500/30 -z-0" />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-500 to-amber-700 text-[#0c0604] p-6 z-20 max-w-[200px]">
                <Award className="w-8 h-8 mb-2" />
                <p className="font-serif-display text-2xl leading-tight">
                  Doordarshan
                </p>
                <p className="text-xs uppercase tracking-wider mt-1">
                  Graded Artist
                </p>
              </div>
            </div>

            <div className="flex min-h-0 flex-col">
              <div className="h-[22rem] sm:h-[26rem] md:h-[28rem] shrink-0 overflow-y-auto overflow-x-hidden overscroll-y-contain pr-3 [scrollbar-width:thin] [scrollbar-color:rgba(212,160,82,0.45)_rgba(12,6,4,0.35)]">
                <p className="text-amber-100/75 text-justify leading-relaxed mb-6 first-letter:text-amber-400 first-letter:text-3xl first-letter:font-serif-display">
                  Anshika Agrawal is a dynamic Kathak exponent of the Jaipur
                  Gharana, celebrated for her breathtaking technique, intricate
                  footwork, and expressive abhinaya. Based in Mumbai, she is a
                  dedicated Kathak Guru and choreographer who performs widely at
                  national and international festivals, blending the purity of
                  her lineage with contemporary versatility.She has also
                  collaborated on choreographic projects with eminent industry
                  figures such as{" "}
                  <span className="text-amber-400">Ganesh Acharya</span> and{" "}
                  <span className="text-amber-400">Rekha Ji</span>.
                </p>
                <p className="text-amber-100/75 leading-relaxed mb-6 text-justify">
                  A <span className="text-amber-400">Doordarshan</span> New
                  Delhi Graded Artist and an empaneled artist with{" "}
                  <span className="text-amber-400">SPIC MACAY</span> under the
                  Workshop Demonstration (WD) module, she has earned recognition
                  as one of the promising artists of her generation. She was
                  honored as “Aligarh’s Dancing Superstar” at the age of
                  fourteen, and her choreography has reached global audiences
                  through digital platforms, including the “Toget You” app.
                </p>
                <p className="text-amber-100/75 leading-relaxed mb-6 text-justify">
                  Her training began at the age of four in Aligarh under the
                  guidance of Pt. Harish Gangani and Pt. Rajendra Gangani of the
                  Jaipur Gharana. She holds a Diploma in Kathak from Kathak
                  Kendra, New Delhi, completed a certificate course at Shri Ram
                  Bhartiya Kala Kendra, and earned Praveen and Visharad from
                  Prayag Sangeet Samiti, Allahabad, along with a Diploma in
                  Tabla while pursuing her B.A. from Delhi University.
                </p>
                <p className="text-amber-100/75 leading-relaxed mb-6 text-justify">
                  Anshika has performed at prestigious festivals such as Naval
                  Kathak Utsav,{" "}
                  <span className="text-amber-400">Taj Mahotsav</span>, Bharat
                  Parv, Pravasi Divas, International Geeta Festival, and Jaipur
                  Dance Festival. She has also been part of productions like the
                  Gangani Project, Tehri Lake Festival, and Santati Dance
                  Festival, and served as a lead dancer in Shriram Bhartiya Kala
                  Kendra’s ballets Ramayan, Meera, Krishna, and Durga.
                </p>
                <p className="text-amber-100/75 leading-relaxed pb-2 text-justify">
                  In 2020, she founded Kathak Jhankaar, offering global training
                  in Kathak and other dance forms. Through workshops,
                  lecture-demonstrations, and corporate choreography, she
                  continues to inspire and preserve the rich heritage of Kathak.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 mb-10">
                {[
                  { n: "25+", l: "Years on Stage" },
                  { n: "10+", l: "Countries Toured" },
                  { n: "200+", l: "Performances" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="text-center border border-amber-500/30 p-4"
                  >
                    <div className="font-serif-display text-3xl text-gold-gradient">
                      {s.n}
                    </div>
                    <div className="text-[9px] lg:text-xs uppercase tracking-wider text-amber-100/60 mt-2">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="btn-gold inline-flex items-center gap-2 px-8 py-3 rounded-sm uppercase text-sm tracking-wider w-[200px]"
              >
                Get in touch <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Performances */}
      <section
        id="performances"
        className="py-24 md:py-32 bg-[#0c0604] relative"
      >
        <div className="absolute inset-0 bg-radial-gold opacity-50" />
        <div className="container mx-auto px-6 relative">
          <SectionHeading
            kicker="Witness the Magic"
            title="Performances"
            subtitle="Experience the artistry of Kathak live on stage."
          />

          <div className="grid h-max gap-6 grid-cols-1 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:h-[49rem]">
            {EVENTS.map((ev, i) => (
              <EventCard key={i} ev={ev} />
            ))}
          </div>

          {/* <div className="text-center mt-12">
            <button className="btn-outline-gold px-8 py-3 rounded-sm uppercase text-sm tracking-wider">
              View All Events
            </button>
          </div> */}
        </div>
      </section>

      {/* KATHAK JHANKAAR — Online Academy */}
      <section
        id="kathak-jhankaar"
        className="relative scroll-mt-24 overflow-hidden py-24 md:scroll-mt-28 md:py-36"
      >
        <div className="absolute inset-0 maroon-gradient" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(212,160,82,0.85) 1px, transparent 0)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute inset-0 bg-radial-gold opacity-35" />

        <div className="container relative z-10 mx-auto max-w-6xl px-6">
          <Reveal>
            <GhungrooBand className="mb-6" />
            <ClassicalRule />
          </Reveal>

          <Reveal delay={90}>
            <div className="mt-1 text-center">
              <div className="mx-auto flex max-w-md justify-center md:mb-5">
                <Image
                  src={KATHAK_JHANKAAR_LOGO}
                  alt="Kathak Jhankaar — Online Kathak Academy"
                  width={340}
                  height={140}
                  className="mx-auto h-auto max-h-36 w-auto max-w-[min(280px,78vw)] object-contain md:max-h-44 md:max-w-[min(340px,70vw)]"
                  priority={true}
                />
              </div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.42em] text-amber-500/90">
                Jaipur Gharana lineage • Founded 2020
              </p>
              <h2 className="font-serif-display text-4xl leading-[1.1] text-gold-gradient md:text-5xl lg:text-[3.25rem]">
                Kathak Jhankaar
              </h2>
              <p className="mt-4 font-serif-elegant text-xl text-amber-200/80 md:text-2xl">
                — Kathak Academy —
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-12 max-w-3xl text-center font-serif-elegant text-lg italic leading-[1.75] text-amber-100/78 md:text-xl">
              Let the rhythm find you across oceans and time zones—where the
              Jaipur Gharana speaks through every bol, every chakkhar, every
              glance. Under the guidance of a devoted artist–guru, your riyaaz
              becomes a living thread in an unbroken chain of grace, discipline,
              and devotion.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <GhungrooBand className="my-12" />
          </Reveal>

          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {JHANKAAR_FEATURES.map((f, i) => {
              const Icon = f.Icon;
              return (
                <Reveal key={f.title} delay={80 + i * 55}>
                  <article className="group card-elegant flex h-full flex-col rounded-sm p-6 md:p-7">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/25 bg-amber-950/20 text-amber-400/95 transition-all duration-500 group-hover:border-amber-400/45 group-hover:shadow-[0_0_24px_rgba(212,160,82,0.12)]">
                      <Icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="font-serif-display text-lg leading-snug text-amber-50 md:text-xl">
                      {f.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-amber-100/65">
                      {f.blurb}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={140}>
            <div className="divider-ornament mx-auto my-14 text-amber-500/50">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400/70 shadow-[0_0_12px_rgba(212,160,82,0.35)]"
                aria-hidden
              />
            </div>
            <div className="flex flex-col items-center gap-5 text-center">
              <a
                href="#contact"
                className="btn-gold inline-flex max-w-full flex-wrap items-center justify-center gap-2 px-8 py-4 text-center text-xs uppercase tracking-wider sm:px-10 sm:text-sm"
              >
                Join Kathak Jhankaar
                <span className="font-light text-[#1a0a04]/45" aria-hidden>
                  |
                </span>
                Book a Trial Class
                <ArrowRight className="h-4 w-4 shrink-0" />
              </a>
              <p className="max-w-md font-serif-elegant text-sm italic text-amber-200/55">
                Write to us from the contact form with your experience level and
                preferred mode—we shall respond with care.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <GhungrooBand className="my-14" />
          </Reveal>

          <Reveal>
            <p className="mb-8 text-center text-[11px] uppercase tracking-[0.38em] text-amber-500/65">
              Moments from class & stage
            </p>
            <div className="flex gap-3 overflow-x-auto pb-3 pt-1 [scrollbar-color:rgba(212,160,82,0.35)_rgba(12,6,4,0.4)] [scrollbar-width:thin] md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:pb-0">
              {JHANKAAR_STRIP_IMAGES.map((im) => (
                <div
                  key={im.src}
                  className="group relative w-[min(72vw,220px)] shrink-0 overflow-hidden rounded-sm border border-amber-600/25 shadow-md md:w-auto"
                >
                  <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
                    <Image
                      src={im.src}
                      alt={im.alt}
                      className="h-full w-full object-cover transition-[transform,filter] duration-[650ms] ease-out will-change-transform group-hover:scale-[1.06] group-hover:brightness-[1.08]"
                      loading="lazy"
                      fill
                      sizes="(max-width: 768px) 72vw, 20vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0604]/75 via-[#0c0604]/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-55" />
                    <div className="absolute inset-x-3 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-amber-400/90 to-amber-600/40 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ClassicalRule />
            <GhungrooBand className="mt-10" />
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 md:py-32 maroon-gradient">
        <div className="container mx-auto px-6">
          <SectionHeading
            kicker="Moments of Grace"
            title="Gallery"
            subtitle="Glimpses from a lifetime devoted to Kathak"
          />

          <div className="mx-auto mb-10 flex max-w-5xl flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-3">
            <button
              type="button"
              onClick={galleryGoPrev}
              aria-label="Previous gallery category"
              className="flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-sm border border-amber-500/40 text-amber-400 transition-colors hover:border-amber-400 hover:bg-amber-500/10 md:self-auto"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div
              className="flex flex-1 flex-wrap justify-center gap-2"
              role="tablist"
              aria-label="Gallery categories"
            >
              {GALLERY_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={galleryCategoryIndex === idx}
                  onClick={() => setGalleryCategoryIndex(idx)}
                  className={`rounded-sm border px-4 py-2.5 text-center text-xs uppercase tracking-wider transition-all sm:text-sm ${
                    galleryCategoryIndex === idx
                      ? "border-amber-400 bg-amber-500/20 text-amber-100"
                      : "border-amber-500/30 text-amber-100/65 hover:border-amber-400/50 hover:text-amber-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={galleryGoNext}
              aria-label="Next gallery category"
              className="flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-sm border border-amber-500/40 text-amber-400 transition-colors hover:border-amber-400 hover:bg-amber-500/10 md:self-auto"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <p className="mb-6 text-center font-serif-elegant text-sm text-amber-200/90 md:hidden">
            {activeGallery.label}
          </p>

          {/* 3 cols × 2 rows: narrow | wide center (row-span 2) | narrow; mat + gutters; spotlight = FLIP overlay inside stage */}
          <div className="mx-auto w-full max-w-[min(94vw,900px)] border-[8px] border-amber-600/35 bg-[#140a0e] p-2.5 shadow-xl shadow-black/40 ring-1 ring-amber-900/25 sm:max-w-[min(92vw,998px)] sm:border-[10px] sm:p-4 md:max-w-[min(90vw,1100px)] md:p-5">
            <div
              ref={galleryStageRef}
              className="relative isolate overflow-hidden rounded-sm"
              onMouseLeave={collapseGallerySpotlight}
            >
              <div className="relative z-0 grid h-[min(66vh,525px)] w-full grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1fr)] gap-1.5 bg-[#140a0e] sm:h-[min(60vh,574px)] sm:gap-2 md:h-[min(72vh,699px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.85fr)_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] md:gap-2">
                {/* Mobile: stack center hero between two pairs; fixed outer h + fr rows so every category matches */}
                <div className="grid h-full min-h-0 grid-cols-2 gap-1.5 md:contents">
                  <div
                    ref={(el) => {
                      galleryCellRefs.current[0] = el;
                    }}
                    onMouseEnter={() => beginGallerySpotlight(0)}
                    className="relative z-[1] min-h-0 h-full w-full overflow-hidden md:col-start-1 md:row-start-1"
                  >
                    <Image
                      src={activeGallery.images[0]}
                      alt={`${activeGallery.label} — left`}
                      className={`h-full min-h-0 w-full object-cover transition-opacity duration-300 ease-in-out ${gallerySpotlightIndex === 0 ? "opacity-0" : "opacity-100"}`}
                      loading="lazy"
                      fill
                      sizes="(max-width: 768px) 46vw, 18vw"
                    />
                  </div>
                  <div
                    ref={(el) => {
                      galleryCellRefs.current[3] = el;
                    }}
                    onMouseEnter={() => beginGallerySpotlight(3)}
                    className="relative z-[1] min-h-0 h-full w-full overflow-hidden md:col-start-3 md:row-start-1"
                  >
                    <Image
                      src={activeGallery.images[3]}
                      alt={`${activeGallery.label} — right top`}
                      className={`h-full min-h-0 w-full object-cover transition-opacity duration-300 ease-in-out ${gallerySpotlightIndex === 3 ? "opacity-0" : "opacity-100"}`}
                      loading="lazy"
                      fill
                      sizes="(max-width: 768px) 46vw, 18vw"
                    />
                  </div>
                </div>

                <div
                  ref={(el) => {
                    galleryCellRefs.current[2] = el;
                  }}
                  onMouseEnter={() => beginGallerySpotlight(2)}
                  className="relative z-[1] min-h-0 h-full w-full overflow-hidden md:col-start-2 md:row-span-2 md:row-start-1"
                >
                  <Image
                    src={activeGallery.images[2]}
                    alt={`${activeGallery.label} — center`}
                    className={`h-full min-h-0 w-full object-cover object-center transition-opacity duration-300 ease-in-out ${gallerySpotlightIndex === 2 ? "opacity-0" : "opacity-100"}`}
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 100vw, 38vw"
                  />
                </div>

                <div className="grid h-full min-h-0 grid-cols-2 gap-1.5 md:contents">
                  <div
                    ref={(el) => {
                      galleryCellRefs.current[1] = el;
                    }}
                    onMouseEnter={() => beginGallerySpotlight(1)}
                    className="relative z-[1] min-h-0 h-full w-full overflow-hidden md:col-start-1 md:row-start-2"
                  >
                    <Image
                      src={activeGallery.images[1]}
                      alt={`${activeGallery.label} — left bottom`}
                      className={`h-full min-h-0 w-full object-cover transition-opacity duration-300 ease-in-out ${gallerySpotlightIndex === 1 ? "opacity-0" : "opacity-100"}`}
                      loading="lazy"
                      fill
                      sizes="(max-width: 768px) 46vw, 18vw"
                    />
                  </div>
                  <div
                    ref={(el) => {
                      galleryCellRefs.current[4] = el;
                    }}
                    onMouseEnter={() => beginGallerySpotlight(4)}
                    className="relative z-[1] min-h-0 h-full w-full overflow-hidden md:col-start-3 md:row-start-2"
                  >
                    <Image
                      src={activeGallery.images[4]}
                      alt={`${activeGallery.label} — right bottom`}
                      className={`h-full min-h-0 w-full object-cover transition-opacity duration-300 ease-in-out ${gallerySpotlightIndex === 4 ? "opacity-0" : "opacity-100"}`}
                      loading="lazy"
                      fill
                      sizes="(max-width: 768px) 46vw, 18vw"
                    />
                  </div>
                </div>
              </div>

              {gallerySpotlightIndex !== null && galleryOverlayBox && (
                <div
                  aria-hidden
                  className={`pointer-events-auto absolute z-[60] overflow-hidden rounded-sm bg-[#0c0604] shadow-2xl shadow-black/60 ring-1 ring-amber-400/30 ${
                    galleryOverlayBox.enableTransition
                      ? "transition-[top,left,width,height] duration-[450ms] ease-in-out"
                      : ""
                  }`}
                  style={{
                    top: galleryOverlayBox.top,
                    left: galleryOverlayBox.left,
                    width: galleryOverlayBox.width,
                    height: galleryOverlayBox.height,
                  }}
                  onTransitionEnd={onGalleryOverlayTransitionEnd}
                >
                  <Image
                    src={activeGallery.images[gallerySpotlightIndex]}
                    alt=""
                    className={`h-full w-full object-contain object-center transition-[filter] duration-[450ms] ease-in-out ${
                      galleryOverlayBox.atFull
                        ? "brightness-[1.06] contrast-[1.02]"
                        : "brightness-100 contrast-100"
                    }`}
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 94vw, min(90vw, 1100px)"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videos" className="py-24 md:py-32 maroon-gradient">
        <div className="container mx-auto px-6">
          <SectionHeading
            kicker="Watch & Listen"
            title="Videos & Interviews"
            subtitle="Performances and conversations with the maestro"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {VIDEOS.map((v, i) => (
              <div
                key={i}
                className="card-elegant overflow-hidden group cursor-pointer transition-all"
              >
                <div className="aspect-video relative bg-black overflow-hidden">
                  <YoutubeThumbnail videoId={v.id} title={v.title} />
                  <div className="absolute inset-0 bg-[#0c0604]/40 group-hover:bg-[#0c0604]/20 transition-colors flex items-center justify-center">
                    <a
                      href={`https://www.youtube.com/watch?v=${v.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-16 h-16 rounded-full bg-amber-500 text-[#0c0604] flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl"
                    >
                      <Play className="w-7 h-7 ml-1" fill="currentColor" />
                    </a>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif-display text-lg text-amber-100">
                    {v.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-32 bg-[#0c0604] relative">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container mx-auto px-6 relative">
          <SectionHeading
            kicker="Get In Touch"
            title="Connect With Us"
            subtitle="For inquiries, collaborations, and workshops"
          />

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="font-serif-display text-3xl text-amber-100 mb-6">
                Pranam!
              </h3>
              <p className="font-serif-elegant text-lg text-amber-100/80 italic mb-10 leading-relaxed">
                Feel free to send us a message for any suggestion or query. We
                look forward to connecting with admirers and students of Kathak
                around the world.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:rajendragangani@yahoo.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 border border-amber-500/40 flex items-center justify-center group-hover:bg-amber-500/10 transition-colors flex-shrink-0">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-amber-500/70 mb-1">
                      Email
                    </p>
                    <p className="text-amber-100">bookings@anshikakathak.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-amber-500/70 mb-1">
                      Studio
                    </p>
                    <p className="text-amber-100">Kathak Jhankaar</p>
                    <p className="text-amber-100/70 text-sm">
                      Kandiwali West, Mumbai, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <a
                    href="https://www.facebook.com/share/18mw2H4Wiq/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 border border-amber-500/40 hover:bg-amber-500 hover:text-[#0c0604] flex items-center justify-center text-amber-400 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/kathak_jhankaar?igsh=YzFiYXRtbmFhNW51&utm_source=qr"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 border border-amber-500/40 hover:bg-amber-500 hover:text-[#0c0604] flex items-center justify-center text-amber-400 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.youtube.com/@anshikakathak/videos"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 border border-amber-500/40 hover:bg-amber-500 hover:text-[#0c0604] flex items-center justify-center text-amber-400 transition-colors"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <form
              onSubmit={submit}
              className="card-elegant p-8 md:p-10 space-y-5"
            >
              <div>
                <label className="block text-xs uppercase tracking-widest text-amber-500/80 mb-2">
                  Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-amber-500/30 focus:border-amber-400 text-amber-100 py-2 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-amber-500/80 mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-amber-500/30 focus:border-amber-400 text-amber-100 py-2 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-amber-500/80 mb-2">
                  Contact Number
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-amber-500/30 focus:border-amber-400 text-amber-100 py-2 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-amber-500/80 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-amber-500/30 focus:border-amber-400 text-amber-100 py-2 outline-none transition-colors resize-none"
                />
              </div>
              <button
                disabled={sending}
                type="submit"
                className="btn-gold w-full py-4 rounded-sm uppercase text-sm tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
              {feedback && (
                <div
                  className={`text-sm p-3 ${feedback.type === "success" ? "text-amber-300 border border-amber-500/40 bg-amber-500/5" : "text-red-300 border border-red-500/40 bg-red-500/5"}`}
                >
                  {feedback.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#070302] border-t border-amber-500/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <Ornament />
            <p className="font-serif-display text-3xl text-gold-gradient mt-4">
              Anshika Agrawal
            </p>
            <p className="font-serif-elegant italic text-amber-100/60 mt-2">
              Where Tradition Meets Timeless Grace
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-amber-500/10">
            <p className="text-amber-100/50 text-sm">
              © {new Date().getFullYear()} Anshika Agrawal. All Rights Reserved.
            </p>
            <p className="text-amber-100/50 text-sm">
              Crafted with ❖ devotion to the art of Kathak
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
