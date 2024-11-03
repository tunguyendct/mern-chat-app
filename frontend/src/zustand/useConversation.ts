import { create } from 'zustand';

interface Message {
  _id: string;
}

interface ConversationProps {
  selectedConversation: string | null;
  setSelectedConversation: (selectedConversation: string | null) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const useConversation = create<ConversationProps>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
