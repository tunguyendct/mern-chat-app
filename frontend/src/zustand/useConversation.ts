import { create } from 'zustand';
import { Conversation } from '../types/conversation.type';
import { Message } from '../types/message.type';

interface ConversationProps {
  selectedConversation: Conversation | null;
  setSelectedConversation: (selectedConversation: Conversation | null) => void;
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
