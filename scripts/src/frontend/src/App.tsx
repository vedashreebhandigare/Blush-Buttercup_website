import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

// =====================================================
// TYPES
// =====================================================

// =====================================================
// SECTION FADE-IN HOOK
// =====================================================
function useFadeIn() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("section-visible");
                    obs.disconnect();
                }
            },
            { threshold: 0.08 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return ref;
}

// =====================================================
// SPARKLE COMPONENT
// =====================================================
function HeroSparkle({ style }: { style: React.CSSProperties }) {
    return (
        <span className="hero-sparkle" style={style}>
            ✦
        </span>
    );
}

// =====================================================
// NAVBAR
// =====================================================
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = ["Home", "Creations", "Signature", "Menu", "About", "Order"];

    const handleNav = (section: string) => {
        setMobileOpen(false);
        const id = section.toLowerCase();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <button
                        type="button"
                        className="font-parisienne text-3xl md:text-4xl"
                        style={{
                            color: "#D14D72",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                        }}
                        onClick={() =>
                            document
                                .getElementById("home")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        Blush & Buttercream
                    </button>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-6">
                        {links.slice(0, -1).map((link) => (
                            <button
                                type="button"
                                key={link}
                                onClick={() => handleNav(link)}
                                className="font-poppins text-sm font-medium transition-colors duration-200 hover:text-raspberry"
                                style={{
                                    color: "#3E2723",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                {link}
                            </button>
                        ))}
                        <button
                            type="button"
                            className="btn-raspberry text-sm"
                            onClick={() => handleNav("Order")}
                        >
                            Order Now
                        </button>
                    </div>

                    {/* Hamburger */}
                    <button
                        type="button"
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                    >
                        <span
                            className="block w-6 h-0.5 transition-all duration-300"
                            style={{
                                background: "#D14D72",
                                transform: mobileOpen
                                    ? "rotate(45deg) translate(4px, 4px)"
                                    : "none",
                            }}
                        />
                        <span
                            className="block w-6 h-0.5 transition-all duration-300"
                            style={{
                                background: "#D14D72",
                                opacity: mobileOpen ? 0 : 1,
                            }}
                        />
                        <span
                            className="block w-6 h-0.5 transition-all duration-300"
                            style={{
                                background: "#D14D72",
                                transform: mobileOpen
                                    ? "rotate(-45deg) translate(4px, -5px)"
                                    : "none",
                            }}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-y-0 right-0 w-72 z-[99] flex flex-col"
                        style={{
                            background: "rgba(255, 250, 246, 0.97)",
                            backdropFilter: "blur(20px)",
                            borderLeft: "1px solid rgba(248, 200, 220, 0.4)",
                            boxShadow: "-10px 0 40px rgba(209, 77, 114, 0.1)",
                        }}
                    >
                        <div className="flex justify-end p-6">
                            <button
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "1.5rem",
                                    color: "#D14D72",
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 px-8 pt-4">
                            {links.map((link) => (
                                <button
                                    type="button"
                                    key={link}
                                    onClick={() => handleNav(link)}
                                    className="font-poppins text-lg font-medium text-left py-3 border-b transition-colors duration-200 hover:text-raspberry"
                                    style={{
                                        color: "#3E2723",
                                        background: "none",
                                        border: "none",
                                        borderBottom: "1px solid rgba(248, 200, 220, 0.4)",
                                        cursor: "pointer",
                                    }}
                                >
                                    {link}
                                </button>
                            ))}
                            <button
                                type="button"
                                className="btn-raspberry mt-6 w-full"
                                onClick={() => handleNav("Order")}
                            >
                                Order Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// =====================================================
// HERO SECTION
// =====================================================
function HeroSection() {
    const cupcakeRef = useRef<HTMLImageElement>(null);

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        if (cupcakeRef.current) {
            const translateY = scrollY * 0.12;
            const translateX = scrollY * 0.06;
            cupcakeRef.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const sparkles = [
        { top: "15%", left: "8%", animationDelay: "0s", fontSize: "1.4rem" },
        { top: "25%", left: "85%", animationDelay: "0.8s", fontSize: "0.9rem" },
        { top: "70%", left: "6%", animationDelay: "1.4s", fontSize: "1rem" },
        { top: "80%", left: "88%", animationDelay: "0.3s", fontSize: "1.2rem" },
        { top: "45%", left: "92%", animationDelay: "1.8s", fontSize: "0.7rem" },
        { top: "60%", left: "3%", animationDelay: "2.2s", fontSize: "0.8rem" },
        { top: "12%", left: "50%", animationDelay: "1s", fontSize: "0.75rem" },
        { top: "88%", left: "45%", animationDelay: "0.5s", fontSize: "0.9rem" },
    ];

    return (
        <section
            id="home"
            className="hero-bg min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden"
        >
            {/* Sparkles */}
            {sparkles.map((s) => (
                <HeroSparkle key={`${s.top}-${s.left}`} style={s} />
            ))}

            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                    {/* Left Content */}
                    <motion.div
                        className="flex-1 max-w-xl text-center lg:text-left z-10"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                    >
                        <motion.h1
                            className="font-parisienne leading-tight mb-4"
                            style={{
                                fontSize: "clamp(3rem, 7vw, 7rem)",
                                color: "#3E2723",
                                lineHeight: 1.1,
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1 }}
                        >
                            Blush & Buttercream
                        </motion.h1>

                        <motion.p
                            className="font-poppins italic font-medium mb-4"
                            style={{
                                fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                                color: "#D14D72",
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            "Baked with Love, Frosted with Magic."
                        </motion.p>

                        <motion.p
                            className="font-poppins mb-8 leading-relaxed"
                            style={{
                                color: "#444",
                                fontSize: "1rem",
                                maxWidth: "430px",
                                margin: "0 auto 2rem",
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            Handcrafted in the spirit of Parisian elegance — each creation a
                            masterpiece of flavor, artistry, and pure joy. From intimate
                            celebrations to grand events, we bake your sweetest moments to
                            life.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            <button
                                type="button"
                                className="btn-gold"
                                onClick={() =>
                                    document
                                        .getElementById("order")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                            >
                                ✦ Order Now
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    document
                                        .getElementById("menu")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                                className="font-poppins font-medium underline underline-offset-4 transition-colors duration-200"
                                style={{
                                    color: "#3E2723",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "0.95rem",
                                    minHeight: "44px",
                                }}
                            >
                                Explore Menu →
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right — Cupcake */}
                    <motion.div
                        className="flex-1 flex justify-center items-center relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
                    >
                        {/* Glow ring */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                width: "70%",
                                paddingBottom: "70%",
                                background:
                                    "radial-gradient(circle, rgba(244, 166, 193, 0.4) 0%, rgba(248, 200, 220, 0.15) 60%, transparent 100%)",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -55%)",
                            }}
                        />
                        <img
                            ref={cupcakeRef}
                            src="/assets/generated/hero-cupcake.dim_600x600.png"
                            alt="Premium Cupcake"
                            className="hero-cupcake relative z-10"
                            style={{ width: "min(520px, 90vw)", maxWidth: "90vw" }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-indicator flex flex-col items-center gap-1">
                <span className="font-poppins text-xs" style={{ color: "#D14D72" }}>
                    Scroll
                </span>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D14D72"
                    strokeWidth="2"
                    aria-hidden="true"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>
        </section>
    );
}

// =====================================================
// CATEGORY CARD COMPONENT
// =====================================================
interface CategoryCardProps {
    name: string;
    image: string;
    delay?: number;
}

function CategoryCard({ name, image, delay = 0 }: CategoryCardProps) {
    return (
        <motion.div
            className="category-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            <div style={{ aspectRatio: "1", overflow: "hidden" }}>
                <img
                    src={image}
                    alt={name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }}
                    loading="lazy"
                />
            </div>

            {/* Gradient overlay for text legibility */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to top, rgba(255,245,228,0.85) 0%, rgba(255,255,255,0.4) 30%, transparent 100%)",
                }}
            />

            {/* Heart */}
            <span className="card-heart">❤️</span>

            {/* Sparkles */}
            <div className="sparkle-container">
                <span className="sparkle-item" style={{ left: "15%", top: "70%" }}>
                    ✦
                </span>
                <span className="sparkle-item" style={{ left: "30%", top: "60%" }}>
                    ✧
                </span>
                <span className="sparkle-item" style={{ left: "65%", top: "75%" }}>
                    ✦
                </span>
                <span className="sparkle-item" style={{ left: "80%", top: "65%" }}>
                    ✧
                </span>
            </div>

            {/* Name */}
            <div
                className="absolute bottom-0 left-0 right-0 p-4 text-center"
                style={{ position: "absolute" }}
            >
                <span className="font-parisienne text-2xl" style={{ color: "#3E2723" }}>
                    {name}
                </span>
            </div>
        </motion.div>
    );
}

// =====================================================
// CREATIONS SECTION
// =====================================================
function CreationsSection() {
    const ref = useFadeIn();

    const categories = [
        {
            name: "Wedding Cakes",
            image: "/assets/generated/wedding-cake.dim_400x400.jpg",
        },
        {
            name: "Birthday Cakes",
            image: "/assets/generated/birthday-cake.dim_400x400.jpg",
        },
        {
            name: "Cupcakes",
            image: "/assets/generated/cupcakes.dim_400x400.jpg",
        },
        {
            name: "Macarons",
            image: "/assets/generated/macarons.dim_400x400.jpg",
        },
        { name: "Donuts", image: "/assets/generated/donuts.dim_400x400.jpg" },
        {
            name: "Cheesecakes",
            image: "/assets/generated/cheesecake.dim_400x400.jpg",
        },
        {
            name: "Pastries",
            image: "/assets/generated/pastries.dim_400x400.jpg",
        },
        {
            name: "Brownies",
            image: "/assets/generated/brownies.dim_400x400.jpg",
        },
        {
            name: "Custom Cakes",
            image: "/assets/generated/custom-cake.dim_400x400.jpg",
        },
        {
            name: "Vegan Cakes",
            image: "/assets/generated/vegan-cake.dim_400x400.jpg",
        },
    ];

    return (
        <section
            id="creations"
            className="py-20 md:py-28"
            style={{ background: "#FFFAF6" }}
        >
            <div ref={ref} className="section-hidden max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-14">
                    <h2
                        className="section-title mb-3"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                    >
                        Our Delicious Creations
                    </h2>
                    <p
                        className="font-poppins italic"
                        style={{ color: "#D14D72", fontSize: "1.05rem" }}
                    >
                        Every bite tells a story of passion, craft, and pure indulgence
                    </p>
                    <div
                        className="mx-auto mt-4"
                        style={{
                            width: "80px",
                            height: "3px",
                            background: "linear-gradient(90deg, #F4A6C1, #D14D72, #D4AF37)",
                            borderRadius: "9999px",
                        }}
                    />
                </div>

                {/* Grid */}
                <div
                    className="grid gap-5"
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
                    }}
                >
                    {/* Desktop: 5 cols */}
                    <style>{`
            @media (min-width: 1024px) {
              #creations-grid { grid-template-columns: repeat(5, 1fr) !important; }
            }
            @media (min-width: 640px) and (max-width: 1023px) {
              #creations-grid { grid-template-columns: repeat(3, 1fr) !important; }
            }
            @media (min-width: 400px) and (max-width: 639px) {
              #creations-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
                    <div
                        id="creations-grid"
                        className="col-span-full grid gap-5"
                        style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
                    >
                        {categories.map((cat, i) => (
                            <CategoryCard
                                key={cat.name}
                                name={cat.name}
                                image={cat.image}
                                delay={i * 0.06}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// =====================================================
// SIGNATURE CARD COMPONENT
// =====================================================
interface SigCardProps {
    name: string;
    price: string;
    image: string;
    delay?: number;
}

function SigCard({ name, price, image, delay = 0 }: SigCardProps) {
    return (
        <motion.div
            className="sig-card"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
        >
            <img src={image} alt={name} loading="lazy" />
            <div className="sig-card-overlay" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-parisienne text-2xl text-white mb-1">{name}</h3>
                <span className="price-gold text-lg">{price}</span>
            </div>
        </motion.div>
    );
}

// =====================================================
// SIGNATURE SECTION
// =====================================================
function SignatureSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const ref = useFadeIn();

    const signature = [
        {
            name: "Strawberry Dream Cake",
            price: "₹949",
            image: "/assets/generated/strawberry-dream.dim_400x400.jpg",
        },
        {
            name: "Belgian Chocolate Truffle",
            price: "₹1,149",
            image: "/assets/generated/chocolate-truffle.dim_400x400.jpg",
        },
        {
            name: "Raspberry Rose Delight",
            price: "₹1,049",
            image: "/assets/generated/raspberry-rose.dim_400x400.jpg",
        },
        {
            name: "Vanilla Bean Classic",
            price: "₹849",
            image: "/assets/generated/vanilla-bean.dim_400x400.jpg",
        },
        {
            name: "Caramel Drip Fantasy",
            price: "₹999",
            image: "/assets/generated/caramel-drip.dim_400x400.jpg",
        },
        {
            name: "Pistachio Paradise",
            price: "₹1,099",
            image: "/assets/generated/pistachio-paradise.dim_400x400.jpg",
        },
    ];

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: dir === "right" ? 320 : -320,
            behavior: "smooth",
        });
    };

    return (
        <section
            id="signature"
            className="py-20 md:py-28"
            style={{
                background:
                    "linear-gradient(180deg, #FFF5E4 0%, #FDEBF4 50%, #F8C8DC 100%)",
            }}
        >
            <div ref={ref} className="section-hidden">
                {/* Header */}
                <div className="text-center mb-12 px-6">
                    <h2
                        className="section-title mb-3"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                    >
                        Signature Collection
                    </h2>
                    <p className="font-poppins italic" style={{ color: "#D14D72" }}>
                        Our most-adored, award-winning masterpieces
                    </p>
                    <div
                        className="mx-auto mt-4"
                        style={{
                            width: "80px",
                            height: "3px",
                            background: "linear-gradient(90deg, #D4AF37, #D14D72, #F4A6C1)",
                            borderRadius: "9999px",
                        }}
                    />
                </div>

                {/* Carousel + Nav Arrows */}
                <div className="relative px-12 md:px-20">
                    {/* Left Arrow */}
                    <button
                        type="button"
                        onClick={() => scroll("left")}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{
                            background: "rgba(255, 255, 255, 0.9)",
                            border: "1.5px solid rgba(248, 200, 220, 0.6)",
                            boxShadow: "0 4px 15px rgba(209, 77, 114, 0.15)",
                            cursor: "pointer",
                        }}
                        aria-label="Scroll left"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#D14D72"
                            strokeWidth="2"
                            aria-hidden="true"
                        >
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>

                    <div ref={scrollRef} className="carousel-container">
                        {signature.map((item, i) => (
                            <SigCard key={item.name} {...item} delay={i * 0.1} />
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        type="button"
                        onClick={() => scroll("right")}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{
                            background: "rgba(255, 255, 255, 0.9)",
                            border: "1.5px solid rgba(248, 200, 220, 0.6)",
                            boxShadow: "0 4px 15px rgba(209, 77, 114, 0.15)",
                            cursor: "pointer",
                        }}
                        aria-label="Scroll right"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#D14D72"
                            strokeWidth="2"
                            aria-hidden="true"
                        >
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}

// =====================================================
// ALL PRODUCTS / FULL MENU SECTION
// =====================================================
type MenuFilter = "All" | "Cakes" | "Cupcakes" | "Pastries" | "Special";

interface MenuProduct {
    name: string;
    description: string;
    price: string;
    image: string;
    category: MenuFilter;
}

const ALL_PRODUCTS: MenuProduct[] = [
    // Categories
    {
        name: "Wedding Cakes",
        description:
            "Tiered masterpieces adorned with hand-crafted sugar flowers for your big day.",
        price: "₹1,199",
        image: "/assets/generated/wedding-cake.dim_400x400.jpg",
        category: "Cakes",
    },
    {
        name: "Birthday Cakes",
        description:
            "Cheerful, vibrant cakes dressed in swirls and smiles to celebrate every age.",
        price: "₹949",
        image: "/assets/generated/birthday-cake.dim_400x400.jpg",
        category: "Cakes",
    },
    {
        name: "Cupcakes",
        description:
            "Bite-sized bliss with cloud-soft frosting in a dozen dreamy flavours.",
        price: "₹849",
        image: "/assets/generated/cupcakes.dim_400x400.jpg",
        category: "Cupcakes",
    },
    {
        name: "Macarons",
        description:
            "Delicate French shells with ganache centres — crisp outside, chewy inside.",
        price: "₹899",
        image: "/assets/generated/macarons.dim_400x400.jpg",
        category: "Pastries",
    },
    {
        name: "Donuts",
        description:
            "Glazed, sprinkled, or filled with custard — soft, pillowy, and utterly irresistible.",
        price: "₹829",
        image: "/assets/generated/donuts.dim_400x400.jpg",
        category: "Pastries",
    },
    {
        name: "Cheesecakes",
        description:
            "New York-style baked cheesecake with a buttery graham crust and berry compote.",
        price: "₹1,049",
        image: "/assets/generated/cheesecake.dim_400x400.jpg",
        category: "Cakes",
    },
    {
        name: "Pastries",
        description:
            "Golden, flaky croissants and buttery danishes fresh from the oven each morning.",
        price: "₹879",
        image: "/assets/generated/pastries.dim_400x400.jpg",
        category: "Pastries",
    },
    {
        name: "Brownies",
        description:
            "Dense, fudgy, crackle-topped brownies with pools of melted dark chocolate.",
        price: "₹819",
        image: "/assets/generated/brownies.dim_400x400.jpg",
        category: "Pastries",
    },
    {
        name: "Custom Theme Cakes",
        description:
            "Your imagination on a cake — themed, sculpted, and painted just for you.",
        price: "₹1,149",
        image: "/assets/generated/custom-cake.dim_400x400.jpg",
        category: "Special",
    },
    {
        name: "Vegan Cakes",
        description:
            "Plant-based indulgence without compromise — rich, moist, and full of flavour.",
        price: "₹989",
        image: "/assets/generated/vegan-cake.dim_400x400.jpg",
        category: "Special",
    },
    // Signature items
    {
        name: "Strawberry Dream Cake",
        description:
            "Light chiffon layered with fresh strawberry compote and whipped cream frosting.",
        price: "₹949",
        image: "/assets/generated/strawberry-dream.dim_400x400.jpg",
        category: "Special",
    },
    {
        name: "Belgian Chocolate Truffle",
        description:
            "Intense Belgian ganache between velvety sponge layers — a chocoholic's reverie.",
        price: "₹1,149",
        image: "/assets/generated/chocolate-truffle.dim_400x400.jpg",
        category: "Special",
    },
    {
        name: "Raspberry Rose Delight",
        description:
            "Rose-infused cream cheese frosting meets tart raspberry coulis on a soft sponge.",
        price: "₹1,049",
        image: "/assets/generated/raspberry-rose.dim_400x400.jpg",
        category: "Special",
    },
    {
        name: "Vanilla Bean Classic",
        description:
            "Pure Madagascar vanilla bean sponge with silky Swiss meringue buttercream.",
        price: "₹849",
        image: "/assets/generated/vanilla-bean.dim_400x400.jpg",
        category: "Cakes",
    },
    {
        name: "Caramel Drip Fantasy",
        description:
            "Salted caramel drip cascading over a four-layer butterscotch and toffee cake.",
        price: "₹999",
        image: "/assets/generated/caramel-drip.dim_400x400.jpg",
        category: "Special",
    },
    {
        name: "Pistachio Paradise",
        description:
            "Persian pistachio sponge with rosewater cream and crushed pistachio praline.",
        price: "₹1,099",
        image: "/assets/generated/pistachio-paradise.dim_400x400.jpg",
        category: "Special",
    },
];

const FILTER_TABS: MenuFilter[] = [
    "All",
    "Cakes",
    "Cupcakes",
    "Pastries",
    "Special",
];

function MenuProductCard({
    product,
    delay,
}: { product: MenuProduct; delay: number }) {
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        setAdded(true);
        toast.success(`${product.name} added to cart! 🎂`);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <motion.div
            className="menu-product-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay, ease: "easeOut" }}
        >
            {/* Image — 60% of card */}
            <div className="menu-card-img-wrap">
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="menu-card-img"
                />
                {/* hover sparkle */}
                <span className="menu-card-heart">❤️</span>
            </div>

            {/* Info — 40% of card */}
            <div className="menu-card-body">
                <h3
                    className="font-parisienne text-xl leading-tight mb-1"
                    style={{ color: "#3E2723" }}
                >
                    {product.name}
                </h3>
                <p
                    className="font-poppins text-xs leading-relaxed mb-3"
                    style={{ color: "#666", flex: 1 }}
                >
                    {product.description}
                </p>
                <div className="flex items-center justify-between gap-2 mt-auto">
                    <span className="price-gold text-base">{product.price}</span>
                    <button
                        type="button"
                        onClick={handleAdd}
                        className={`menu-add-btn ${added ? "added" : ""}`}
                    >
                        {added ? "✓ Added" : "+ Add"}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function FullMenuSection() {
    const ref = useFadeIn();
    const [activeFilter, setActiveFilter] = useState<MenuFilter>("All");

    const filtered =
        activeFilter === "All"
            ? ALL_PRODUCTS
            : ALL_PRODUCTS.filter((p) => p.category === activeFilter);

    return (
        <section
            id="menu"
            className="py-20 md:py-28"
            style={{
                background: "linear-gradient(180deg, #FFF5E4 0%, #FDEBF4 100%)",
            }}
        >
            <div ref={ref} className="section-hidden max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2
                        className="section-title mb-3"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                    >
                        Our Full Menu
                    </h2>
                    <p className="font-poppins italic" style={{ color: "#D14D72" }}>
                        Every sweet dream we bake, all in one place
                    </p>
                    <div
                        className="mx-auto mt-4"
                        style={{
                            width: "80px",
                            height: "3px",
                            background: "linear-gradient(90deg, #F4A6C1, #D14D72, #D4AF37)",
                            borderRadius: "9999px",
                        }}
                    />
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {FILTER_TABS.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveFilter(tab)}
                            className={`menu-filter-tab ${activeFilter === tab ? "active" : ""}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        className="menu-products-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {filtered.map((product, i) => (
                            <MenuProductCard
                                key={product.name}
                                product={product}
                                delay={i * 0.05}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

// =====================================================
// WHY CHOOSE US
// =====================================================
function WhySection() {
    const ref = useFadeIn();

    const features = [
        {
            icon: (
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D14D72"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    <path d="M12 6v6l4 2" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4" />
                    <path d="M7 8.5c1.5-2 3.5-3 5-3s3.5 1 5 3" />
                </svg>
            ),
            title: "Fresh Ingredients",
            description:
                "We source only the finest, freshest ingredients from local farms and premium suppliers daily.",
        },
        {
            icon: (
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D14D72"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
            ),
            title: "Custom Designs",
            description:
                "Your vision, our artistry. Every cake is a bespoke creation tailored to your dreams.",
        },
        {
            icon: (
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D14D72"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                    <rect x="1" y="3" width="7" height="18" rx="1" />
                </svg>
            ),
            title: "Same Day Delivery",
            description:
                "Order by noon and receive your fresh creation at your doorstep the very same day.",
        },
        {
            icon: (
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D14D72"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            ),
            title: "Handmade with Love",
            description:
                "Each pastry is crafted by hand with passion, precision, and a sprinkle of Parisian magic.",
        },
    ];

    return (
        <section
            id="about"
            className="why-bg py-20 md:py-28 relative overflow-hidden"
        >
            {/* Floating blobs */}
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`blob-shape blob-${i}`} />
            ))}

            <div
                ref={ref}
                className="section-hidden max-w-7xl mx-auto px-6 relative z-10"
            >
                {/* Header */}
                <div className="text-center mb-16">
                    <h2
                        className="section-title mb-3"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                    >
                        Why Choose Us
                    </h2>
                    <p className="font-poppins italic" style={{ color: "#D14D72" }}>
                        Where every sweet detail matters
                    </p>
                    <div
                        className="mx-auto mt-4"
                        style={{
                            width: "80px",
                            height: "3px",
                            background: "linear-gradient(90deg, #F4A6C1, #D14D72, #D4AF37)",
                            borderRadius: "9999px",
                        }}
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            className="text-center px-4"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                        >
                            <div className="feature-icon-ring">{feat.icon}</div>
                            <h3
                                className="font-poppins font-semibold text-lg mb-2"
                                style={{ color: "#3E2723" }}
                            >
                                {feat.title}
                            </h3>
                            <p
                                className="font-poppins text-sm leading-relaxed"
                                style={{ color: "#666" }}
                            >
                                {feat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// =====================================================
// ORDER / CONTACT SECTION
// =====================================================
function OrderSection() {
    const ref = useFadeIn();
    const { actor } = useActor();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (!actor) {
            toast.error("Connection not ready. Please try again.");
            return;
        }
        setIsSubmitting(true);
        try {
            await actor.submitInquiry(
                formData.name,
                formData.email,
                formData.message,
            );
            setSubmitted(true);
            setFormData({ name: "", email: "", message: "" });
            toast.success("Your inquiry has been sent! We'll be in touch soon. 🎂");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="order" className="order-bg py-20 md:py-28">
            <div ref={ref} className="section-hidden max-w-3xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2
                        className="section-title mb-3"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                    >
                        Place Your Order
                    </h2>
                    <p className="font-poppins italic" style={{ color: "#D14D72" }}>
                        Tell us about your dream creation
                    </p>
                    <div
                        className="mx-auto mt-4"
                        style={{
                            width: "80px",
                            height: "3px",
                            background: "linear-gradient(90deg, #D4AF37, #D14D72, #F4A6C1)",
                            borderRadius: "9999px",
                        }}
                    />
                </div>

                {/* Form Card */}
                <motion.div
                    className="glass-card rounded-3xl p-8 md:p-12"
                    style={{
                        background: "rgba(255, 255, 255, 0.6)",
                        boxShadow: "0 20px 60px rgba(209, 77, 114, 0.12)",
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    {submitted ? (
                        <motion.div
                            className="text-center py-8"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-5xl mb-4">🎂</div>
                            <h3
                                className="font-parisienne text-4xl mb-3"
                                style={{ color: "#D14D72" }}
                            >
                                Thank You!
                            </h3>
                            <p className="font-poppins text-lg" style={{ color: "#444" }}>
                                Your inquiry has been received. Our patisserie team will contact
                                you within 24 hours.
                            </p>
                            <button
                                type="button"
                                onClick={() => setSubmitted(false)}
                                className="btn-raspberry mt-6"
                            >
                                Send Another Inquiry
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="inquiry-name"
                                    className="font-poppins font-medium text-sm block mb-2"
                                    style={{ color: "#3E2723" }}
                                >
                                    Your Name
                                </label>
                                <input
                                    id="inquiry-name"
                                    type="text"
                                    className="patisserie-input"
                                    placeholder="Priya Sharma"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    autoComplete="name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="inquiry-email"
                                    className="font-poppins font-medium text-sm block mb-2"
                                    style={{ color: "#3E2723" }}
                                >
                                    Email Address
                                </label>
                                <input
                                    id="inquiry-email"
                                    type="email"
                                    className="patisserie-input"
                                    placeholder="priya@example.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                                    }
                                    autoComplete="email"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="inquiry-message"
                                    className="font-poppins font-medium text-sm block mb-2"
                                    style={{ color: "#3E2723" }}
                                >
                                    Your Order Details
                                </label>
                                <textarea
                                    id="inquiry-message"
                                    className="patisserie-input"
                                    placeholder="Tell us about your dream cake — occasion, flavors, design ideas, serving size..."
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            message: e.target.value,
                                        }))
                                    }
                                    style={{ resize: "vertical" }}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-raspberry w-full"
                                style={{ opacity: isSubmitting ? 0.75 : 1 }}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2 justify-center">
                                        <svg
                                            className="animate-spin w-4 h-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            aria-hidden="true"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                strokeDasharray="32"
                                                strokeDashoffset="8"
                                            />
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    "✦ Send My Inquiry"
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

// =====================================================
// FOOTER SPARKLES
// =====================================================
function FooterSparkles() {
    const sparkleData = [
        { left: "5%", animationDuration: "3.5s", animationDelay: "0s" },
        { left: "15%", animationDuration: "4s", animationDelay: "1s" },
        { left: "28%", animationDuration: "3s", animationDelay: "0.5s" },
        { left: "42%", animationDuration: "5s", animationDelay: "1.5s" },
        { left: "55%", animationDuration: "3.8s", animationDelay: "0.2s" },
        { left: "68%", animationDuration: "4.5s", animationDelay: "0.9s" },
        { left: "80%", animationDuration: "3.2s", animationDelay: "1.8s" },
        { left: "92%", animationDuration: "4.2s", animationDelay: "0.4s" },
        { left: "35%", animationDuration: "2.8s", animationDelay: "2.1s" },
        { left: "72%", animationDuration: "3.6s", animationDelay: "1.3s" },
    ];

    const sizes = [0.6, 0.9, 0.7, 1.1, 0.8, 0.65, 0.95, 0.75, 1.0, 0.85];

    return (
        <>
            {sparkleData.map((s, i) => (
                <span
                    key={s.left}
                    className="footer-sparkle"
                    style={{
                        left: s.left,
                        bottom: "10%",
                        animation: `footer-sparkle ${s.animationDuration} ease-out infinite`,
                        animationDelay: s.animationDelay,
                        fontSize: `${sizes[i] ?? 0.8}rem`,
                    }}
                >
                    ✦
                </span>
            ))}
        </>
    );
}

// =====================================================
// FOOTER
// =====================================================
function Footer() {
    const currentYear = new Date().getFullYear();
    const hostname =
        typeof window !== "undefined" ? window.location.hostname : "";

    const quickLinks = ["Home", "Creations", "Signature", "Menu", "Order"];

    const socials = [
        {
            name: "Instagram",
            href: "https://instagram.com",
            icon: (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
            ),
        },
        {
            name: "Facebook",
            href: "https://facebook.com",
            icon: (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
            ),
        },
        {
            name: "Pinterest",
            href: "https://pinterest.com",
            icon: (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
            ),
        },
        {
            name: "TikTok",
            href: "https://tiktok.com",
            icon: (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.15 8.15 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="footer-bg pt-16 pb-6 relative overflow-hidden">
            <FooterSparkles />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.3)" }}
                >
                    {/* Col 1: Logo */}
                    <div>
                        <h3
                            className="font-parisienne text-4xl mb-2"
                            style={{ color: "#3E2723" }}
                        >
                            Blush & Buttercream
                        </h3>
                        <p
                            className="font-poppins italic text-sm mb-4"
                            style={{ color: "#5A2E2E" }}
                        >
                            Baked with Love, Frosted with Magic. 🧁
                        </p>
                        <p
                            className="font-poppins text-sm leading-relaxed"
                            style={{ color: "#5A3030" }}
                        >
                            Mumbai's premium boutique bakery — where every creation is a work
                            of edible art crafted with heart.
                        </p>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div>
                        <h4
                            className="font-poppins font-semibold text-base mb-5"
                            style={{ color: "#3E2723" }}
                        >
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            document
                                                .getElementById(link.toLowerCase())
                                                ?.scrollIntoView({ behavior: "smooth" })
                                        }
                                        className="font-poppins text-sm transition-colors duration-200 hover:text-raspberry"
                                        style={{
                                            color: "#5A2E2E",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: 0,
                                        }}
                                    >
                                        ✦ {link}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Contact */}
                    <div>
                        <h4
                            className="font-poppins font-semibold text-base mb-5"
                            style={{ color: "#3E2723" }}
                        >
                            Visit Us
                        </h4>
                        <ul
                            className="space-y-3 font-poppins text-sm"
                            style={{ color: "#5A2E2E" }}
                        >
                            <li className="flex items-start gap-2">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="mt-0.5 flex-shrink-0"
                                    aria-hidden="true"
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>14, Linking Road, Bandra West, Mumbai – 400 050</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    aria-hidden="true"
                                >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.11 6.11l.95-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
                                </svg>
                                +91 98200 12345
                            </li>
                            <li className="flex items-center gap-2">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    aria-hidden="true"
                                >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                hello@blushandbuttercream.in
                            </li>
                        </ul>
                    </div>

                    {/* Col 4: Socials */}
                    <div>
                        <h4
                            className="font-poppins font-semibold text-base mb-5"
                            style={{ color: "#3E2723" }}
                        >
                            Follow the Magic
                        </h4>
                        <div className="flex gap-3 flex-wrap">
                            {socials.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-pink"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.5)",
                                        color: "#D14D72",
                                        border: "1px solid rgba(255, 255, 255, 0.6)",
                                    }}
                                    aria-label={s.name}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                        {/* Cupcake decoration */}
                        <div className="mt-6 text-4xl">🧁</div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-3">
                    <p
                        className="font-poppins text-xs text-center"
                        style={{ color: "#5A2E2E" }}
                    >
                        © {currentYear} Blush & Buttercream. All rights reserved.
                    </p>
                    <p
                        className="font-poppins text-xs text-center"
                        style={{ color: "#5A2E2E" }}
                    >
                        MADE BY {" "}
                        <span className="glitter-name">BuildMinds</span>
                    </p>
                    <span className="text-2xl">🧁</span>
                </div>
            </div>
        </footer>
    );
}

// =====================================================
// APP ROOT
// =====================================================
export default function App() {
    console.log("App: rendering started");
    return (
        <>
            <Toaster position="top-center" richColors />
            <Navbar />
            <main>
                <HeroSection />
                <CreationsSection />
                <SignatureSection />
                <FullMenuSection />
                <WhySection />
                <OrderSection />
            </main>
            <Footer />
        </>
    );
}
