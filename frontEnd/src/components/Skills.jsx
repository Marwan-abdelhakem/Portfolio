import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skillCategories = [
    {
        category: 'Frontend',
        color: 'bg-blue-50 text-blue-700 border-blue-100',
        dot: 'bg-blue-400',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React JS', 'Tailwind CSS', 'Bootstrap', 'Angular'],
    },
    {
        category: 'Backend',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        dot: 'bg-emerald-400',
        skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'Mongoose'],
    },
    {
        category: 'Tools & Others',
        color: 'bg-violet-50 text-violet-700 border-violet-100',
        dot: 'bg-violet-400',
        skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'npm'],
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.06 }
    }
}

const tagVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 12 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
}

function SkillCategory({ category, color, dot, skills, delay }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 bg-white border border-slate-100 rounded-2xl card-shadow"
        >
            <div className="flex items-center gap-2 mb-6">
                <div className={`w-2 h-2 rounded-full ${dot}`} />
                <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">
                    {category}
                </h3>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="flex flex-wrap gap-2"
            >
                {skills.map((skill) => (
                    <motion.span
                        key={skill}
                        variants={tagVariants}
                        className={`px-3.5 py-1.5 text-sm font-medium rounded-lg border cursor-default select-none transition-all duration-200 hover:scale-105 hover:shadow-sm ${color}`}
                        whileHover={{ y: -2 }}
                    >
                        {skill}
                    </motion.span>
                ))}
            </motion.div>
        </motion.div>
    )
}

export default function Skills() {
    const headerRef = useRef(null)
    const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

    return (
        <section id="skills" className="py-28 bg-slate-50">
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
                        Technical Skills
                    </p>
                    <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 tracking-tight">
                        My tech stack
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-md mx-auto">
                        Technologies I use to bring ideas to life — from concept to deployment.
                    </p>
                </motion.div>

                {/* Skill Categories */}
                <div className="grid md:grid-cols-3 gap-6">
                    {skillCategories.map(({ category, color, dot, skills }, i) => (
                        <SkillCategory
                            key={category}
                            category={category}
                            color={color}
                            dot={dot}
                            skills={skills}
                            delay={i * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
