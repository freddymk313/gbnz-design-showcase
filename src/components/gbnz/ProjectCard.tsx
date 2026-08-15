import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { ProjectItem } from "@/data/portfolioData";

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(project)}
      className={`group relative break-inside-avoid rounded-2xl sm:rounded-3xl md:rounded-[32px] overflow-hidden ${project.bg} cursor-pointer border border-black/5 shadow-sm hover:shadow-2xl transition-all duration-500`}
    >
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-auto group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      )}

      <motion.div
        className="absolute inset-0 bg-brand-black/75 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5 sm:p-7 md:p-10 z-20"
      >
        <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <span className="text-brand-yellow text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] mb-1 sm:mb-2 block">
            {project.cat}
          </span>
          <h3 className="text-white font-display text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 uppercase tracking-tight">
            {project.title}
          </h3>
          <p className="text-white/70 text-xs sm:text-sm font-body mb-4 sm:mb-6 leading-snug">
            {project.label}
          </p>
          <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-tighter">
            <span>Découvrir</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-yellow flex items-center justify-center text-brand-black">
              <Plus size={15} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
