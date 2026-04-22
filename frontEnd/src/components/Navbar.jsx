import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)

            // Determine active section
            const sections = navLinks.map(l => l.href.replace('#', ''))
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i])
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(sections[i])
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (href) => {
        setMobileOpen(false)
        const id = href.replace('#', '')
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm'
                    : 'bg-transparent'
                }`}
        >
            <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="#home"
                    onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
                    className="flex items-center gap-2 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                        <Code2 size={16} className="text-white" />
                    </div>
                    <span className="font-display font-bold text-slate-900 text-lg tracking-tight">
                        Marwan<span className="text-slate-400">.</span>
                    </span>
                </motion.a>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.replace('#', '')
                        return (
                            <li key={link.href}>
                                <button
                                    onClick={() => handleNavClick(link.href)}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                                            ? 'text-slate-900'
                                            : 'text-slate-500 hover:text-slate-900'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-slate-100 rounded-lg"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>

                {/* CTA */}
                <div className="hidden md:block">
                    <motion.a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                        className="px-5 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors duration-200"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Hire Me
                    </motion.a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
                    >
                        <ul className="px-6 py-4 flex flex-col gap-1">
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.href}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <button
                                        onClick={() => handleNavClick(link.href)}
                                        className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                </motion.li>
                            ))}
                            <motion.li
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                                className="pt-2"
                            >
                                <button
                                    onClick={() => handleNavClick('#contact')}
                                    className="w-full px-4 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg"
                                >
                                    Hire Me
                                </button>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
