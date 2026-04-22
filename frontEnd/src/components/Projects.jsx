import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, Code2, AlertCircle, Loader2, Calendar } from 'lucide-react'
import { fetchProjects } from '../services/api'

function ProjectCard({ project, index }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    const { title, description, technologies = [], liveLink, githubLink, createdAt } = project

    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        : null

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.65,
                delay: (index % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
        >
            {/* Card top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 group-hover:from-slate-700 group-hover:via-slate-500 group-hover:to-slate-700 transition-all duration-500" />

            <div className="p-7 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-300">
                        <Code2 size={18} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-2">
                        {githubLink && (
                            <motion.a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${title} GitHub repository`}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Github size={16} />
                            </motion.a>
                        )}
                        {liveLink && (
                            <motion.a
                                href={liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${title} live demo`}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ExternalLink size={16} />
                            </motion.a>
                        )}
                    </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2 leading-snug group-hover:text-slate-700 transition-colors">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">
                    {description}
                </p>

                {/* Technologies */}
                {technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {technologies.map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-medium rounded-md"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer */}
                {formattedDate && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-4 border-t border-slate-50">
                        <Calendar size={12} />
                        <span>{formattedDate}</span>
                    </div>
                )}
            </div>
        </motion.article>
    )
}

function EmptyState() {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-4">
                <Code2 size={28} className="text-slate-300" />
            </div>
            <h3 className="font-semibold text-slate-700 mb-2">No projects yet</h3>
            <p className="text-sm text-slate-400 max-w-xs">
                Projects will appear here once they&apos;re added to the portfolio.
            </p>
        </div>
    )
}

function ErrorState({ onRetry }) {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mb-4">
                <AlertCircle size={28} className="text-red-400" />
            </div>
            <h3 className="font-semibold text-slate-700 mb-2">Failed to load projects</h3>
            <p className="text-sm text-slate-400 max-w-xs mb-6">
                Could not connect to the server. Make sure the backend is running.
            </p>
            <button
                onClick={onRetry}
                className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors"
            >
                Try Again
            </button>
        </div>
    )
}

export default function Projects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const headerRef = useRef(null)
    const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

    const loadProjects = async () => {
        setLoading(true)
        setError(false)
        try {
            const data = await fetchProjects()
            setProjects(data)
        } catch (err) {
            console.error('Failed to fetch projects:', err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadProjects()
    }, [])

    return (
        <section id="projects" className="py-28 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 28 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-3">
                        Portfolio
                    </p>
                    <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 tracking-tight">
                        Selected work
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-md mx-auto">
                        A collection of projects I&apos;ve built — each one a new challenge and a new lesson.
                    </p>
                </motion.div>

                {/* Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                            <Loader2 size={32} className="text-slate-300" />
                        </motion.div>
                        <p className="text-sm text-slate-400">Loading projects...</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {error ? (
                            <ErrorState onRetry={loadProjects} />
                        ) : projects.length === 0 ? (
                            <EmptyState />
                        ) : (
                            projects.map((project, index) => (
                                <ProjectCard key={project._id} project={project} index={index} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
