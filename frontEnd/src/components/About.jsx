import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Layers, Zap, Users, Code } from 'lucide-react'

const stats = [
    { value: '15+', label: 'Projects Built' },
    { value: '100%', label: 'Dedication' },
    { value: '∞', label: 'Curiosity' },
]

const traits = [
    {
        icon: Code,
        title: 'Clean Code',
        desc: 'Writing maintainable, well-structured code is a craft I take seriously.',
    },
    {
        icon: Zap,
        title: 'Performance First',
        desc: 'Every millisecond matters. I optimize for speed and efficiency.',
    },
    {
        icon: Layers,
        title: 'Full Stack',
        desc: 'Comfortable across the entire stack — from UI to database design.',
    },
    {
        icon: Users,
        title: 'Team Player',
        desc: 'Collaboration and clear communication are at the core of how I work.',
    },
]

function FadeInWhenVisible({ children, delay = 0 }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

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

export default function About() {
    return (
        <section id="about" className="py-28 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <FadeInWhenVisible>
                    <div className="text-center mb-16">
                        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-3">
                            About Me
                        </p>
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 tracking-tight">
                            The person behind the code
                        </h2>
                    </div>
                </FadeInWhenVisible>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — Text */}
                    <div className="space-y-6">
                        <FadeInWhenVisible delay={0.1}>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                I&apos;m <strong className="text-slate-900 font-semibold">Marwan Abdelhakem</strong>,
                                a Full Stack Developer passionate about building digital products
                                that are both beautiful and functional.
                            </p>
                        </FadeInWhenVisible>
                        <FadeInWhenVisible delay={0.15}>
                            <p className="text-slate-500 leading-relaxed">
                                I specialize in the JavaScript ecosystem — building responsive
                                frontends with React and Tailwind, and scalable backends with
                                Node.js and Express. I care deeply about user experience,
                                performance, and writing code that&apos;s easy to maintain.
                            </p>
                        </FadeInWhenVisible>
                        <FadeInWhenVisible delay={0.2}>
                            <p className="text-slate-500 leading-relaxed">
                                When I&apos;m not coding, I&apos;m exploring new technologies,
                                contributing to open source, or thinking about how to make
                                complex things feel simple.
                            </p>
                        </FadeInWhenVisible>

                        {/* Stats */}
                        <FadeInWhenVisible delay={0.25}>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                                {stats.map(({ value, label }) => (
                                    <div key={label} className="text-center p-4 bg-slate-50 rounded-xl">
                                        <p className="font-display font-bold text-2xl text-slate-900">{value}</p>
                                        <p className="text-xs text-slate-500 mt-1 font-medium">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeInWhenVisible>
                    </div>

                    {/* Right — Trait Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {traits.map(({ icon: Icon, title, desc }, i) => (
                            <FadeInWhenVisible key={title} delay={0.1 + i * 0.08}>
                                <motion.div
                                    className="p-6 bg-white border border-slate-100 rounded-2xl card-shadow group cursor-default"
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                >
                                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                                        <Icon size={18} className="text-white" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                                </motion.div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
