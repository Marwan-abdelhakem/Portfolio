import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react'
import profileImg from '../assets/marwan.jpeg'

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.11,
            delayChildren: 0.25,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
}

const imageVariants = {
    hidden: { opacity: 0, scale: 0.88, x: 40 },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
    },
}

// Gentle continuous float on the Y axis
const floatTransition = {
    y: {
        duration: 4,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
    },
}

// ─── Social Links ─────────────────────────────────────────────────────────────

const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:marwan@example.com', label: 'Email' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
    const scrollTo = (id) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden bg-white"
        >
            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(#0F172A 1px, transparent 1px),
            linear-gradient(90deg, #0F172A 1px, transparent 1px)
          `,
                    backgroundSize: '64px 64px',
                }}
            />

            {/* Radial glow — shifts right on desktop to sit behind the image */}
            <div className="absolute top-1/2 right-0 md:right-1/4 -translate-y-1/2 w-[520px] h-[520px] bg-slate-100 rounded-full blur-3xl opacity-70 pointer-events-none" />

            {/* ── Main content ── */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-14 md:gap-10">

                    {/* ── LEFT — Text ── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center md:items-start gap-6 text-center md:text-left flex-1"
                    >
                        {/* Badge */}
                        <motion.div variants={itemVariants}>
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-600">
                                <Sparkles size={14} className="text-slate-400" />
                                Available for new opportunities
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.div variants={itemVariants} className="space-y-1">
                            <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">
                                Hello, I&apos;m
                            </p>
                            <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-slate-900">
                                Marwan
                                <br />
                                <span className="text-gradient">Abdelhakem</span>
                            </h1>
                        </motion.div>

                        {/* Title */}
                        <motion.div variants={itemVariants}>
                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <div className="h-px w-10 bg-slate-300" />
                                <p className="text-lg md:text-xl font-medium text-slate-500 tracking-wide">
                                    Full Stack Developer
                                </p>
                                <div className="h-px w-10 bg-slate-300" />
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="max-w-md text-slate-500 text-base md:text-lg leading-relaxed"
                        >
                            I craft clean, performant web applications — from pixel-perfect
                            frontends to robust backend systems.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center gap-3 pt-1"
                        >
                            <motion.button
                                onClick={() => scrollTo('projects')}
                                className="px-7 py-3.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-700 transition-colors duration-200 text-sm w-full sm:w-auto"
                                whileHover={{ scale: 1.03, y: -1 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                View My Work
                            </motion.button>
                            <motion.button
                                onClick={() => scrollTo('contact')}
                                className="px-7 py-3.5 bg-white text-slate-900 font-medium rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 text-sm w-full sm:w-auto"
                                whileHover={{ scale: 1.03, y: -1 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Get In Touch
                            </motion.button>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div variants={itemVariants} className="flex items-center gap-2.5 pt-1">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── RIGHT — Profile Image ── */}
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex-shrink-0 flex items-center justify-center"
                    >
                        {/* Floating wrapper */}
                        <motion.div
                            animate={{ y: [0, -14, 0] }}
                            transition={floatTransition}
                            className="relative"
                        >
                            {/* ── Decorative back layer ── */}
                            {/* Rotated square accent */}
                            <div
                                className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-slate-100 border border-slate-200"
                                style={{ transform: 'rotate(12deg) translate(12px, 12px)' }}
                            />
                            {/* Dot-grid accent */}
                            <div
                                className="absolute -z-10 -bottom-4 -right-4 w-32 h-32 opacity-30"
                                style={{
                                    backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)',
                                    backgroundSize: '10px 10px',
                                }}
                            />
                            {/* Soft glow ring */}
                            <div className="absolute -z-10 inset-0 rounded-3xl bg-slate-200 blur-2xl opacity-40 scale-110" />

                            {/* ── Image frame ── */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
                                <img
                                    src={profileImg}
                                    alt="Marwan Abdelhakem — Full Stack Developer"
                                    className="w-full h-full object-cover object-center"
                                    draggable={false}
                                />
                            </div>

                            {/* ── Floating badge — experience ── */}


                            {/* ── Floating badge — stack ── */}
                            <motion.div
                                className="absolute -top-4 -right-6 bg-white border border-slate-100 rounded-2xl px-4 py-2.5 shadow-lg"
                                initial={{ opacity: 0, y: -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <p className="text-xs font-semibold text-slate-900">Full Stack</p>
                                <p className="text-xs text-slate-400">React · Node.js</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            {/* Scroll indicator */}
            <motion.button
                onClick={() => scrollTo('about')}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                aria-label="Scroll down"
            >
                <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ArrowDown size={16} />
                </motion.div>
            </motion.button>
        </section>
    )
}
