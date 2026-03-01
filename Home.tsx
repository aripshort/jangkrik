import { useState, useRef, useEffect } from "react";
import { Menu, Send, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatHistory, useSendMessage } from "@/hooks/use-chat";
import { ChatMessageItem, TypingIndicator } from "@/components/chat-message";
import { ChatSidebar } from "@/components/chat-sidebar";
import { PortfolioPanel } from "@/components/portfolio-panel";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isPortfolioOpen, setPortfolioOpen] = useState(false);
  const [input, setInput] = useState("");
  
  const { data: history = [], isLoading } = useChatHistory();
  const sendMessage = useSendMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, sendMessage.isPending]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || sendMessage.isPending) return;
    
    sendMessage.mutate(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasMessages = history.length > 0;

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      
      <ChatSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        history={history} 
      />

      <main className="flex-1 flex flex-col h-full relative min-w-0">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-display text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-wide">
              jangkrik
            </span>
          </div>
          
          {hasMessages && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setPortfolioOpen(true)}
              className="btn-3d bg-blue-600 text-white px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2"
            >
              <UserCircle className="w-5 h-5" />
              <span className="hidden sm:inline">About Me</span>
            </motion.button>
          )}
        </header>

        {/* Chat Area */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !hasMessages ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-7xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-700 drop-shadow-[0_0_40px_rgba(56,189,248,0.4)] mb-4 pb-2">
                jangkrik
              </h1>
              <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-md mx-auto font-medium">
                I'm your cute 3D AI assistant. Let's make something amazing together.
              </p>
              
              <button
                onClick={() => setPortfolioOpen(true)}
                className="btn-3d bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-5 rounded-full font-display font-bold text-xl flex items-center gap-3 hover:scale-105"
              >
                <UserCircle className="w-7 h-7" />
                About Me
              </button>
            </motion.div>
          </div>
        ) : (
          /* Active Chat State */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 w-full max-w-5xl mx-auto scroll-smooth">
            {history.map((msg) => (
              <ChatMessageItem key={msg.id} message={msg} />
            ))}
            {sendMessage.isPending && <TypingIndicator />}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}

        {/* Input Area */}
        <div className="w-full bg-gradient-to-t from-background via-background/90 to-transparent pt-6 pb-6 px-4">
          <form 
            onSubmit={handleSend} 
            className="max-w-4xl mx-auto relative"
          >
            <div className="card-3d rounded-[2rem] flex items-end p-2 relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <textarea 
                className="flex-1 bg-transparent border-none outline-none resize-none max-h-40 px-6 py-4 text-slate-100 placeholder:text-slate-500 font-medium"
                rows={1}
                placeholder="Message jangkrik..."
                value={input}
                onChange={e => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px';
                }}
                onKeyDown={handleKeyDown}
              />
              <button 
                type="submit"
                disabled={!input.trim() || sendMessage.isPending}
                className="btn-3d bg-gradient-to-r from-blue-600 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0 mb-1 mx-2 text-white disabled:opacity-50 disabled:grayscale transition-all"
              >
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            </div>
            <div className="text-center mt-3 text-xs text-slate-500 font-medium">
              jangkrik may display inaccurate info, so verify its responses.
            </div>
          </form>
        </div>

      </main>

      {/* Portfolio Overlay */}
      <AnimatePresence>
        {isPortfolioOpen && (
          <PortfolioPanel onClose={() => setPortfolioOpen(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}
