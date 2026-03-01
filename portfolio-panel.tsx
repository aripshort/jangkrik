import { motion } from "framer-motion";
import { 
  X, Gamepad2, Globe, Cpu, GraduationCap, Sparkles, 
  Camera, Award 
} from "lucide-react";

interface PortfolioPanelProps {
  onClose: () => void;
}

export function PortfolioPanel({ onClose }: PortfolioPanelProps) {
  const skills = [
    { title: "Making games", icon: Gamepad2 },
    { title: "Making websites", icon: Globe },
    { title: "Like to learn AI", icon: Cpu },
    { title: "School children", icon: GraduationCap },
    { title: "AI makes it like AI in general", icon: Sparkles },
  ];

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none p-0 sm:p-4"
    >
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-auto" 
        onClick={onClose} 
      />
      
      <div className="card-3d w-full max-w-5xl h-[92vh] sm:h-[85vh] sm:rounded-[2rem] rounded-t-[2rem] rounded-b-none pointer-events-auto flex flex-col overflow-hidden relative z-10 border-t border-blue-500/30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-700/50 bg-slate-900/80 sticky top-0 z-20 backdrop-blur-xl">
          <h2 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            About jangkrik
          </h2>
          <button 
            onClick={onClose} 
            className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 hover:scale-105 active:scale-95 text-slate-300 transition-all shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-16 bg-gradient-to-b from-slate-900/50 to-black/90">
           
           {/* ABOUT ME */}
           <motion.section 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <h3 className="text-2xl font-display font-bold text-blue-400 mb-6 drop-shadow-[0_2px_10px_rgba(56,189,248,0.3)] flex items-center gap-3">
               <span className="w-8 h-1 bg-blue-500 rounded-full" />
               Introduction
             </h3>
             <div className="card-3d p-8 text-xl leading-relaxed text-blue-50/90 font-medium">
               AI, I like making games, I like learning about AI, and coding for fun.
             </div>
           </motion.section>

           {/* WHAT I CAN DO */}
           <motion.section 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <h3 className="text-2xl font-display font-bold text-blue-400 mb-6 drop-shadow-[0_2px_10px_rgba(56,189,248,0.3)] flex items-center gap-3">
               <span className="w-8 h-1 bg-cyan-500 rounded-full" />
               What I can do
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
               {skills.map((skill, i) => {
                 const Icon = skill.icon;
                 return (
                   <motion.div 
                     key={i}
                     whileHover={{ scale: 1.03, y: -5 }}
                     className="card-3d p-6 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer"
                   >
                     <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center group-hover:bg-blue-900/30 group-hover:border-blue-500/50 transition-colors shadow-lg">
                       <Icon className="w-8 h-8 text-blue-400 group-hover:text-cyan-300" />
                     </div>
                     <span className="font-display font-semibold text-lg text-blue-100">{skill.title}</span>
                   </motion.div>
                 );
               })}
             </div>
           </motion.section>

           {/* PROJECTS (Photo Templates) */}
           <motion.section 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <h3 className="text-2xl font-display font-bold text-blue-400 mb-6 drop-shadow-[0_2px_10px_rgba(56,189,248,0.3)] flex items-center gap-3">
               <span className="w-8 h-1 bg-blue-500 rounded-full" />
               Projects
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {[1, 2, 3].map(i => (
                 <motion.div 
                   key={i} 
                   whileHover={{ scale: 1.02 }}
                   className="card-3d aspect-[4/3] flex flex-col items-center justify-center text-slate-500 hover:text-blue-400 transition-colors cursor-pointer border-dashed border-2 hover:border-solid hover:border-blue-500/50 group"
                 >
                   <Camera className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
                   <span className="font-semibold">Photo Template {i}</span>
                 </motion.div>
               ))}
             </div>
           </motion.section>

           {/* CERTIFICATES */}
           <motion.section 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="pb-10"
           >
             <h3 className="text-2xl font-display font-bold text-blue-400 mb-6 drop-shadow-[0_2px_10px_rgba(56,189,248,0.3)] flex items-center gap-3">
               <span className="w-8 h-1 bg-cyan-500 rounded-full" />
               Certificates
             </h3>
             <div className="space-y-5">
               {[
                 { title: "Achievement of Excellence", desc: "Recognized for exceptional progress and what I have done in completing the core program." },
                 { title: "AI Fundamentals", desc: "Certified understanding of AI models, structuring, and general AI capabilities." }
               ].map((cert, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ x: 5 }}
                   className="card-3d p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center group"
                 >
                   <div className="shrink-0 p-4 bg-slate-800 rounded-2xl group-hover:bg-blue-900/30 transition-colors shadow-lg">
                     <Award className="w-10 h-10 text-cyan-400" />
                   </div>
                   <div>
                     <h4 className="text-xl font-display font-bold text-slate-100 mb-2">{cert.title}</h4>
                     <p className="text-slate-400 leading-relaxed">{cert.desc}</p>
                   </div>
                 </motion.div>
               ))}
             </div>
           </motion.section>

        </div>
      </div>
    </motion.div>
  );
}
