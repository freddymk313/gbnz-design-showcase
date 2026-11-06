import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Loader2 } from "lucide-react";
import type { ProjectItem } from "@/data/portfolioData";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!project) return;
    setIsDownloading(true);

    const safeTitle = project.title
      .trim()
      .replace(/[^a-zA-Z0-9-_\s]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    const filename = `${safeTitle || "affiche-gbnz"}.jpg`;
    const targetUrl = project.downloadUrl || project.fullImage || project.image;

    try {
      const response = await fetch(targetUrl, { mode: "cors" });
      if (!response.ok) throw new Error("Direct fetch failed");
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);
    } catch {
      // Fallback: trigger direct link navigation / download
      const a = document.createElement("a");
      a.href = targetUrl;
      a.download = filename;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-brand-black/95 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center max-w-7xl w-full"
          >
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute -top-12 right-0 md:-right-12 md:top-0 text-white/50 hover:text-brand-yellow transition-colors p-2 cursor-pointer"
            >
              <X size={32} />
            </button>

            <div className="w-full flex justify-center">
              <img
                src={project.fullImage || project.image}
                alt={project.altText || project.title}
                className="w-auto h-auto max-h-[80vh] md:max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full max-w-2xl px-4 gap-4">
              <div className="text-center sm:text-left">
                <span className="text-brand-yellow text-xs font-bold uppercase tracking-widest block">
                  {project.cat}
                </span>
                <h4 className="text-white font-display text-2xl uppercase tracking-tight">
                  {project.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-brand-yellow text-brand-black font-bold text-xs uppercase tracking-tighter shadow-xl hover:bg-white transition-all cursor-pointer disabled:opacity-70"
              >
                {isDownloading ? (
                  <Loader2 size={16} className="animate-spin text-brand-black" />
                ) : (
                  <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                )}
                <span>{isDownloading ? "Téléchargement..." : "Télécharger l'affiche"}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
