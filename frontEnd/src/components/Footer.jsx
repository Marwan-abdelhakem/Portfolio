import { motion } from 'framer-motion'
import { Code2, Heart } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-white border-t border-slate-100 py-8">
            <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
                        <Code2 size={14} className="text-white" />
                    </div>
                    <span className="font-display font-bold text-slate-900 text-sm">
                        Marwan Abdelhakem
                    </span>
                </div>

                {/* Copyright */}


                {/* Back to top */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-xs text-slate-400 hover:text-slate-700 font-medium transition-colors"
                >
                    Back to top ↑
                </button>
            </div>
        </footer>
    )
}
