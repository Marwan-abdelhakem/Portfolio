import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight, MessageSquare } from 'lucide-react'

const contactLinks = [
    {
        icon: Mail,
        label: 'Email',
        value: 'marwanabdelhakem@gmail.com',
        href: 'mailto:marwanabdelhakem@gmail.com',
        description: 'Best for project inquiries',
    },
    {
        icon: Github,
        label: 'GitHub',
        value: 'github.com/marwan',
        href: 'https://github.com',
        description: 'Check out my code',
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        value: 'linkedin.com/in/marwan',
        href: 'https://linkedin.com',
        description: 'Let\'s connect professionally',
    },
]

function FadeIn({ children, delay = 0 }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    )
}

export default function Contact() {
    return (
        <section id="contact" className="py-28 bg-slate-50">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <FadeIn>
                    <div className="text-center mb-16">
                        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-3">
                            Contact
                        </p>
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 tracking-tight">
                            Let&apos;s work together
                        </h2>
                        <p className="mt-4 text-slate-500 max-w-md mx-auto">
                            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
                        </p>
                    </div>
                </FadeIn>

                <div className="max-w-3xl mx-auto">
                    {/* CTA Card */}
                    <FadeIn delay={0.1}>
                        <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-10 md:p-14 text-center mb-8">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <MessageSquare size={24} className="text-white" />
                                </div>
                                <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
                                    Open to opportunities
                                </h3>
                                <p className="text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">
                                    Whether it&apos;s a full-time role, freelance project, or just a conversation —
                                    my inbox is always open.
                                </p>
                                <motion.a
                                    href="mailto:marwan@example.com"
                                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-colors duration-200 text-sm"
                                    whileHover={{ scale: 1.03, y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Send me an email
                                    <ArrowUpRight size={16} />
                                </motion.a>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Contact Links */}
                    <div className="grid sm:grid-cols-3 gap-4">
                        {contactLinks.map(({ icon: Icon, label, value, href, description }, i) => (
                            <FadeIn key={label} delay={0.15 + i * 0.08}>
                                <motion.a
                                    href={href}
                                    target={href.startsWith('http') ? '_blank' : undefined}
                                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="group flex flex-col p-6 bg-white border border-slate-100 rounded-2xl card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
                                    whileHover={{ y: -4 }}
                                >
                                    <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-300">
                                        <Icon size={18} className="text-slate-500 group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <p className="font-semibold text-slate-900 text-sm mb-1">{label}</p>
                                    <p className="text-xs text-slate-400 mb-2">{description}</p>
                                    <p className="text-xs text-slate-500 font-medium truncate mt-auto">{value}</p>
                                </motion.a>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
