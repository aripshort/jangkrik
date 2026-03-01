import { motion } from "framer-motion";
import { MessageSquare, Plus, Trash2, X } from "lucide-react";
import { type ChatMessage } from "@shared/schema";
import { useClearChat } from "@/hooks/use-chat";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: ChatMessage[];
}

export function ChatSidebar({ isOpen, onClose, history }: SidebarProps) {
  const clearChat = useClearChat();
  const userPrompts = history.filter(m => m.role === 'user').reverse();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <motion.div
        initial={false}
        animate={{ 
          width: isOpen ? 280 : 0,
          opacity: isOpen ? 1 : 0
        }}
        className="h-full bg-slate-900/95 border-r border-slate-800 overflow-hidden shrink-0 z-40 fixed md:relative"
        style={{ width: 0 }} // SSR fallback
      >
        <div className="w-[280px] p-4 flex flex-col h-full relative">
          
          <button 
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 p-2 bg-slate-800 rounded-full text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>

          <button 
            onClick={() => {
              // Simulating new chat by clearing history in this schema
              if(confirm("Start a new chat? This will clear current history.")) {
                clearChat.mutate();
              }
            }}
            className="btn-3d-secondary w-full py-3 px-4 rounded-xl flex items-center gap-3 mb-6 mt-12 md:mt-2"
          >
            <Plus className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-slate-100">New Chat</span>
          </button>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
              Recent Prompts
            </h3>
            {userPrompts.length === 0 ? (
              <p className="text-sm text-slate-500 px-2">No history yet.</p>
            ) : (
              userPrompts.map((msg, i) => (
                <div 
                  key={msg.id} 
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 text-slate-300 cursor-pointer transition-colors group"
                >
                  <MessageSquare className="w-4 h-4 shrink-0 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span className="truncate text-sm font-medium">{msg.content}</span>
                </div>
              ))
            )}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button 
              onClick={() => {
                if(confirm("Clear all history?")) clearChat.mutate();
              }}
              disabled={clearChat.isPending || history.length === 0}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-red-400 hover:bg-red-950/30 transition-colors disabled:opacity-50 font-semibold"
            >
              <Trash2 className="w-5 h-5" />
              Clear History
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
