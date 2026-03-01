import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type ChatMessage } from "@shared/schema";

export function useChatHistory() {
  return useQuery({
    queryKey: [api.chat.history.path],
    queryFn: async () => {
      const res = await fetch(api.chat.history.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      
      const result = api.chat.history.responses[200].safeParse(data);
      if (!result.success) {
        console.warn("[Zod] chat.history validation failed, falling back to cast:", result.error.format());
        return data as ChatMessage[];
      }
      return result.data as ChatMessage[];
    }
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (message: string) => {
      const res = await fetch(api.chat.message.path, {
        method: api.chat.message.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to send message");
      return await res.json();
    },
    onMutate: async (newMessage) => {
      await queryClient.cancelQueries({ queryKey: [api.chat.history.path] });
      const previous = queryClient.getQueryData<ChatMessage[]>([api.chat.history.path]);
      
      // Optimistically add user's message to avoid lag feeling
      queryClient.setQueryData<ChatMessage[]>([api.chat.history.path], (old) => {
        const history = Array.isArray(old) ? old : [];
        return [...history, { 
          id: Date.now(), 
          role: 'user', 
          content: newMessage, 
          createdAt: new Date() 
        } as ChatMessage];
      });
      
      return { previous };
    },
    onError: (err, newMsg, context) => {
      if (context?.previous) {
        queryClient.setQueryData([api.chat.history.path], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [api.chat.history.path] });
    }
  });
}

export function useClearChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.chat.clear.path, {
        method: api.chat.clear.method,
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to clear chat");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.setQueryData([api.chat.history.path], []);
      queryClient.invalidateQueries({ queryKey: [api.chat.history.path] });
    }
  });
}
