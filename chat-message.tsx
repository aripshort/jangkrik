import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { type ChatMessage } from "@shared/schema";
import { motion } from "framer-motion";

interface ChatMessageProps {
  message: ChatMessage;
}

export function ChatMessageItem({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`flex max-w-[85%] md:max-w-[75%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className="shrink-0 mt-1">
          {isUser ? (
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.4)]">
              <User className="w-6 h-6 text-white" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-blue-400" />
            </div>
          )}
        </div>

        {/* Bubble */}
        <div className={`p-5 relative ${
          isUser 
            ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-3xl rounded-tr-sm shadow-[0_8px_25px_-5px_rgba(59,130,246,0.4)]' 
            : 'card-3d rounded-3xl rounded-tl-sm text-slate-100'
        }`}>
          <ReactMarkdown 
            className={`prose max-w-none ${isUser ? 'prose-invert prose-p:leading-relaxed' : 'prose-invert prose-blue prose-p:leading-relaxed'}`}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex w-full justify-start mb-6"
    >
      <div className="flex max-w-[85%] md:max-w-[75%] gap-4">
        <div className="shrink-0 mt-1">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shadow-lg">
            <Bot className="w-6 h-6 text-blue-400" />
          </div>
        </div>
        <div className="card-3d rounded-3xl rounded-tl-sm text-slate-100 p-5 flex items-center gap-2 h-[60px]">
          <div className="w-2.5 h-2.5 bg-blue-400 rounded-full typing-dot" />
          <div className="w-2.5 h-2.5 bg-blue-400 rounded-full typing-dot" />
          <div className="w-2.5 h-2.5 bg-blue-400 rounded-full typing-dot" />
        </div>
      </div>
    </motion.div>
  );
}
